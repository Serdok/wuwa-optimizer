import type { WeaponData } from '$lib/data/weapons';

const ranks = [0.128, 0.16, 0.192, 0.224, 0.256];
const attack_bonus = [0.10, 0.125, 0.15, 0.175, 0.2];

export default {
	key: 'static_mist',
	weapon_type: 'pistol',
	base_stats: {
		primary: { stat: 'atk', value: 47 },
		secondary: { stat: 'crit_rate', value: 0.054 },
	},
	buffs: {},
	apply_effects: (request, combat_stats) => {
		combat_stats['energy_regen'] += ranks[request.weapon.rank - 1];

		// todo: next character +atk% buff on outro
	},
} as const satisfies WeaponData;
