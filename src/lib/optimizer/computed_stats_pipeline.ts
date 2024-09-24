import type { Character } from '$lib/types/character';
import type { Weapon } from '$lib/types/weapon';
import type { Echo } from '$lib/types/echo';
import { Attribute } from '$lib/types/stat';

export function compute_stats(character: Character, weapon: Weapon, build: Echo[]) {
	// TODO: set proper default values for each attribute
	let computed_stats: { [a in Attribute]?: number } = {
		[Attribute.CritRate]: 0.05,
		[Attribute.CritDamage]: 1.5,
		[Attribute.EnergyRegen]: 1,
	};

	// apply character bonuses
	for (const bonus of character.stat_bonuses.filter(b => b.enabled)) {
		computed_stats[bonus.attribute] = (computed_stats[bonus.attribute] || 0) + bonus.value;
	}
	console.log('after character bonuses: ', structuredClone(computed_stats));

	// apply character conditionals
	computed_stats = character.conditionals.filter(b => b.condition(character)).reduce((stats, buff) => buff.pre_compute(character, stats), computed_stats);
	console.log('after character buffs: ', structuredClone(computed_stats));

	// apply weapon bonuses
	computed_stats[weapon.main_stat.secondary.attribute] = (computed_stats[weapon.main_stat.secondary.attribute] || 0) + weapon.main_stat.secondary.value;

	// apply weapon conditionals
	computed_stats = weapon.conditionals.filter(b => b.condition(weapon)).reduce((stats, buff) => buff.pre_compute(weapon, stats), computed_stats);
	console.log('after weapon buffs: ', structuredClone(computed_stats));

	// apply build main stats
	computed_stats = build.reduce((stats, echo) => {
		const { main_stat: { primary: main_primary, secondary: main_secondary } } = echo;

		return {
			...stats,
			[main_primary.attribute]: (stats[main_primary.attribute] ?? 0) + main_primary.value,
			[main_secondary.attribute]: (stats[main_secondary.attribute] ?? 0) + main_secondary.value,
		};
	}, computed_stats);

	// apply build sub stats
	computed_stats = build.flatMap(echo => echo.sub_stats).reduce((stats, { attribute, value }) => ({
		...stats,
		[attribute]: (stats[attribute] ?? 0) + value,
	}), computed_stats);
	console.log('after build stats: ', structuredClone(computed_stats));

	return computed_stats;
}