import type { WeaponData } from '$lib/data/weapons';

const ranks = [0.12, 0.15, 0.18, 0.21, 0.24];
const skill_bonus = [0.04, 0.05, 0.06, 0.07, 0.08];

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
	apply_effects: (request, combat_stats) => {
		combat_stats['atk_p'] += ranks[request.weapon.rank - 1];
		combat_stats['skill_bonus'] += skill_bonus[request.weapon.rank - 1] * (request.character.buffs['searing_feather'] || 0);
	},
} as const satisfies WeaponData;
