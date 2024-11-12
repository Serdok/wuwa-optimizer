import type { OptimizerInput, OptimizerOutput } from '$lib/types/optimizer';
import { characters } from '$lib/data/characters';
import { weapons } from '$lib/data/weapons';
import { generate_builds } from '$lib/optimizer/build';
import { type CharacterData } from '$lib/types/character';
import type { WeaponData } from '$lib/types/weapon';
import {
	AttackDMGAmplify,
	AttackDMGBonus,
	type Attribute,
	BaseAttribute,
	CombatAttribute,
	ElementDMGAmplify,
	ElementDMGBonus
} from '$lib/types/stat';
import type { Echo } from '$lib/types/echo';
import { character_curve } from '$lib/data/game/character_curve';
import { weapon_primary_curve, weapon_secondary_curve } from '$lib/data/game/weapon_curve';
import { default_finalizer, get_base_attribute_value } from '$lib/optimizer/finalizers';

export function get_zero_stats(): Record<Attribute, number> {
	const zero_attributes = [
		...Object.values(BaseAttribute),
		...Object.values(CombatAttribute),
		...Object.values(ElementDMGBonus),
		...Object.values(AttackDMGBonus),
		...Object.values(ElementDMGAmplify),
		...Object.values(AttackDMGAmplify)
	] as Attribute[];

	return Object.fromEntries(zero_attributes.map((stat) => [stat, 0])) as Record<Attribute, number>;
}

export function get_default_stats(): Record<Attribute, number> {
	const non_zero_attributes: Partial<Record<Attribute, number>> = {
		[CombatAttribute.CritRate]: 0.05,
		[CombatAttribute.CritDamage]: 1.5,
		[CombatAttribute.EnergyRegen]: 1,
		[CombatAttribute.SkillMultiplier]: 1
	};

	const zero_attributes = [
		...Object.values(BaseAttribute),
		...Object.values(CombatAttribute),
		...Object.values(ElementDMGBonus),
		...Object.values(AttackDMGBonus),
		...Object.values(ElementDMGAmplify),
		...Object.values(AttackDMGAmplify)
	] as Attribute[];

	return Object.fromEntries(
		zero_attributes.map((attr) => [attr, non_zero_attributes[attr] ?? 0])
	) as Record<Attribute, number>;
}

export function get_base_stats(
	character: CharacterData,
	weapon: WeaponData
): Record<BaseAttribute, number> {
	const stats: Record<BaseAttribute, number> = {
		[BaseAttribute.HP]: 0,
		[BaseAttribute.ATK]: 0,
		[BaseAttribute.DEF]: 0
	};

	Object.values(character.base_stats).forEach((stat) => {
		stats[stat.attribute] += stat.value * character_curve['6/90'][stat.attribute];
	});

	stats[weapon.base_stats.primary.attribute] +=
		weapon.base_stats.primary.value * weapon_primary_curve['6/90'];

	return stats;
}

export function apply_weapon_stats(stats: Record<Attribute, number>, weapon: WeaponData) {
	stats[weapon.base_stats.secondary.attribute] +=
		weapon.base_stats.secondary.value * weapon_secondary_curve['6/90'];
}

export function apply_echo_stats(stats: Record<Attribute, number>, echo: Echo) {
	[echo.main_stat.primary, echo.main_stat.secondary, ...echo.sub_stats].forEach((stat) => {
		stats[stat.attribute] += stat.value;
	});
}

