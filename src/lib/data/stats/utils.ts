import {
	BASE_STATS,
	type BaseStatType,
	type StatDef,
	type StatResult,
	STATS,
	type StatSchema,
	type StatType
} from '$lib/data/stats/types';
import { STAT_ICONS } from '$lib/data/stats/display';
import { character_curve } from '$lib/data/characters/curve';
import { weapon_primary_curve } from '$lib/data/weapons/curve';
import type { Echo } from '$lib/data/echoes/types';

export function is_base_stat(stat: string): stat is BaseStatType {
	return (BASE_STATS as readonly string[]).includes(stat);
}

export function has_icon(stat: string): stat is keyof typeof STAT_ICONS {
	return stat in STAT_ICONS;
}

type CharacterBaseStats = StatSchema<BaseStatType>;
type WeaponBaseStats = { primary: StatDef<BaseStatType>; secondary: StatDef<StatType>; };

export function get_base_stats(character_base: CharacterBaseStats, weapon_base: WeaponBaseStats) {
	const stats = { 'hp': 0, 'atk': 0, 'def': 0, };
	Object.values(character_base).forEach(s => {
		stats[s.stat] = (stats[s.stat] || 0) + s.value * (character_curve['6/90'][s.stat] || 0);
	});

	stats[weapon_base.primary.stat] += weapon_base.primary.value * weapon_primary_curve['6/90'];
	return stats as StatResult<BaseStatType>;
}

export function get_empty_stats() {
	return Object.fromEntries(STATS.map(s => [s, 0])) as StatResult<StatType>;
}

export function get_default_stats() {
	const stats = get_empty_stats();

	stats.crit_rate = 0.05;
	stats.crit_dmg = 1.5;
	stats.energy_regen = 1;
	stats.skill_multiplier = 1;

	stats.enemy_level = 90;
	stats.enemy_resistance = 0.1;

	return stats;
}

export function get_base_stat_value(stat: BaseStatType, base_stat: number, combat_stats: StatResult<StatType>) {
	return base_stat * (1 + (combat_stats[`${stat}_p`] ?? 0)) + combat_stats[stat];
}

export function apply_echo_stats(stats: StatResult<StatType>, echo: Echo) {
	[echo.primary_stat, echo.secondary_stat, ...echo.sub_stats].forEach(s => {
		stats[s.stat] += s.value;
	});
}

export function get_display_stats(base_stats: StatResult<BaseStatType>, combat_stats: StatResult<StatType>) {
	return {
		hp: get_base_stat_value('hp', base_stats.hp, combat_stats),
		atk: get_base_stat_value('atk', base_stats.atk, combat_stats),
		def: get_base_stat_value('def', base_stats.def, combat_stats),

		crit_rate: combat_stats.crit_rate,
		crit_dmg: combat_stats.crit_dmg,
		energy_regen: combat_stats.energy_regen,

		physical_bonus: combat_stats.physical_bonus,
		glacio_bonus: combat_stats.glacio_bonus,
		fusion_bonus: combat_stats.fusion_bonus,
		electro_bonus: combat_stats.electro_bonus,
		aero_bonus: combat_stats.aero_bonus,
		spectro_bonus: combat_stats.spectro_bonus,
		havoc_bonus: combat_stats.havoc_bonus,

		basic_bonus: combat_stats.basic_bonus,
		heavy_bonus: combat_stats.heavy_bonus,
		skill_bonus: combat_stats.skill_bonus,
		burst_bonus: combat_stats.burst_bonus,
	};
}

export function get_final_stats(base_stats: StatResult<BaseStatType>, combat_stats: StatResult<StatType>) {
	return {
		...combat_stats,

		'hp': get_base_stat_value('hp', base_stats.hp, combat_stats),
		'atk': get_base_stat_value('atk', base_stats.atk, combat_stats),
		'def': get_base_stat_value('def', base_stats.def, combat_stats),
	};
}

export function stat_bonus_crit_rate() {
	return [{ stat: 'crit_rate', value: 0.012, }, { stat: 'crit_rate', value: 0.028, }] as const;
}

export function stat_bonus_crit_dmg() {
	return [{ stat: 'crit_dmg', value: 0.012, }, { stat: 'crit_dmg', value: 0.028, }] as const;
}

export function stat_bonus_atk_p() {
	return [{ stat: 'atk_p', value: 0.018, }, { stat: 'atk_p', value: 0.042, }] as const;
}

export function stat_bonus_hp_p() {
	return [{ stat: 'hp_p', value: 0.018 }, { stat: 'hp_p', value: 0.042 }] as const;
}