import type { MotionDef } from '$lib/data/characters/types';

const rekindle = {
	type: 'burst',
	key: 'rekindle_dmg',
	elements: ['spectro'],
	specials: [],
	related_stat: 'atk',
	values: [3.1852]
} as const satisfies MotionDef;

const rekindle_s5 = {
	type: 'burst',
	key: 'rekindle_dmg',
	elements: ['spectro'],
	specials: [],
	related_stat: 'atk',
	values: [7.00744]
} as const satisfies MotionDef;


const the_last_stand = {
	type: 'burst',
	key: 'the_last_stand_dmg',
	elements: ['spectro'],
	specials: [],
	related_stat: 'atk',
	values: [1.9112, 10.8296]
} as const satisfies MotionDef;


const data = (rank: number) => {
	if (rank >= 5) return [rekindle_s5, the_last_stand];
	return [rekindle, the_last_stand];
}

export { data as burst };
