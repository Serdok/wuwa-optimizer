import type { MotionDef } from '$lib/data/characters/types';

const data = [
	{
		type: 'burst',
		key: 'rekindle_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [3.1852]
	},
	{
		type: 'burst',
		key: 'the_last_stand_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [1.9112, 10.8296]
	}
] as const satisfies MotionDef[];

export { data as burst };
