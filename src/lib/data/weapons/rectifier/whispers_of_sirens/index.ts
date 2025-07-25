import type { WeaponData } from '$lib/data/weapons';

const ranks = [0.12, 0.15, 0.18, 0.21, 0.24];
const basic_bonuses = [0.4, 0.5, 0.6, 0.7, 0.8];
const res_bonuses = [0.12, 0.15, 0.18, 0.21, 0.24];

export default {
	key: 'whispers_of_sirens',
	weapon_type: 'rectifier',
	base_stats: {
		primary: { stat: 'atk', value: 40 },
		secondary: { stat: 'crit_dmg', value: 0.16 },
	},
	buffs: {
		'from_the_deep': {
			key: 'from_the_deep',
			kind: 'slider',
			value: 2,
			min_value: 0,
			max_value: 2,
		},
	},
	apply_effects: (input, combat_stats) => {
		const { from_the_deep } = input.weapon.buffs;

		combat_stats.atk_p += ranks[input.weapon.rank - 1];
		if (from_the_deep >= 1) {
			combat_stats.basic_bonus += basic_bonuses[input.weapon.rank - 1];
		}
		if (from_the_deep >= 2) {
			combat_stats.enemy_resistance -= res_bonuses[input.weapon.rank - 1];
		}
	},
} as const satisfies WeaponData;
