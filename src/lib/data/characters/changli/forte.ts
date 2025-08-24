import type { MotionDef } from '$lib/data/characters/types';

const data = [
	{
		type: 'skill',
		key: 'flaming_sacrifice_dmg',
		elements: ['fusion'],
		specials: [],
		related_stat: 'atk',
		values: [0.3925, 0.3925, 0.3925, 0.3925, 0.3925, 4.5785]
	}
] as const satisfies MotionDef[];

export { data as forte };
