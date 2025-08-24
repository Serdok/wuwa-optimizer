import type { MotionDef } from '$lib/data/characters/types';

const data = [
	{
		type: 'basic',
		key: 'basic_attack_stage_1',
		elements: ['glacio'],
		specials: [],
		related_stat: 'atk',
		values: [0.5408]
	},
	{
		type: 'basic',
		key: 'basic_attack_stage_2',
		elements: ['glacio'],
		specials: [],
		related_stat: 'atk',
		values: [0.3955, 0.3955, 0.5273]
	},
	{
		type: 'basic',
		key: 'necessary_measures_stage_1_dmg',
		elements: ['glacio'],
		specials: [],
		related_stat: 'atk',
		values: [0.6591]
	},
	{
		type: 'basic',
		key: 'necessary_measures_stage_2_dmg',
		elements: ['glacio'],
		specials: [],
		related_stat: 'atk',
		values: [0.6008, 0.7343]
	},
	{
		type: 'basic',
		key: 'necessary_measures_stage_3_dmg',
		elements: ['glacio'],
		specials: [],
		related_stat: 'atk',
		values: [1.3993, 0.2333, 0.2333, 0.2333, 0.2333]
	},
	{
		type: 'heavy',
		key: 'heavy_attack_dmg',
		elements: ['glacio'],
		specials: [],
		related_stat: 'atk',
		values: [0.2282, 0.2282, 0.2282, 0.2282, 0.6084]
	},
	{
		type: 'heavy',
		key: 'containment_tactics_dmg',
		elements: ['glacio'],
		specials: [],
		related_stat: 'atk',
		values: [0.3423, 0.3423, 0.3423, 0.3423, 0.9126]
	},
	{
		type: 'basic',
		key: 'mid_air_attack_dmg',
		elements: ['glacio'],
		specials: [],
		related_stat: 'atk',
		values: [1.0478]
	},
	{
		type: 'basic',
		key: 'customary_greetings_dmg',
		elements: ['glacio'],
		specials: [],
		related_stat: 'atk',
		values: [1.0799, 1.3199]
	},
	{
		type: 'basic',
		key: 'dodge_counter',
		elements: ['glacio'],
		specials: [],
		related_stat: 'atk',
		values: [1.0377, 1.3755]
	}
] as const satisfies MotionDef[];

export { data as normal };
