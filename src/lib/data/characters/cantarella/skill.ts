import type { MotionDef } from '$lib/data/characters/types';

const graceful_step = {
	key: 'graceful_step_dmg',
	type: 'skill',
	elements: ['havoc'],
	specials: [],
	related_stat: 'atk',
	values: [0.736, 0.736]
} as const satisfies MotionDef;

const graceful_step_s1 = {
	key: 'graceful_step_dmg',
	type: 'skill',
	elements: ['havoc'],
	specials: [],
	related_stat: 'atk',
	values: [1.104, 1.104]
} as const satisfies MotionDef;


const flickering_reverie = {
	key: 'flickering_reverie_dmg',
	type: 'skill',
	elements: ['havoc'],
	specials: ['echo_skill'],
	related_stat: 'atk',
	values: [1.9623]
} as const satisfies MotionDef;

const flickering_reverie_s1 = {
	key: 'flickering_reverie_dmg',
	type: 'skill',
	elements: ['havoc'],
	specials: ['echo_skill'],
	related_stat: 'atk',
	values: [2.94345]
} as const satisfies MotionDef;


const jolt = {
	key: 'jolt_dmg',
	type: 'basic',
	elements: ['havoc'],
	specials: ['coordinated_attack'],
	related_stat: 'atk',
	values: [1.9881]
} as const satisfies MotionDef;

const jolt_s2 = {
	key: 'jolt_dmg',
	type: 'basic',
	elements: ['havoc'],
	specials: ['coordinated_attack'],
	related_stat: 'atk',
	values: [6.858945]
} as const satisfies MotionDef;


const data = (rank: number) => {
	if (rank >= 2) return [graceful_step_s1, flickering_reverie_s1, jolt_s2];
	if (rank >= 1) return [graceful_step_s1, flickering_reverie_s1, jolt];
	return [graceful_step, flickering_reverie, jolt];
};

export { data as skill };
