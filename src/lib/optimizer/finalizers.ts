import type { OptimizerInput } from '$lib/types/optimizer';
import { AttackDMGAmplify, AttackDMGBonus, type Attribute, BaseAttribute, CombatAttribute, ElementDMGAmplify, ElementDMGBonus } from '$lib/types/stat';
import { type AttackData, AttackType } from '$lib/types/character';
import { Element } from '$lib/types/element';

export function get_base_attribute_value(attribute: BaseAttribute, base_stats: Record<BaseAttribute, number>, attack_stats: Record<Attribute, number>) {
	return base_stats[attribute] * (1 + (attack_stats[`${attribute}%`] ?? 0)) + attack_stats[attribute];
}

const element_bonus_map = {
	[Element.Physical]: ElementDMGBonus.Physical,
	[Element.Glacio]: ElementDMGBonus.Glacio,
	[Element.Fusion]: ElementDMGBonus.Fusion,
	[Element.Electro]: ElementDMGBonus.Electro,
	[Element.Aero]: ElementDMGBonus.Aero,
	[Element.Spectro]: ElementDMGBonus.Spectro,
	[Element.Havoc]: ElementDMGBonus.Havoc,
} as const;

const attack_bonus_map = {
	[AttackType.Basic]: AttackDMGBonus.Basic,
	[AttackType.Heavy]: AttackDMGBonus.Heavy,
	[AttackType.Skill]: AttackDMGBonus.Skill,
	[AttackType.Liberation]: AttackDMGBonus.Liberation,
	[AttackType.Intro]: AttackDMGBonus.Intro,
	[AttackType.Outro]: AttackDMGBonus.Outro,
} as const;

const element_amplify_map = {
	[Element.Physical]: ElementDMGAmplify.Physical,
	[Element.Glacio]: ElementDMGAmplify.Glacio,
	[Element.Fusion]: ElementDMGAmplify.Fusion,
	[Element.Electro]: ElementDMGAmplify.Electro,
	[Element.Aero]: ElementDMGAmplify.Aero,
	[Element.Spectro]: ElementDMGAmplify.Spectro,
	[Element.Havoc]: ElementDMGAmplify.Havoc,
} as const;

const attack_amplify_map = {
	[AttackType.Basic]: AttackDMGAmplify.Basic,
	[AttackType.Heavy]: AttackDMGAmplify.Heavy,
	[AttackType.Skill]: AttackDMGAmplify.Skill,
	[AttackType.Liberation]: AttackDMGAmplify.Liberation,
	[AttackType.Intro]: AttackDMGAmplify.Intro,
	[AttackType.Outro]: AttackDMGAmplify.Outro,
} as const;

export function get_element_bonus(element: Element, stats: Record<Attribute, number>) {
	const bonus = element_bonus_map[element];
	return stats[ElementDMGBonus.Common] + stats[bonus];
}

export function get_attack_bonus(attack: AttackType, stats: Record<Attribute, number>) {
	const bonus = attack_bonus_map[attack];
	return stats[bonus];
}

export function get_element_amplify(element: Element, stats: Record<Attribute, number>) {
	const amplify = element_amplify_map[element];
	return stats[ElementDMGAmplify.Common] + stats[amplify];
}

export function get_attack_amplify(attack: AttackType, stats: Record<Attribute, number>) {
	const amplify = attack_amplify_map[attack];
	return stats[amplify];
}

export function default_finalizer(attack: AttackData, input: OptimizerInput, base_stats: Record<BaseAttribute, number>, attack_stats: Record<Attribute, number>) {
	// source: https://wutheringwaves.fandom.com/wiki/Damage
	// source: https://wutheringwaves.gg/damage-calculation-guide/

	// related_property * skill multiplier * skill scaling
	const skill_hits = attack.values.map(v => v * attack_stats[CombatAttribute.SkillMultiplier] * get_base_attribute_value(attack.attribute, base_stats, attack_stats));

	// hit * (element bonus + skill bonus) * skill amplify
	const bonus = get_element_bonus(attack.element, attack_stats) + get_attack_bonus(attack.type, attack_stats);
	const amplify = get_element_amplify(attack.element, attack_stats) + get_attack_amplify(attack.type, attack_stats);
	const expected_hits = skill_hits.map(v => v * (1 + bonus) * (1 + amplify));

	// todo: handle enemy properties (resistance, level, ...)
	// res * def * dmg reduction * element reduction
	const res = 0.1;
	let res_factor = 0;
	if (res < 0) {
		res_factor = 1 - (res / 2);
	} else if (res < 0.8) {
		res_factor = 1 - res;
	} else {
		res_factor = 1/(1 + 5 * res);
	}

	const def = 792 + 8 * 90;
	const attack_power = 800 + 8 * 90;
	const def_factor = attack_power / (attack_power + def * (1 - attack_stats[CombatAttribute.DEFIgnore]));

	const final_hits = expected_hits.map(v => v * res_factor * def_factor);

	const crit_rate = attack_stats[CombatAttribute.CritRate];
	const crit_damage = attack_stats[CombatAttribute.CritDamage];
	const average_factor = (1 - crit_rate) + (crit_rate * crit_damage);

	return {
		non_crit: final_hits,
		average: final_hits.map(v => v * average_factor),
		crit: final_hits.map(v => v * crit_damage),
	};
}