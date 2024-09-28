import type { Character, CharacterMotion, CharacterStat } from '$lib/types/character';
import type { Weapon } from '$lib/types/weapon';
import type { Echo } from '$lib/types/echo';
import { Attribute } from '$lib/types/stat';

export function compute_base_stats(base_stat: Character['base_stats'], weapon: Weapon): Character['base_stats'] {
	const { attribute, value: weapon_value } = weapon.main_stat.primary;

	return {
		...base_stat,
		// sum the base stat with the matching weapon primary stat
		[attribute]: { attribute, value: base_stat[attribute].value + weapon_value },
	};
}

export function compute_effective_stats(character: Character, weapon: Weapon, combat_stats: { [a in Attribute]?: number }) {
	const base_stats = compute_base_stats(character.base_stats, weapon);
	return {
		...combat_stats,
		[Attribute.HP]: sum_as_flat_stat(Attribute.HP, base_stats, combat_stats),
		[Attribute.ATK]: sum_as_flat_stat(Attribute.ATK, base_stats, combat_stats),
		[Attribute.DEF]: sum_as_flat_stat(Attribute.DEF, base_stats, combat_stats),
	};
}

function sum_as_flat_stat(
	flat: keyof Character['base_stats'],
	base_stats: Character['base_stats'],
	computed_stats: CharacterStat
) {
	return (
		base_stats[flat].value * (1 + (computed_stats[`${flat}%`] ?? 0)) + (computed_stats[flat] ?? 0)
	);
}

export function compute_combat_stats(character: Character, weapon: Weapon, build: Echo[]) {
	// TODO: set proper default values for each attribute
	let computed_stats: { [a in Attribute]?: number } = {
		[Attribute.CritRate]: 0.05,
		[Attribute.CritDamage]: 1.5,
		[Attribute.EnergyRegen]: 1
	};

	// apply character bonuses
	computed_stats = character.stat_bonuses
		.filter((b) => b.enabled)
		.reduce(
			(stats, buff) => ({
				...stats,
				[buff.attribute]: (stats[buff.attribute] || 0) + buff.value
			}),
			computed_stats
		);
	// console.log('after character bonuses: ', structuredClone(computed_stats));

	// apply weapon bonuses
	computed_stats[weapon.main_stat.secondary.attribute] =
		(computed_stats[weapon.main_stat.secondary.attribute] || 0) + weapon.main_stat.secondary.value;

	// apply weapon conditionals
	computed_stats = weapon.conditionals
		.filter((b) => b.condition(weapon))
		.reduce((stats, buff) => buff.pre_compute(weapon, stats), computed_stats);
	// console.log('after weapon buffs: ', structuredClone(computed_stats));

	// apply build main stats
	computed_stats = build.reduce((stats, echo) => {
		const {
			main_stat: { primary: main_primary, secondary: main_secondary }
		} = echo;

		return {
			...stats,
			[main_primary.attribute]: (stats[main_primary.attribute] ?? 0) + main_primary.value,
			[main_secondary.attribute]: (stats[main_secondary.attribute] ?? 0) + main_secondary.value
		};
	}, computed_stats);

	// apply build sub stats
	computed_stats = build
		.flatMap((echo) => echo.sub_stats)
		.reduce(
			(stats, { attribute, value }) => ({
				...stats,
				[attribute]: (stats[attribute] ?? 0) + value
			}),
			computed_stats
		);
	// console.log('after build stats: ', structuredClone(computed_stats));

	return computed_stats;
}

export function compute_motion_stats(
	combat_stats: { [a in Attribute]?: number },
	character: Character,
	motion: CharacterMotion
) {
	// apply character conditionals specific to the given motion
	return motion.conditionals
		.filter((b) => b.condition(character))
		.reduce((stats, buff) => buff.pre_compute(character, stats), combat_stats);
	// console.log('after character buffs: ', structuredClone(computed_stats));
}

export function get_common_conditionals(character: Character) {
	const motions = Object.values(character.skills).flatMap((s) => s.motions);
	if (motions.length === 0) {
		return [];
	}

	return motions
		.map((m) => m.conditionals)
		.reduce(
			(common, conditionals) =>
				common.filter((cond) => conditionals.some((c) => c.name === cond.name)),
			motions[0].conditionals
		);
}