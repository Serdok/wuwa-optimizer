import type { MotionDef } from '$lib/data/characters/types';

const skill = {
	type: 'skill',
	key: 'skill_dmg',
	elements: ['glacio'],
	specials: [],
	related_stat: 'atk',
	values: [1.4411, 1.4411]
} as const satisfies MotionDef;

const skill_s3 = {
	type: 'skill',
	key: 'skill_dmg',
	elements: ['glacio'],
	specials: [],
	related_stat: 'atk',
	values: [2.781323, 2.781323]
} as const satisfies MotionDef;


const chromatic_splendor = {
	type: 'skill',
	key: 'chromatic_splendor_dmg',
	elements: ['glacio'],
	specials: [],
	related_stat: 'atk',
	values: [1.1273, 1.1273, 3.3818]
} as const satisfies MotionDef;

const chromatic_splendor_s3 = {
	type: 'skill',
	key: 'chromatic_splendor_dmg',
	elements: ['glacio'],
	specials: [],
	related_stat: 'atk',
	values: [2.175689, 2.175689, 6.526874]
} as const satisfies MotionDef;


const data = (rank: number) => {
	if (rank >= 3) return [skill_s3, chromatic_splendor_s3];
	return [skill, chromatic_splendor];
}

export { data as skill };
