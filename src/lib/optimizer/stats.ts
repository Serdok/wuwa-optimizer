import type { CharacterData } from '$lib/data/characters';
import { character_curve } from '$lib/data/characters/curve';
import type { WeaponData } from '$lib/data/weapons';
import { weapon_primary_curve } from '$lib/data/weapons/curve';
import { type BaseStatKey, type StatKey, STATS } from '$lib/data/stats';
import type { Echo } from '$lib/data/echoes/types';

export function get_base_stats(character: CharacterData, weapon: WeaponData): Record<BaseStatKey, number> {
	const stats = { 'hp': 0, 'atk': 0, 'def': 0, };
	Object.values(character.base_stats).forEach(s => {
		stats[s.stat] = (stats[s.stat] || 0) + s.value * (character_curve['6/90'][s.stat] || 0);
	});

	stats[weapon.base_stats.primary.stat] += weapon.base_stats.primary.value * weapon_primary_curve['6/90'];
	return stats;
}

export function get_default_stats(): Record<StatKey, number> {
	const stats = Object.fromEntries(STATS.map(s => [s, 0])) as Record<StatKey, number>;

	stats.crit_rate = 0.05;
	stats.crit_dmg = 1.5;
	stats.energy_regen = 1;
	stats.skill_multiplier = 1;

	stats.enemy_resistance = 0.1;

	return stats;
}

export function get_base_stat_value(stat: BaseStatKey, base_stat: number, combat_stats: Record<StatKey, number>): number {
	return base_stat * (1 + (combat_stats[`${stat}_p`] ?? 0)) + combat_stats[stat];
}

export function apply_echo_stats(stats: Record<StatKey, number>, echo: Echo) {
	[echo.primary_stat, echo.secondary_stat, ...echo.sub_stats].forEach(s => {
		stats[s.stat] += s.value;
	});
}

export function get_display_stats(base_stats: Record<BaseStatKey, number>, combat_stats: Record<StatKey, number>) {
	return {
		'hp': get_base_stat_value('hp', base_stats.hp, combat_stats),
		'atk': get_base_stat_value('atk', base_stats.atk, combat_stats),
		'def': get_base_stat_value('def', base_stats.def, combat_stats),

		'crit_rate': combat_stats.crit_rate,
		'crit_dmg': combat_stats.crit_dmg,
		'energy_regen': combat_stats.energy_regen,

		'physical_bonus': combat_stats.physical_bonus,
		'glacio_bonus': combat_stats.glacio_bonus,
		'fusion_bonus': combat_stats.fusion_bonus,
		'electro_bonus': combat_stats.electro_bonus,
		'aero_bonus': combat_stats.aero_bonus,
		'spectro_bonus': combat_stats.spectro_bonus,
		'havoc_bonus': combat_stats.havoc_bonus,

		'basic_bonus': combat_stats.basic_bonus,
		'heavy_bonus': combat_stats.heavy_bonus,
		'skill_bonus': combat_stats.skill_bonus,
		'burst_bonus': combat_stats.burst_bonus,
	};
}

export function get_final_stats(base_stats: Record<BaseStatKey, number>, combat_stats: Record<StatKey, number>) {
	return {
		...combat_stats,

		'hp': get_base_stat_value('hp', base_stats.hp, combat_stats),
		'atk': get_base_stat_value('atk', base_stats.atk, combat_stats),
		'def': get_base_stat_value('def', base_stats.def, combat_stats),
	};
}