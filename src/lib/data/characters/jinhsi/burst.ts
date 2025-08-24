import type { MotionDef } from '$lib/data/characters/types';

const data = [
	{
		type: 'burst',
		key: 'skill_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [4.9981, 11.6622]
	}
] as const satisfies MotionDef[];

export { data as burst };
