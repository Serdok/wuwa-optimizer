import type { MotionDef } from '$lib/data/characters/types';

const motion = {
	key: 'midnight_veil',
	type: 'outro',
	elements: ['havoc'],
	specials: [],
	related_stat: 'atk',
	values: [4.8],
} as const satisfies MotionDef;

export { motion };