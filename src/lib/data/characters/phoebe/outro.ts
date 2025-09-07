import type { MotionDef } from '$lib/data/characters/types';

const data = (rank: number) => [
	{
		type: 'outro',
		key: 'skill_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [5.2841]
	}
] as const satisfies MotionDef[];

export { data as outro };
