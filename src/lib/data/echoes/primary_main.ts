import type { StatType } from '$lib/data/stats/types';

export default {
	1: {
		cost: 1,
		stats: {
			'hp_p': {
				stat: 'hp_p',
				values: {
					2: { rank: 2, base: 0.028 },
					3: { rank: 3, base: 0.03 },
					4: { rank: 4, base: 0.034 },
					5: { rank: 5, base: 0.045 }
				}
			},
			'atk_p': {
				stat: 'atk_p',
				values: {
					2: { rank: 2, base: 0.022 },
					3: { rank: 3, base: 0.024 },
					4: { rank: 4, base: 0.027 },
					5: { rank: 5, base: 0.036 }
				}
			},
			'def_p': {
				stat: 'def_p',
				values: {
					2: { rank: 2, base: 0.022 },
					3: { rank: 3, base: 0.024 },
					4: { rank: 4, base: 0.027 },
					5: { rank: 5, base: 0.036 }
				}
			},
		},
	},
	3: {
		cost: 3,
		stats: {
			'hp_p': {
				stat: 'hp_p',
				values: {
					2: { rank: 2, base: 0.037 },
					3: { rank: 3, base: 0.04 },
					4: { rank: 4, base: 0.045 },
					5: { rank: 5, base: 0.06 }
				}
			},
			'atk_p': {
				stat: 'atk_p',
				values: {
					2: { rank: 2, base: 0.037 },
					3: { rank: 3, base: 0.04 },
					4: { rank: 4, base: 0.045 },
					5: { rank: 5, base: 0.06 }
				}
			},
			'def_p': {
				stat: 'def_p',
				values: {
					2: { rank: 2, base: 0.047 },
					3: { rank: 3, base: 0.05 },
					4: { rank: 4, base: 0.057 },
					5: { rank: 5, base: 0.076 }
				}
			},
			'glacio_bonus': {
				stat: 'glacio_bonus',
				values: {
					2: { rank: 2, base: 0.037 },
					3: { rank: 3, base: 0.04 },
					4: { rank: 4, base: 0.045 },
					5: { rank: 5, base: 0.06 }
				}
			},
			'fusion_bonus': {
				stat: 'fusion_bonus',
				values: {
					2: { rank: 2, base: 0.037 },
					3: { rank: 3, base: 0.04 },
					4: { rank: 4, base: 0.045 },
					5: { rank: 5, base: 0.06 }
				}
			},
			'electro_bonus': {
				stat: 'electro_bonus',
				values: {
					2: { rank: 2, base: 0.037 },
					3: { rank: 3, base: 0.04 },
					4: { rank: 4, base: 0.045 },
					5: { rank: 5, base: 0.06 }
				}
			},
			'aero_bonus': {
				stat: 'aero_bonus',
				values: {
					2: { rank: 2, base: 0.037 },
					3: { rank: 3, base: 0.04 },
					4: { rank: 4, base: 0.045 },
					5: { rank: 5, base: 0.06 }
				}
			},
			'spectro_bonus': {
				stat: 'spectro_bonus',
				values: {
					2: { rank: 2, base: 0.037 },
					3: { rank: 3, base: 0.04 },
					4: { rank: 4, base: 0.045 },
					5: { rank: 5, base: 0.06 }
				}
			},
			'havoc_bonus': {
				stat: 'havoc_bonus',
				values: {
					2: { rank: 2, base: 0.037 },
					3: { rank: 3, base: 0.04 },
					4: { rank: 4, base: 0.045 },
					5: { rank: 5, base: 0.06 }
				}
			},
			'energy_regen': {
				stat: 'energy_regen',
				values: {
					2: { rank: 2, base: 0.0385 }, // approximation
					3: { rank: 3, base: 0.05 },
					4: { rank: 4, base: 0.057 },
					5: { rank: 5, base: 0.076 }
				}
			},
		},
	},
	4: {
		cost: 4,
		stats: {
			'hp_p': {
				stat: 'hp_p',
				values: {
					2: { rank: 2, base: 0.041 },
					3: { rank: 3, base: 0.043 },
					4: { rank: 4, base: 0.049 },
					5: { rank: 5, base: 0.066 }
				}
			},
			'atk_p': {
				stat: 'atk_p',
				values: {
					2: { rank: 2, base: 0.041 },
					3: { rank: 3, base: 0.043 },
					4: { rank: 4, base: 0.049 },
					5: { rank: 5, base: 0.066 }
				}
			},
			'def_p': {
				stat: 'def_p',
				values: {
					2: { rank: 2, base: 0.052 },
					3: { rank: 3, base: 0.055 },
					4: { rank: 4, base: 0.062 },
					5: { rank: 5, base: 0.083 }
				}
			},
			'crit_rate': {
				stat: 'crit_rate',
				values: {
					2: { rank: 2, base: 0.027 },
					3: { rank: 3, base: 0.029 },
					4: { rank: 4, base: 0.033 },
					5: { rank: 5, base: 0.044 }
				}
			},
			'crit_dmg': {
				stat: 'crit_dmg',
				values: {
					2: { rank: 2, base: 0.054 },
					3: { rank: 3, base: 0.058 },
					4: { rank: 4, base: 0.066 },
					5: { rank: 5, base: 0.088 }
				}
			},
			'healing_bonus': {
				stat: 'healing_bonus',
				values: {
					2: { rank: 2, base: 0.0327 }, // approximation
					3: { rank: 3, base: 0.035 },
					4: { rank: 4, base: 0.039 },
					5: { rank: 5, base: 0.052 }
				}
			},
		},
	},
} as const as
	Record<
		number,
		{
			cost: number,
			stats: { [k in StatType]?: { stat: k, values: { [r: number]: { rank: number, base: number } } } }
		}
	>;