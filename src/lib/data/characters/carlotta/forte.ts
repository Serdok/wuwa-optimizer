import type { MotionDef } from '$lib/data/characters/types';

const data = [
	{
		type: 'skill',
		key: 'imminent_oblivion',
		elements: ['glacio'],
		specials: [],
		related_stat: 'atk',
		values: [0.6683, 0.6683, 0.6683, 0.6683, 0.6683, 5.0121]
	}
] as const satisfies MotionDef[];

export { data as forte };
