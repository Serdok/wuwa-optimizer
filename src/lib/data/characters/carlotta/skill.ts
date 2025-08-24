import type { MotionDef } from '$lib/data/characters/types';

const data = [
	{
		type: 'skill',
		key: 'skill_dmg',
		elements: ['glacio'],
		specials: [],
		related_stat: 'atk',
		values: [1.4411, 1.4411]
	},
	{
		type: 'skill',
		key: 'chromatic_splendor_dmg',
		elements: ['glacio'],
		specials: [],
		related_stat: 'atk',
		values: [1.1273, 1.1273, 3.3818]
	}
] as const satisfies MotionDef[];

export { data as skill };
