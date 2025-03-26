import type { WeaponData } from '$lib/data/weapons';

const ranks = [0.128, 0.16, 0.192, 0.224, 0.256];
const skill_bonuses = [0.07, 0.0875, 0.105, 0.1225, 0.14];

export default {
	key: 'lustrous_razor',
	weapon_type: 'broadsword',
	base_stats: {
		primary: { stat: 'atk', value: 47 },
		secondary: { stat: 'atk_p', value: 0.081 },
	},
	buffs: {
		'skill_cast': {
			key: 'skill_cast',
			kind: 'slider',
			value: 3,
			min_value: 0,
			max_value: 3,
		},
	},
	apply_effects: (input, combat_stats) => {
		combat_stats['energy_regen'] += ranks[input.weapon.rank - 1];
		combat_stats['skill_bonus'] += (skill_bonuses[input.weapon.rank - 1] * (input.weapon.buffs['skill_cast'] || 0));
	},
} as const satisfies WeaponData;
