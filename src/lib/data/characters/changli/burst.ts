import type { MotionDef } from '$lib/data/characters/types';

const data = [
	{
		type: 'basic',
		key: 'skill_dmg',
		elements: ['fusion'],
		specials: [],
		related_stat: 'atk',
		values: [12.1275]
	}
] as const satisfies MotionDef[];

export { data as burst };