export function get_display_stats(base_stats: Record<BaseAttribute, number>, combat_stats: Record<Attribute, number>): { [a in Attribute]?: number } {
	return {
		[BaseAttribute.HP]: get_base_attribute_value(BaseAttribute.HP, base_stats, combat_stats),
		[BaseAttribute.ATK]: get_base_attribute_value(BaseAttribute.ATK, base_stats, combat_stats),
		[BaseAttribute.DEF]: get_base_attribute_value(BaseAttribute.DEF, base_stats, combat_stats),

		[CombatAttribute.CritRate]: combat_stats[CombatAttribute.CritRate],
		[CombatAttribute.CritDamage]: combat_stats[CombatAttribute.CritDamage],
		[CombatAttribute.EnergyRegen]: combat_stats[CombatAttribute.EnergyRegen],

		[ElementDMGBonus.Physical]: combat_stats[ElementDMGBonus.Common] + combat_stats[ElementDMGBonus.Physical],
		[ElementDMGBonus.Glacio]: combat_stats[ElementDMGBonus.Common] + combat_stats[ElementDMGBonus.Glacio],
		[ElementDMGBonus.Fusion]: combat_stats[ElementDMGBonus.Common] + combat_stats[ElementDMGBonus.Fusion],
		[ElementDMGBonus.Electro]: combat_stats[ElementDMGBonus.Common] + combat_stats[ElementDMGBonus.Electro],
		[ElementDMGBonus.Aero]: combat_stats[ElementDMGBonus.Common] + combat_stats[ElementDMGBonus.Aero],
		[ElementDMGBonus.Spectro]: combat_stats[ElementDMGBonus.Common] + combat_stats[ElementDMGBonus.Spectro],
		[ElementDMGBonus.Havoc]: combat_stats[ElementDMGBonus.Common] + combat_stats[ElementDMGBonus.Havoc],

		[AttackDMGBonus.Basic]: combat_stats[AttackDMGBonus.Basic],
		[AttackDMGBonus.Heavy]: combat_stats[AttackDMGBonus.Heavy],
		[AttackDMGBonus.Skill]: combat_stats[AttackDMGBonus.Skill],
		[AttackDMGBonus.Liberation]: combat_stats[AttackDMGBonus.Liberation],
		[AttackDMGBonus.Intro]: combat_stats[AttackDMGBonus.Intro],
		[AttackDMGBonus.Outro]: combat_stats[AttackDMGBonus.Outro],

		[ElementDMGAmplify.Physical]: combat_stats[ElementDMGAmplify.Common] + combat_stats[ElementDMGAmplify.Physical],
		[ElementDMGAmplify.Glacio]: combat_stats[ElementDMGAmplify.Common] + combat_stats[ElementDMGAmplify.Glacio],
		[ElementDMGAmplify.Fusion]: combat_stats[ElementDMGAmplify.Common] + combat_stats[ElementDMGAmplify.Fusion],
		[ElementDMGAmplify.Electro]: combat_stats[ElementDMGAmplify.Common] + combat_stats[ElementDMGAmplify.Electro],
		[ElementDMGAmplify.Aero]: combat_stats[ElementDMGAmplify.Common] + combat_stats[ElementDMGAmplify.Aero],
		[ElementDMGAmplify.Spectro]: combat_stats[ElementDMGAmplify.Common] + combat_stats[ElementDMGAmplify.Spectro],
		[ElementDMGAmplify.Havoc]: combat_stats[ElementDMGAmplify.Common] + combat_stats[ElementDMGAmplify.Havoc],

		[AttackDMGAmplify.Basic]: combat_stats[AttackDMGAmplify.Basic],
		[AttackDMGAmplify.Heavy]: combat_stats[AttackDMGAmplify.Heavy],
		[AttackDMGAmplify.Skill]: combat_stats[AttackDMGAmplify.Skill],
		[AttackDMGAmplify.Liberation]: combat_stats[AttackDMGAmplify.Liberation],
		[AttackDMGAmplify.Intro]: combat_stats[AttackDMGAmplify.Intro],
		[AttackDMGAmplify.Outro]: combat_stats[AttackDMGAmplify.Outro],
	};
}

export function optimize(input: OptimizerInput, echoes: Echo[]): OptimizerOutput[] {
	const character = characters[input.character.name];
	const weapon = weapons[input.weapon.name];

	const builds = generate_builds(echoes, input.selected_sonatas);
	const init_stats = get_default_stats();

	// precompute bonus stats for character + weapon
	const base_stats = get_base_stats(character, weapon);

	character.apply_effects(input, init_stats);
	weapon.apply_effect(input, init_stats);
	apply_weapon_stats(init_stats, weapon);

	return builds.map<OptimizerOutput>((build) => {
		const combat_stats = structuredClone(init_stats);
		build.forEach((echo) => apply_echo_stats(combat_stats, echo));

		const skills = Object.fromEntries(
			Object.values(character.skills)
				.filter((skill) => skill.motions.length > 0)
				.map((skill) => {
					const skill_stats = structuredClone(combat_stats);
					skill.apply_effects(input, skill_stats);

					return [
						skill.type,
						{
							type: skill.type,
							name: skill.name,
							motions: skill.motions.map((motion) => {
								const attack_stats = structuredClone(skill_stats);
								motion.apply_effects(input, attack_stats);

								return {
									type: motion.type,
									name: motion.name,
									...default_finalizer(motion, input, base_stats, attack_stats)
								};
							})
						}
					];
				})
		) as OptimizerOutput['skills'];

		return {
			build,
			skills,
			stats: combat_stats,
			display_stats: get_display_stats(base_stats, combat_stats)
		};
	});
}