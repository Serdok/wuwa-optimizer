import type { MotionDef } from '$lib/data/characters/types';

const data = [
	{
		type: 'skill',
		key: 'true_sight_capture_dmg',
		elements: ['fusion'],
		specials: [],
		related_stat: 'atk',
		values: [0.8188, 0.8188, 0.8188, 1.6376]
	},
	{
		type: 'skill',
		key: 'true_sight_conquest_dmg',
		elements: ['fusion'],
		specials: [],
		related_stat: 'atk',
		values: [0.5895, 0.5895, 0.8252, 0.9431]
	},
	{
		type: 'skill',
		key: 'true_sight_charge_dmg',
		elements: ['fusion'],
		specials: [],
		related_stat: 'atk',
		values: [0.7268, 1.0902]
	}
] as const satisfies MotionDef[];

export { data as skill };
