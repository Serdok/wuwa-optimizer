import type { MotionDef } from '$lib/data/characters/types';

const skill = {
	type: 'skill',
	key: 'skill_dmg',
	elements: ['glacio'],
	specials: [],
	related_stat: 'atk',
	values: [4.0271]
} as const satisfies MotionDef;


const death_knell = {
	type: 'skill',
	key: 'death_knell_dmg',
	elements: ['glacio'],
	specials: [],
	related_stat: 'atk',
	values: [1.8364, 0.145, 0.145, 0.145, 0.145]
} as const satisfies MotionDef;

const death_knell_s6 = {
	type: 'skill',
	key: 'death_knell_dmg',
	elements: ['glacio'],
	specials: [],
	related_stat: 'atk',
	values: [5.2631224, 0.41557, 0.41557, 0.41557, 0.41557]
} as const satisfies MotionDef;


const fatal_finale = {
	type: 'skill',
	key: 'fatal_finale_dmg',
	elements: ['glacio'],
	specials: [],
	related_stat: 'atk',
	values: [6.4433]
} as const satisfies MotionDef;

const fatal_finale_s2 = {
	type: 'skill',
	key: 'fatal_finale_dmg',
	elements: ['glacio'],
	specials: [],
	related_stat: 'atk',
	values: [14.561858]
} as const satisfies MotionDef;


const data = (rank: number) => {
	if (rank >= 6) return [skill, death_knell_s6, fatal_finale_s2];
	if (rank >= 2) return [skill, death_knell, fatal_finale_s2];
	return [skill, death_knell, fatal_finale];
}

export { data as burst };
