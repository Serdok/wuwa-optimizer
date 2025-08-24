import type { MotionDef } from '$lib/data/characters/types';

const data = [
	{
		type: 'intro',
		key: 'skill_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [1.5905]
	}
] as const satisfies MotionDef[];

export { data as intro };
