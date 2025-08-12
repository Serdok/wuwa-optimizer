import type { StatType } from '$lib/data/stats/types';

export default {
	'hp': {
		stat: 'hp',
		values: [320, 360, 390, 430, 470, 510, 540, 580]
	},
	'atk': {
		stat: 'atk',
		values: [30, 40, 50, 60, 70]
	},
	'def': {
		stat: 'def',
		values: [30, 40, 50, 60, 70]
	},
	'hp_p': {
		stat: 'hp_p',
		values: [0.064, 0.071, 0.079, 0.086, 0.094, 0.101, 0.109, 0.116]
	},
	'atk_p': {
		stat: 'atk_p',
		values: [0.064, 0.071, 0.079, 0.086, 0.094, 0.101, 0.109, 0.116]
	},
	'def_p': {
		stat: 'def_p',
		values: [0.081, 0.09, 0.1, 0.109, 0.118, 0.128, 0.138, 0.147]
	},
	'crit_rate': {
		stat: 'crit_rate',
		values: [0.063, 0.069, 0.075, 0.081, 0.087, 0.093, 0.099, 0.105]
	},
	'crit_dmg': {
		stat: 'crit_dmg',
		values: [0.126, 0.138, 0.15, 0.162, 0.174, 0.186, 0.198, 0.21]
	},
	'energy_regen': {
		stat: 'energy_regen',
		values: [0.068, 0.076, 0.084, 0.092, 0.1, 0.108, 0.116, 0.124]
	},
	'basic_bonus': {
		stat: 'basic_bonus',
		values: [0.064, 0.071, 0.079, 0.086, 0.094, 0.101, 0.109, 0.116]
	},
	'heavy_bonus': {
		stat: 'heavy_bonus',
		values: [0.064, 0.071, 0.079, 0.086, 0.094, 0.101, 0.109, 0.116]
	},
	'skill_bonus': {
		stat: 'skill_bonus',
		values: [0.064, 0.071, 0.079, 0.086, 0.094, 0.101, 0.109, 0.116]
	},
	'burst_bonus': {
		stat: 'burst_bonus',
		values: [0.064, 0.071, 0.079, 0.086, 0.094, 0.101, 0.109, 0.116]
	}
} as const as { [key in StatType]?: { stat: key, values: number[] } };