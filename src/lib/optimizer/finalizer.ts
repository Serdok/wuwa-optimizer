import type { MotionDef } from '$lib/data/characters/types';
import type { BaseStatType, StatResult, StatType } from '$lib/data/stats/types';
import { get_base_stat_value } from '$lib/data/stats/utils';

export function default_finalizer(motion: MotionDef, base_stats: StatResult<BaseStatType>, combat_stats: StatResult<StatType>) {
	// source: https://wutheringwaves.fandom.com/wiki/Damage
	// source: https://wutheringwaves.gg/damage-calculation-guide/

	// related_property * skill multiplier * skill scaling
	const skill_hits: number[] = motion.values.map((v: number) => v * combat_stats.skill_multiplier * get_base_stat_value(motion.related_stat, base_stats[motion.related_stat], combat_stats));

	// hit * (element bonus + skill bonus) * skill amplify
	const bonus = combat_stats.general_bonus + motion.elements.reduce((acc, e) => acc + combat_stats[`${e}_bonus`], 0) + combat_stats[`${motion.type}_bonus`];
	const amplify = combat_stats.general_amplify + motion.elements.reduce((acc, e) => acc + combat_stats[`${e}_amplify`], 0) + combat_stats[`${motion.type}_amplify`];

	// fixme: find where these apply? for the moment they will apply as bonus damage
	const specials = motion.specials.reduce((acc, e) => acc + combat_stats[e], 0);

	const dmg_vulnerability = combat_stats.enemy_damage_vulnerability;

	const expected_hits = skill_hits.map(v => v * (1 + bonus + specials) * (1 + amplify) * (1 + dmg_vulnerability));

	// res * def * dmg reduction * element reduction
	const resistance = combat_stats.enemy_resistance;
	let resistance_factor = 0;
	if (resistance < 0) {
		resistance_factor = 1 - (resistance / 2);
	} else if (resistance < 0.8) {
		resistance_factor = 1 - resistance;
	} else {
		resistance_factor = 1/(1 + 5 * resistance);
	}

	const defense = 792 + 8 * combat_stats.enemy_level;
	const attack_power = 800 + 8 * combat_stats.enemy_level;
	const defense_factor = attack_power / (attack_power + defense * (1 - combat_stats.enemy_def_ignore));

	const final_hits = expected_hits.map(v => v * resistance_factor * defense_factor);

	const crit_rate = combat_stats.crit_rate;
	const crit_damage = combat_stats.crit_dmg;
	const average_factor = (1 - crit_rate) + (crit_rate * crit_damage);

	return {
		non_crit: final_hits,
		average: final_hits.map(v => v * average_factor),
		forced_crit: final_hits.map(v => v * crit_damage),
	};
}