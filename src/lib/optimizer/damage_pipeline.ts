import type { Character, CharacterStat } from '$lib/types/character';
import type { Weapon } from '$lib/types/weapon';
import type { Echo } from '$lib/types/echo';
import { AttackType, Attribute } from '$lib/types/stat';
import { Element } from '$lib/types/element';
import { compute_base_stats, compute_combat_stats, compute_motion_stats } from '$lib/optimizer/compute_stats';


export function compute_damage(character: Character, weapon: Weapon, build: Echo[]) {
	// console.log('** optimizer config **');
	// console.log('character: ', character);
	// console.log('weapon: ', weapon);
	// console.log('build: ', build);

	const base_stats = compute_base_stats(character.base_stats, weapon);
	// console.log('base stats', base_stats);

	const combat_stats = compute_combat_stats(character, weapon, build);
	// console.log('combat stats', combat_stats);

	return Object.fromEntries(Object.entries(character.skills).map(([type, data]) => {
		const motions = data.motions.map(m => {
			const motion_stats = compute_motion_stats(combat_stats, character, m);
			// console.log(`computed stats for ${data.name} - ${m.name}: `, motion_stats);

			// related_property * (skill_multiplier * skill_scaling)
			const scaling_bonus = (motion_stats[get_related_skill_multiplier(m.type)] ?? 0);
			const skill_hits = m.values.map(v => v * (1 + scaling_bonus) * sum_as_flat_stat(m.attribute, base_stats, motion_stats));
			// console.log(`skill hits for ${data.name} - ${m.name}: `, skill_hits);

			// skill_hit * (element_dmg_bonus + skill_dmg_bonus) * amplify
			const element_bonus = motion_stats[get_related_element_bonus(m.element)] ?? 0;
			const element_amplify = motion_stats[get_related_element_amplify(m.element)] ?? 0;
			const skill_bonus = motion_stats[get_related_skill_bonus(m.type)] ?? 0;
			const skill_amplify = motion_stats[get_related_skill_amplify(m.type)] ?? 0;
			const expected_hits = skill_hits.map(v => v * (1 + element_bonus + skill_bonus) * (1 + element_amplify + skill_amplify));
			// console.log(`expected hits for ${data.name} - ${m.name}: `, expected_hits);

			// we compute all 3 kinds of crit hits: non-crit (= current values), average, force crit
			const crit_rate = motion_stats[Attribute.CritRate] ?? 0.05;
			const crit_damage = motion_stats[Attribute.CritDamage] ?? 1.50;
			const crit_hits = expected_hits.map(v => ({ non_crit: v, average: v * ((1 - crit_rate) + (crit_rate * crit_damage)), crit: v * crit_damage }));
			// console.log(`crit hits for ${data.name} - ${m.name}: `, crit_hits);

			return { ...m, hits: crit_hits };
		});
		return [type, { ...data, motions }];
	}));
}

function sum_as_flat_stat(flat: keyof Character['base_stats'], base_stats: Character['base_stats'], computed_stats: CharacterStat) {
	return base_stats[flat].value * (1 + (computed_stats[`${flat}%`] ?? 0)) + (computed_stats[flat] ?? 0);
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