import type { MotionDef } from '$lib/data/characters/types';

const data = [
	{
		type: 'basic',
		key: 'basic_attack_1_dmg',
		elements: ['fusion'],
		specials: [],
		related_stat: 'atk',
		values: [0.2949, 0.2949]
	},
	{
		type: 'basic',
		key: 'basic_attack_2_dmg',
		elements: ['fusion'],
		specials: [],
		related_stat: 'atk',
		values: [0.3549, 0.3549]
	},
	{
		type: 'basic',
		key: 'basic_attack_3_dmg',
		elements: ['fusion'],
		specials: [],
		related_stat: 'atk',
		values: [0.3645, 0.3645, 0.3645]
	},
	{
		type: 'basic',
		key: 'basic_attack_4_dmg',
		elements: ['fusion'],
		specials: [],
		related_stat: 'atk',
		values: [0.507, 0.2958, 0.2958, 0.2958]
	},
	{
		type: 'basic',
		key: 'mid_air_attack_1_dmg',
		elements: ['fusion'],
		specials: [],
		related_stat: 'atk',
		values: [0.6135]
	},
	{
		type: 'basic',
		key: 'mid_air_attack_2_dmg',
		elements: ['fusion'],
		specials: [],
		related_stat: 'atk',
		values: [0.5087, 0.5087]
	},
	{
		type: 'basic',
		key: 'mid_air_attack_3_dmg',
		elements: ['fusion'],
		specials: [],
		related_stat: 'atk',
		values: [0.44, 0.44, 0.44]
	},
	{
		type: 'basic',
		key: 'mid_air_attack_4_dmg',
		elements: ['fusion'],
		specials: [],
		related_stat: 'atk',
		values: [0.3803, 0.2218, 0.2218, 0.2218, 0.2218]
	},
	{
		type: 'heavy',
		key: 'heavy_attack',
		elements: ['fusion'],
		specials: [],
		related_stat: 'atk',
		values: [0.2899, 0.2899, 0.2899, 0.3727]
	},
	{
		type: 'heavy',
		key: 'mid_air_heavy_attack',
		elements: ['fusion'],
		specials: [],
		related_stat: 'atk',
		values: [1.2327]
	},
	{
		type: 'basic',
		key: 'dodge_counter',
		elements: ['fusion'],
		specials: [],
		related_stat: 'atk',
		values: [0.8264, 0.8264, 0.8264]
	}
] as const satisfies MotionDef[];

export { data as normal };
