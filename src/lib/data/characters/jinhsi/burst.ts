import type { MotionDef } from '$lib/data/characters/types';

const skill = {
	type: 'burst',
	key: 'skill_dmg',
	elements: ['spectro'],
	specials: [],
	related_stat: 'atk',
	values: [4.9981, 11.6622]
} as const satisfies MotionDef;

const skill_s5 = {
	type: 'burst',
	key: 'skill_dmg',
	elements: ['spectro'],
	specials: [],
	related_stat: 'atk',
	values: [10.99582, 25.65684]
} as const satisfies MotionDef;

const data = (rank: number) => {
	if (rank >= 5) return [skill_s5];
	return [skill];
}

export { data as burst };
