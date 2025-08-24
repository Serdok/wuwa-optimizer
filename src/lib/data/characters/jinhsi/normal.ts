import type { MotionDef } from '$lib/data/characters/types';

const data = [
	{
		type: 'basic',
		key: 'stage_1_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [0.6647]
	},
	{
		type: 'basic',
		key: 'stage_2_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [0.3899, 0.195, 0.195, 0.195]
	},
	{
		type: 'basic',
		key: 'stage_3_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [0.1065, 0.1065, 0.1065, 0.1065, 0.1065, 0.1065, 0.1065, 0.3194]
	},
	{
		type: 'basic',
		key: 'stage_4_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [0.6309, 0.9463]
	},
	{
		type: 'heavy',
		key: 'heavy_attack_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [0.2386, 0.2386, 0.2386, 0.2386, 0.2386, 0.3579, 0.8351]
	},
	{
		type: 'basic',
		key: 'mid_air_attack_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [0.1233, 0.2466, 0.8629]
	},
	{
		type: 'basic',
		key: 'dodge_counter',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [0.1468, 0.1468, 0.1468, 0.1468, 0.1468, 0.1468, 0.1468, 0.4402]
	}
] as const satisfies MotionDef[];

export { data as normal };
