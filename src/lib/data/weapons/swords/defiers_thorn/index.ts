import type { WeaponData } from '$lib/data/weapons';

const ranks = [0.12, 0.15, 0.18, 0.21, 0.24];
const def_ignore = [0.08, 0.1, 0.12, 0.14, 0.16];
const enemy_dmg_amp = [0.2, 0.25, 0.3, 0.35, 0.4];

export default {
	key: 'defiers_thorn',
	weapon_type: 'sword',
	base_stats: {
		primary: { stat: 'atk', value: 33 },
		secondary: { stat: 'hp_p', value: 0.161 },
	},
	buffs: {
		a_free_knights_tarantella: {
			key: 'a_free_knights_tarantella',
			kind: 'slider',
			value: 2,
			min_value: 0,
			max_value: 2,
		}
	},
	apply_effects: (input, combat_stats) => {
		const { a_free_knights_tarantella } = input.weapon.buffs;

		combat_stats.hp_p += ranks[input.weapon.rank - 1];
		if (a_free_knights_tarantella) {
			combat_stats.enemy_def_ignore += def_ignore[input.weapon.rank - 1];
			combat_stats.enemy_damage_vulnerability += enemy_dmg_amp[input.weapon.rank - 1];
		}
	},
} as const satisfies WeaponData;
