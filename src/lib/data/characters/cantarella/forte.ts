import type { MotionDef } from '$lib/data/characters/types';

const data = [
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
	},
	{
		key: 'abysmal_vortex_dmg',
		type: 'basic',
		elements: ['havoc'],
		specials: [],
		related_stat: 'atk',
		values: [0.4199, 0.6299]
	},
	{
		key: 'perception_drain_dmg',
		type: 'basic',
		elements: ['havoc'],
		specials: ['echo_skill'],
		related_stat: 'atk',
		values: [6.6799, 6.6799]
	},
	{
		key: 'shadowy_sweep_dmg',
		type: 'basic',
		elements: ['havoc'],
		specials: [],
		related_stat: 'atk',
		values: [0.7509, 0.7509, 0.7509]
	}
] as const satisfies MotionDef[];

export { data as forte };
