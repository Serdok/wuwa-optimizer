import type { BaseStatKey } from '$lib/data/stats';

export const character_curve = {
	'0/1': { 'hp': 1, 'atk': 1, 'def': 1, },
	'0/20': { 'hp': 2.6011, 'atk': 2.6011, 'def': 2.5655, },
	'1/20': { 'hp': 3.2677, 'atk': 3.3511, 'def': 3.2136, },
	'1/40': { 'hp': 4.9531, 'atk': 5.0365, 'def': 4.8616, },
	'2/40': { 'hp': 5.6198, 'atk': 5.7865, 'def': 5.5097, },
	'2/50': { 'hp': 6.4625, 'atk': 6.6292, 'def': 6.3337, },
	'3/50': { 'hp': 7.1292, 'atk': 7.3792, 'def': 6.9818, },
	'3/60': { 'hp': 7.9719, 'atk': 8.2219, 'def': 7.8058, },
	'4/60': { 'hp': 8.6385, 'atk': 8.9719, 'def': 8.454, },
	'4/70': { 'hp': 9.4812, 'atk': 9.8146, 'def': 9.2779, },
	'5/70': { 'hp': 10.1479, 'atk': 10.3146, 'def': 9.9261, },
	'5/80': { 'hp': 10.9906, 'atk': 11.1573, 'def': 10.7501, },
	'6/80': { 'hp': 11.6573, 'atk': 11.6573, 'def': 11.3982, },
	'6/90': { 'hp': 12.5, 'atk': 12.5, 'def': 12.2222, }
} as { [level: string]: Record<BaseStatKey, number> };