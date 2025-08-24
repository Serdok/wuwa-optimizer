import type { MotionDef } from '$lib/data/characters/types';

const data = [
	{
		key: 'stage_1_dmg',
		type: 'basic',
		elements: ['havoc'],
		specials: [],
		related_stat: 'atk',
		values: [0.7953]
	},
	{
		key: 'stage_2_dmg',
		type: 'basic',
		elements: ['havoc'],
		specials: [],
		related_stat: 'atk',
		values: [0.3644, 0.3644, 0.3644, 0.3644]
	},
	{
		key: 'stage_3_dmg',
		type: 'basic',
		elements: ['havoc'],
		specials: [],
		related_stat: 'atk',
		values: [0.7257, 0.7257]
	},
	{
		key: 'heavy_attack_dmg',
		type: 'heavy',
		elements: ['havoc'],
		specials: [],
		related_stat: 'atk',
		values: [0.5718, 0.5718]
	},
	{
		key: 'delusive_dive',
		type: 'heavy',
		elements: ['havoc'],
		specials: [],
		related_stat: 'atk',
		values: [0.5302, 0.5302]
	},
	{
		key: 'mid_air_attack_dmg',
		type: 'basic',
		elements: ['havoc'],
		specials: [],
		related_stat: 'atk',
		values: [0.4199, 0.6299]
	},
	{
		key: 'dodge_counter_dmg',
		type: 'basic',
		elements: ['havoc'],
		specials: [],
		related_stat: 'atk',
		values: [0.5301, 0.5301, 0.5301, 0.5301]
	}
] as const satisfies MotionDef[];

export { data as normal };
