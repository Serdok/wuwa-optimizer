import type { MotionDef } from '$lib/data/characters/types';

const data = [
	{
		key: 'skill_dmg',
		type: 'outro',
		elements: ['glacio'],
		specials: [],
		related_stat: 'atk',
		values: [7.942]
	}
] as const satisfies MotionDef[];

const kaleidoscope_sparks_s3 = {
	key: 'kaleidoscope_sparks',
	type: 'outro',
	elements: ['glacio'],
	specials: [],
	related_stat: 'atk',
	values: [10.3218],
} as const satisfies MotionDef;

export { data as outro, kaleidoscope_sparks_s3 };
