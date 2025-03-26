import type { WeaponData } from '$lib/data/weapons';

export default {
	key: 'blazing_brilliance',
	weapon_type: 'sword',
	base_stats: {
		primary: { stat: 'atk', value: 47 },
		secondary: { stat: 'crit_dmg', value: 0.108 },
	},
	buffs: {
		'searing_feather': {
			key: 'searing_feather',
			kind: 'slider',
			value: 14,
			min_value: 0,
			max_value: 14,
		}
	},
	apply_effects: (input, combat_stats) => {},
} as const satisfies WeaponData;
