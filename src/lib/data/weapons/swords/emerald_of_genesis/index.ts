import type { WeaponData } from '$lib/data/weapons';

const ranks = [0.128, 0.16, 0.192, 0.224, 0.256];
const atk_bonus = [0.06, 0.075, 0.09, 0.105, 0.12];

export default {
	key: 'emerald_of_genesis',
	weapon_type: 'sword',
	base_stats: {
		primary: { stat: 'atk', value: 47 },
		secondary: { stat: 'crit_rate', value: 0.054 },
	},
	buffs: {
		'stormy_resolution': {
			key: 'stormy_resolution',
			kind: 'slider',
			value: 2,
			min_value: 0,
			max_value: 2,
		}
	},
	apply_effects: (request, combat_stats) => {
		combat_stats['energy_regen'] += ranks[request.weapon.rank - 1];
		combat_stats['atk_p'] += atk_bonus[request.weapon.rank - 1] * (request.character.buffs['stormy_resolution'] || 0);
	},
} as const satisfies WeaponData;
