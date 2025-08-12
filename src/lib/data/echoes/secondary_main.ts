import type { StatType } from '$lib/data/stats/types';

export default {
	1: {
		cost: 1,
		stats: {
			'hp': {
				stat: 'hp',
				values: {
					2: { rank: 2, base: 114 },
					3: { rank: 3, base: 152 },
					4: { rank: 4, base: 228 },
					5: { rank: 5, base: 456 }
				}
			}
		},
	},
	3: {
		cost: 3,
		stats: {
			'atk': {
				stat: 'atk',
				values: {
					2: { rank: 2, base: 12 },
					3: { rank: 3, base: 13 },
					4: { rank: 4, base: 15 },
					5: { rank: 5, base: 20 }
				}
			},
		},
	},
	4: {
		cost: 4,
		stats: {
			'atk': {
				stat: 'atk',
				values: {
					2: { rank: 2, base: 18 },
					3: { rank: 3, base: 20 },
					4: { rank: 4, base: 22 },
					5: { rank: 5, base: 30 }
				}
			}
		}
	},
} as const as
	Record<
		number,
		{
			cost: number,
			stats: { [k in StatType]?: { stat: k, values: { [r: number]: { rank: number, base: number } } } }
		}
	>;