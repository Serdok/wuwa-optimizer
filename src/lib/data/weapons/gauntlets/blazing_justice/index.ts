import type { WeaponData } from '$lib/data/weapons';

const ranks = [0.12, 0.15, 0.18, 0.21, 0.24];
const def_ignore = [0.08, 0.1, 0.12, 0.14, 0.16];
const sfrazzle_amp = [0.5, 0.625, 0.75, 0.875, 1];

export default {
	key: 'blazing_justice',
	weapon_type: 'gauntlet',
	base_stats: {
		primary: { stat: 'atk', value: 47 },
		secondary: { stat: 'crit_dmg', value: 0.108 },
	},
	buffs: {
		'cast_basic_attack': {
			key: 'cast_basic_attack',
			kind: 'switch',
			value: 1,
		}
	},
	apply_effects: (request, combat_stats) => {
		combat_stats.atk_p += ranks[request.weapon.rank - 1];
		combat_stats.enemy_def_ignore += def_ignore[request.weapon.rank - 1];
		combat_stats.spectro_frazzle_amplify += sfrazzle_amp[request.weapon.rank - 1];
	},
} as const satisfies WeaponData;