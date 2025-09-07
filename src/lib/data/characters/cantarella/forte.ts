import type { MotionDef } from '$lib/data/characters/types';

const phantom_sting = [
	{
		key: 'phantom_sting_stage_1_dmg',
		type: 'basic',
		elements: ['havoc'],
		specials: [],
		related_stat: 'atk',
		values: [0.3533, 0.3533, 0.3533]
	},
	{
		key: 'phantom_sting_stage_2_dmg',
		type: 'basic',
		elements: ['havoc'],
		specials: [],
		related_stat: 'atk',
		values: [0.6293, 0.6293]
	},
	{
		key: 'phantom_sting_stage_3_dmg',
		type: 'basic',
		elements: ['havoc'],
		specials: [],
		related_stat: 'atk',
		values: [0.6462, 0.6462, 0.6462, 0.6462]
	}
] as const satisfies MotionDef[];

const phantom_sting_s6 = [
	{
		key: 'phantom_sting_stage_1_dmg',
		type: 'basic',
		elements: ['havoc'],
		specials: [],
		related_stat: 'atk',
		values: [0.63594, 0.63594, 0.63594]
	},
	{
		key: 'phantom_sting_stage_2_dmg',
		type: 'basic',
		elements: ['havoc'],
		specials: [],
		related_stat: 'atk',
		values: [1.13274, 1.13274]
	},
	{
		key: 'phantom_sting_stage_3_dmg',
		type: 'basic',
		elements: ['havoc'],
		specials: [],
		related_stat: 'atk',
		values: [1.16316, 1.16316, 1.16316, 1.16316]
	}
] as const satisfies MotionDef[];


const abysmal_vortex = {
	key: 'abysmal_vortex_dmg',
	type: 'basic',
	elements: ['havoc'],
	specials: [],
	related_stat: 'atk',
	values: [0.4199, 0.6299]
} as const satisfies MotionDef;


const perception_drain = {
	key: 'perception_drain_dmg',
	type: 'basic',
	elements: ['havoc'],
	specials: ['echo_skill'],
	related_stat: 'atk',
	values: [6.6799, 6.6799]
} as const satisfies MotionDef;

const perception_drain_s1 = {
	key: 'perception_drain_dmg',
	type: 'basic',
	elements: ['havoc'],
	specials: ['echo_skill'],
	related_stat: 'atk',
	values: [10.01985, 10.01985]
} as const satisfies MotionDef;


const shadowy_sweep = {
	key: 'shadowy_sweep_dmg',
	type: 'basic',
	elements: ['havoc'],
	specials: [],
	related_stat: 'atk',
	values: [0.7509, 0.7509, 0.7509]
} as const satisfies MotionDef;


const data = (rank: number) => {
	if (rank >= 6) return [...phantom_sting_s6, abysmal_vortex, perception_drain_s1, shadowy_sweep];
	if (rank >= 1) return [...phantom_sting, abysmal_vortex, perception_drain_s1, shadowy_sweep];
	return [...phantom_sting, abysmal_vortex, perception_drain, shadowy_sweep];
}

export { data as forte };
