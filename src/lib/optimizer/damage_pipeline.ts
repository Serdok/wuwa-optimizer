import type { Character, CharacterStat } from '$lib/types/character';
import type { Weapon } from '$lib/types/weapon';
import type { Echo } from '$lib/types/echo';
import { AttackType, Attribute } from '$lib/types/stat';
import { Element } from '$lib/types/element';
import { compute_stats } from '$lib/optimizer/computed_stats_pipeline';


export function compute_damage(character: Character, weapon: Weapon, build: Echo[]) {
	console.log('** optimizer config **');
	console.log('character: ', character);
	console.log('weapon: ', weapon);
	console.log('build: ', build);

	const base_stats = compute_base_stat(character.base_stats, weapon);
	console.log('base stats', base_stats);

	const computed_stats = compute_stats(character, weapon, build);

	// related_property * (skill_multiplier * skill_scaling)
	const skills_hits = Object.fromEntries(Object.entries(character.skills).map(([key, skill]) => {
		return [key, {
			...skill,
			motions: skill.motions.map(m => {
				// TODO: take into account scaling bonus here?
				const scaling_bonus = (computed_stats[get_related_skill_multiplier(m.type)] ?? 0);
				return { ...m, values: m.values.map(v => v * sum_as_flat_stat(m.attribute, base_stats, computed_stats) * scaling_bonus), }
			}),
		}];
	}));
	console.log('skills hits: ', structuredClone(skills_hits));

	// skill_hit * (element_dmg_bonus + skill_dmg_bonus) * amplify
	const expected_hits = Object.fromEntries(Object.entries(skills_hits).map(([key, skill]) => {
		const motions = skill.motions.map(m => {
			const element_bonus = computed_stats[get_related_element_bonus(m.element)] ?? 1;
			const element_amplify = computed_stats[get_related_element_amplify(m.element)] ?? 1;
			const skill_bonus = computed_stats[get_related_skill_bonus(m.type)] ?? 0;
			const skill_amplify = computed_stats[get_related_skill_amplify(m.type)] ?? 0;
			return { ...m, values: m.values.map(v => v * (element_bonus + skill_bonus) * (element_amplify + skill_amplify)), };
		});
		return [key, { ...skill, motions, }];
	}));
	console.log('expected hits: ', structuredClone(expected_hits));

	// we compute all 3 kinds of crit hits: non-crit (= current values), average, force crit
	const final_hits = Object.fromEntries(Object.entries(skills_hits).map(([key, skill]) => {
		const motions = skill.motions.map(m => {
			const crit_rate = computed_stats[Attribute.CritRate] ?? 0.05;
			const crit_damage = computed_stats[Attribute.CritDamage] ?? 1.50;
			return { ...m, average: m.values.map(v => v * ((1 - crit_rate) + (crit_rate * crit_damage))), crit: m.values.map(v => v * crit_damage) };
		});
		return [key, { ...skill, motions, }];
	}));
	console.log('final hits: ', structuredClone(final_hits));
}

function sum_as_flat_stat(flat: keyof Character['base_stats'], base_stats: Character['base_stats'], computed_stats: CharacterStat) {
	return base_stats[flat].value * (1 + (computed_stats[`${flat}%`] ?? 0)) + (computed_stats[flat] ?? 0);
}

function compute_base_stat(base_stat: Character['base_stats'], weapon: Weapon): Character['base_stats'] {
	const { attribute, value: weapon_value } = weapon.main_stat.primary;

	return {
		...base_stat,
		// sum the base stat with the matching weapon primary stat
		[attribute]: { attribute, value: base_stat[attribute].value + weapon_value },
	};
}

function get_related_element_bonus(element: Element) {
	switch (element) {
		case Element.Glacio: return Attribute.GlacioBonus;
		case Element.Fusion: return Attribute.FusionBonus;
		case Element.Electro: return Attribute.ElectroBonus;
		case Element.Aero: return Attribute.AeroBonus;
		case Element.Spectro: return Attribute.SpectroBonus;
		case Element.Havoc: return Attribute.HavocBonus;
	}
}

function get_related_element_amplify(element: Element) {
	switch (element) {
		case Element.Glacio: return Attribute.GlacioAmplify;
		case Element.Fusion: return Attribute.FusionAmplify;
		case Element.Electro: return Attribute.ElectroAmplify;
		case Element.Aero: return Attribute.AeroAmplify;
		case Element.Spectro: return Attribute.SpectroAmplify;
		case Element.Havoc: return Attribute.HavocAmplify;
	}
}

function get_related_skill_bonus(attack_type: AttackType) {
	switch (attack_type) {
		case AttackType.BasicAttack: return Attribute.BasicAttackBonus;
		case AttackType.HeavyAttack: return Attribute.HeavyAttackBonus;
		case AttackType.ResonanceSkill: return Attribute.ResonanceSkillBonus;
		case AttackType.ResonanceLiberation: return Attribute.ResonanceLiberationBonus;
		case AttackType.IntroSkill: return Attribute.IntroBonus;
		case AttackType.OutroSkill: return Attribute.OutroBonus;
	}
}

function get_related_skill_amplify(attack_type: AttackType) {
	switch (attack_type) {
		case AttackType.BasicAttack: return Attribute.BasicAttackAmplify;
		case AttackType.HeavyAttack: return Attribute.HeavyAttackAmplify;
		case AttackType.ResonanceSkill: return Attribute.ResonanceSkillAmplify;
		case AttackType.ResonanceLiberation: return Attribute.ResonanceLiberationAmplify;
		case AttackType.IntroSkill: return Attribute.IntroAmplify;
		case AttackType.OutroSkill: return Attribute.OutroAmplify;
	}
}

function get_related_skill_multiplier(attack_type: AttackType) {
	switch (attack_type) {
		case AttackType.BasicAttack: return Attribute.BasicAttackMultiplier;
		case AttackType.HeavyAttack: return Attribute.HeavyAttackMultiplier;
		case AttackType.ResonanceSkill: return Attribute.ResonanceSkillMultiplier;
		case AttackType.ResonanceLiberation: return Attribute.ResonanceLiberationMultiplier;
		case AttackType.IntroSkill: return Attribute.IntroMultiplier;
		case AttackType.OutroSkill: return Attribute.OutroMultiplier;
	}
}