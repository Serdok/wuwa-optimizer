import type { WeaponData } from '$lib/data/weapons';

const ranks = [0.12, 0.15, 0.18, 0.21, 0.24];
const normal_bonuses = [0.14, 0.175, 0.21, 0.245, 0.28];

export default {
	key: 'luminous_hymn',
	weapon_type: 'rectifier',
	base_stats: {
		primary: { stat: 'atk', value: 40 },
		secondary: { stat: 'crit_rate', value: 0.08 },
	},
	buffs: {
		'homebuilder_s_anthem': {
			key: 'homebuilder_s_anthem',
			kind: 'slider',
			min_value: 0,
			max_value: 3,
		},
	},
	apply_effects: (request, combat_stats) => {
		combat_stats.atk_p += ranks[request.weapon.rank - 1];
		combat_stats.basic_bonus += (normal_bonuses[request.weapon.rank - 1] * (request.weapon.buffs['homebuilder_s_anthem'] || 0));
		combat_stats.heavy_bonus += (normal_bonuses[request.weapon.rank - 1] * (request.weapon.buffs['homebuilder_s_anthem'] || 0));
	},
} as const satisfies WeaponData;
