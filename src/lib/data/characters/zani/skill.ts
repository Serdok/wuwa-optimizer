import type { MotionDef } from '$lib/data/characters/types';

const standard_defence_protocol = {
	type: 'skill',
	key: 'standard_defense_protocol_dmg',
	elements: ['spectro'],
	specials: [],
	related_stat: 'atk',
	values: [0.6394]
} as const satisfies MotionDef;


const pinpoint_strike = {
	type: 'skill',
	key: 'pinpoint_strike_dmg',
	elements: ['spectro'],
	specials: [],
	related_stat: 'atk',
	values: [0.61, 1.2199]
} as const satisfies MotionDef;


const targeted_action = {
	type: 'skill',
	key: 'targeted_action_dmg',
	elements: ['spectro'],
	specials: [],
	related_stat: 'atk',
	values: [0.8619, 0.2873, 1.7237]
} as const satisfies MotionDef;

const targeted_action_s2 = {
	type: 'skill',
	key: 'targeted_action_dmg',
	elements: ['spectro'],
	specials: [],
	related_stat: 'atk',
	values: [1.55142, 0.51714, 3.10266]
} as const satisfies MotionDef;


const forcible_riposte = {
	type: 'skill',
	key: 'forcible_riposte_dmg',
	elements: ['spectro'],
	specials: [],
	related_stat: 'atk',
	values: [0.8619, 0.2873, 1.7237]
} as const satisfies MotionDef;

const forcible_riposte_s2 = {
	type: 'skill',
	key: 'forcible_riposte_dmg',
	elements: ['spectro'],
	specials: [],
	related_stat: 'atk',
	values: [1.55142, 0.51714, 3.10266]
} as const satisfies MotionDef;



const data = (rank: number) => {
	if (rank >= 2) return [standard_defence_protocol, pinpoint_strike, targeted_action_s2, forcible_riposte_s2];
	return [standard_defence_protocol, pinpoint_strike, targeted_action, forcible_riposte];
}

export { data as skill };
