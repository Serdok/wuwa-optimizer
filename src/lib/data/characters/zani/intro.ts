import type { MotionDef } from '$lib/data/characters/types';

const data = [
	{
		type: 'intro',
		key: 'skill_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [0.2424, 0.2424, 0.2424, 0.2424, 0.2424, 0.808]
	}
] as const satisfies MotionDef[];

export { data as intro };
