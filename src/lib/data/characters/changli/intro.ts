import type { MotionDef } from '$lib/data/characters/types';

const data = [
	{
		type: 'intro',
		key: 'skill_dmg',
		elements: ['fusion'],
		specials: [],
		related_stat: 'atk',
		values: [0.445, 0.2596, 0.2596, 0.2596, 0.2596]
	}
] as const satisfies MotionDef[];

export { data as intro };
