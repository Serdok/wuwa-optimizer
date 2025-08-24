import type { MotionDef } from '$lib/data/characters/types';

const data = [
	{
		key: 'skill_dmg',
		type: 'basic',
		elements: ['aero'],
		specials: [],
		related_stat: 'hp',
		values: [0.0689, 0.0689, 0.0689, 0.0886]
	}
] as const satisfies MotionDef[];

export { data as skill };
