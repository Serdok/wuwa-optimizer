import type { MotionDef } from '$lib/data/characters/types';

const data = [
	{
		type: 'outro',
		key: 'skill_dmg',
		elements: ['spectro', 'spectro_frazzle'],
		specials: [],
		related_stat: 'atk',
		values: [1.5]
	}
] as const satisfies MotionDef[];

export { data as outro };
