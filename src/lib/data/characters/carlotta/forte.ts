import type { MotionDef } from '$lib/data/characters/types';

const imminent_oblivion = {
	type: 'skill',
	key: 'imminent_oblivion',
	elements: ['glacio'],
	specials: [],
	related_stat: 'atk',
	values: [0.6683, 0.6683, 0.6683, 0.6683, 0.6683, 5.0121]
} as const satisfies MotionDef;

const imminent_oblivion_s5 = {
	type: 'skill',
	key: 'imminent_oblivion',
	elements: ['glacio'],
	specials: [],
	related_stat: 'atk',
	values: [0.982401, 0.982401, 0.982401, 0.982401, 0.982401, 7.367787]
} as const satisfies MotionDef;


const data = (rank: number) => {
	if (rank >= 5) return [imminent_oblivion_s5];
	return [imminent_oblivion];
}

export { data as forte };
