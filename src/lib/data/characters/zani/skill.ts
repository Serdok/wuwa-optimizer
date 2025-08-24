import type { MotionDef } from '$lib/data/characters/types';

const data = [
	{
		type: 'skill',
		key: 'standard_defense_protocol_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [0.6394]
	},
	{
		type: 'skill',
		key: 'pinpoint_strike_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [0.61, 1.2199]
	},
	{
		type: 'skill',
		key: 'targeted_action_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [0.8619, 0.2873, 1.7237]
	},
	{
		type: 'skill',
		key: 'forcible_riposte_dmg',
		elements: ['spectro'],
		specials: [],
		related_stat: 'atk',
		values: [0.8619, 0.2873, 1.7237]
	}
] as const satisfies MotionDef[];

export { data as skill };
