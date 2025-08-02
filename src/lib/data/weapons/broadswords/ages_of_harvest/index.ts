import type { WeaponData } from '$lib/data/weapons';

const ranks = [0.12, 0.15, 0.18, 0.21, 0.24];
const skill_bonuses = [0.24, 0.3, 0.36, 0.42, 0.48];

export default {
	key: 'ages_of_harvest',
	weapon_type: 'broadsword',
	base_stats: {
		primary: { stat: 'atk', value: 47 },
		secondary: { stat: 'crit_rate', value: 0.054 },
	},
	buffs: {
		'ageless_marking': {
			key: 'ageless_marking',
			kind: 'switch',
			value: 1,
		},
		'ethereal_endowment': {
			key: 'ethereal_endowment',
			kind: 'switch',
			value: 1,
		}
	},
	apply_effects: (request, combat_stats) => {
		combat_stats['general_bonus'] += ranks[request.weapon.rank - 1];
		combat_stats['skill_bonus'] += (skill_bonuses[request.weapon.rank - 1] * (request.weapon.buffs['ageless_marking'] || 0));
		combat_stats['skill_bonus'] += (skill_bonuses[request.weapon.rank - 1] * (request.weapon.buffs['ethereal_endowment'] || 0));
	},
} as const satisfies WeaponData;
