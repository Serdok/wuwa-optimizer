import type { MotionDef } from '$lib/data/characters/types';

const data = [
	{
		type: 'basic',
		key: 'stage_1_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [0.2953]
	},
	{
		type: 'basic',
		key: 'stage_2_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [0.2237, 0.2734]
	},
	{
		type: 'basic',
		key: 'stage_3_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [0.1424, 0.1424, 0.1424, 0.1424, 0.1424, 0.1424, 0.1424, 0.1424]
	},
	{
		type: 'heavy',
		key: 'heavy_attack_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [0.4135, 0.4135, 0.4135, 0.4135]
	},
	{
		type: 'basic',
		key: 'mid_air_attack_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [0.4623, 0.4623]
	},
	{
		type: 'basic',
		key: 'dodge_counter_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [0.2158, 0.2158, 0.2158, 0.2158, 0.2158, 0.2158, 0.2158, 0.2158]
	},
	{
		type: 'basic',
		key: 'chamuel_s_star_dodge_counter_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [0.4386, 0.4386, 0.4386, 0.4386, 0.4386, 0.4386, 0.4386]
	}
] as const satisfies MotionDef[];

export { data as normal };
