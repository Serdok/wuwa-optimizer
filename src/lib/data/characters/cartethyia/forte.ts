import type { MotionDef } from '$lib/data/characters/types';

const data = [
	{
		key: 'basic_attack_stage_1_dmg',
		type: 'basic',
		elements: ['aero'],
		specials: [],
		related_stat: 'hp',
		values: [0.0649]
	},
	{
		key: 'basic_attack_stage_2_dmg',
		type: 'basic',
		elements: ['aero'],
		specials: [],
		related_stat: 'hp',
		values: [0.0363, 0.0182, 0.0182, 0.0182]
	},
	{
		key: 'basic_attack_stage_3_dmg',
		type: 'basic',
		elements: ['aero'],
		specials: [],
		related_stat: 'hp',
		values: [0.0213, 0.0213, 0.0213, 0.0426]
	},
	{
		key: 'basic_attack_stage_4_dmg',
		type: 'basic',
		elements: ['aero'],
		specials: [],
		related_stat: 'hp',
		values: [0.0274, 0.0274, 0.0274, 0.0274, 0.0274]
	},
	{
		key: 'basic_attack_stage_5_dmg',
		type: 'basic',
		elements: ['aero'],
		specials: [],
		related_stat: 'hp',
		values: [0.072, 0.288]
	},
	{
		key: 'dodge_counter_dmg',
		type: 'basic',
		elements: ['aero'],
		specials: [],
		related_stat: 'hp',
		values: [0.032, 0.032, 0.032, 0.0639]
	},
	{
		key: 'upward_cut_dmg',
		type: 'basic',
		elements: ['aero'],
		specials: [],
		related_stat: 'hp',
		values: [0.0454, 0.0454]
	},
	{
		key: 'heavy_attack_dmg',
		type: 'basic',
		elements: ['aero'],
		specials: [],
		related_stat: 'hp',
		values: [0.0428, 0.0997]
	},
	{
		key: 'enhanced_heavy_attack_dmg',
		type: 'basic',
		elements: ['aero'],
		specials: [],
		related_stat: 'hp',
		values: [0.0778, 0.0778, 0.0389]
	},
	{
		key: 'mid_air_attack_1_dmg',
		type: 'basic',
		elements: ['aero'],
		specials: [],
		related_stat: 'hp',
		values: [0.0299, 0.0299, 0.0308]
	},
	{
		key: 'mid_air_attack_2_dmg',
		type: 'basic',
		elements: ['aero'],
		specials: [],
		related_stat: 'hp',
		values: [0.0739, 0.0739, 0.1477]
	},
	{
		key: 'mid_air_attack_3_dmg',
		type: 'basic',
		elements: ['aero'],
		specials: [],
		related_stat: 'hp',
		values: [0.022]
	},
	{
		key: 'sword_to_answer_waves_call_dmg',
		type: 'skill',
		elements: ['aero'],
		specials: [],
		related_stat: 'hp',
		values: [0.0186, 0.0186, 0.0186, 0.0186, 0.1736]
	},
	{
		key: 'may_tempest_break_the_tides_dmg',
		type: 'skill',
		elements: ['aero'],
		specials: [],
		related_stat: 'hp',
		values: [0.0186, 0.0186, 0.0703, 0.0703, 0.0703]
	}
] as const satisfies MotionDef[];

export { data as forte };
