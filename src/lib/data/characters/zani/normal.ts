import type { MotionDef } from '$lib/data/characters/types';

const data = [
	{
		type: 'basic',
		key: 'stage_1_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [0.5885]
	},
	{
		type: 'basic',
		key: 'stage_2_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [0.7953]
	},
	{
		type: 'basic',
		key: 'stage_3_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [0.4242, 0.4242, 0.4242]
	},
	{
		type: 'basic',
		key: 'stage_4_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [0.676, 0.676, 0.676, 0.676]
	},
	{
		type: 'basic',
		key: 'breakthrough_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [0.615, 0.1758, 0.1758, 0.1758, 0.1758, 0.1758, 0.1758, 0.1758]
	},
	{
		type: 'heavy',
		key: 'heavy_attack_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [0.4108, 0.4108, 0.4108, 0.4108]
	},
	{
		type: 'basic',
		key: 'plunging_attack_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [1.0498]
	},
	{
		type: 'basic',
		key: 'dodge_counter_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [0.7423, 0.7423, 0.7423]
	}
] as const satisfies MotionDef[];

export { data as normal };
