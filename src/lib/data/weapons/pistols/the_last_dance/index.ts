import type { WeaponData } from '$lib/data/weapons';

const ranks = [0.12, 0.15, 0.18, 0.21, 0.24];
const skill_bonus = [0.48, 0.60, 0.72, 0.84, 0.96];

export default {
	key: 'the_last_dance',
	weapon_type: 'pistol',
	base_stats: {
		primary: { stat: 'atk', value: 40 },
		secondary: { stat: 'crit_dmg', value: 0.16 },
	},
	buffs: {
		'silent_eulogy': {
			key: 'silent_eulogy',
			kind: 'switch',
			value: 1,
		}
	},
	apply_effects: (input, combat_stats) => {
		combat_stats['atk_p'] += ranks[input.weapon.rank - 1];
		combat_stats['skill_bonus'] += skill_bonus[input.weapon.rank - 1] * (input.character.buffs['silent_eulogy'] || 0);
	},
} as const satisfies WeaponData;
