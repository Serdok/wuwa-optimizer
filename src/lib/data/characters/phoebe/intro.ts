import type { MotionDef } from '$lib/data/characters/types';

const data = (rank: number) => [
	{
		type: 'intro',
		key: 'skill_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [1.9881]
	}
] as const satisfies MotionDef[];

export { data as intro };
