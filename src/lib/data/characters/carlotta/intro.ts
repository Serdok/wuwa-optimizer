import type { MotionDef } from '$lib/data/characters/types';

const data = [
	{
		type: 'intro',
		key: 'skill_dmg',
		elements: ['glacio'],
		specials: [],
		related_stat: 'atk',
		values: [1.7893, 0.5965, 0.5965]
	}
] as const satisfies MotionDef[];

export { data as intro };
