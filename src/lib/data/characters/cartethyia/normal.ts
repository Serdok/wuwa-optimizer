import type { MotionDef } from '$lib/data/characters/types';

const data = [
	{
		key: 'stage_1_dmg',
		type: 'basic',
		elements: ['aero'],
		specials: [],
		related_stat: 'hp',
		values: [0.0478]
	},
	{
		key: 'stage_2_dmg',
		type: 'basic',
		elements: ['aero'],
		specials: [],
		related_stat: 'hp',
		values: [0.0394, 0.0394, 0.0525]
	},
	{
		key: 'stage_3_dmg',
		type: 'basic',
		elements: ['aero'],
		specials: [],
		related_stat: 'hp',
		values: [0.0428, 0.0428, 0.0428, 0.0428]
	},
	{
		key: 'stage_4_dmg',
		type: 'basic',
		elements: ['aero'],
		specials: [],
		related_stat: 'hp',
		values: [0.0252, 0.0252, 0.0252, 0.0754]
	},
	{
		key: 'dodge_counter_dmg',
		type: 'basic',
		elements: ['aero'],
		specials: [],
		related_stat: 'hp',
		values: [0.0685, 0.0685, 0.0685, 0.0685]
	},
	{
		key: 'heavy_attack_dmg',
		type: 'basic',
		elements: ['aero'],
		specials: [],
		related_stat: 'hp',
		values: [0.0208, 0.0208, 0.0208, 0.0624]
	},
	{
		key: 'mid_air_attack',
		type: 'basic',
		elements: ['aero'],
		specials: [],
		related_stat: 'hp',
		values: [0.0565]
	},
	{
		key: 'mid_air_attack_1_sword_shadow_recalled',
		type: 'basic',
		elements: ['aero'],
		specials: [],
		related_stat: 'hp',
		values: [0.0565]
	},
	{
		key: 'mid_air_attack_2_sword_shadow_recalled',
		type: 'basic',
		elements: ['aero'],
		specials: [],
		related_stat: 'hp',
		values: [0.033, 0.033, 0.033]
	},
	{
		key: 'mid_air_attack_3_sword_shadow_recalled',
		type: 'basic',
		elements: ['aero'],
		specials: [],
		related_stat: 'hp',
		values: [0.1129, 0.1129, 0.1129]
	}
] as const satisfies MotionDef[];

export { data as normal };
