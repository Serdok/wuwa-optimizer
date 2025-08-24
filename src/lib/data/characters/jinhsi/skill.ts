import type { MotionDef } from '$lib/data/characters/types';

const data = [
	{
		type: 'skill',
		key: 'skill_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [0.1946, 0.1946, 0.1946, 0.1946, 0.7784]
	},
	{
		type: 'skill',
		key: 'overflowing_radiance_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [0.0987, 0.0987, 0.0987, 0.0987, 0.2959, 0.2959, 0.2959, 0.2959, 0.3945]
	}
] as const satisfies MotionDef[];

export { data as skill };
