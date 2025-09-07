import type { MotionDef } from '$lib/data/characters/types';

const flaming_sacrifice = {
	type: 'skill',
	key: 'flaming_sacrifice_dmg',
	elements: ['fusion'],
	specials: [],
	related_stat: 'atk',
	values: [0.3925, 0.3925, 0.3925, 0.3925, 0.3925, 4.5785]
} as const satisfies MotionDef;

const flaming_sacrifice_s5 = {
	type: 'skill',
	key: 'flaming_sacrifice_dmg',
	elements: ['fusion'],
	specials: [],
	related_stat: 'atk',
	values: [0.58875, 0.58875, 0.58875, 0.58875, 0.58875, 6.86775]
} as const satisfies MotionDef;

const data = (rank: number) => {
	if (rank >= 5) return [flaming_sacrifice_s5];
	return [flaming_sacrifice];
}

export { data as forte };
