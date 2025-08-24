import type { MotionDef } from '$lib/data/characters/types';

const data = [
	{
		key: 'graceful_step_dmg',
		type: 'skill',
		elements: ['havoc'],
		specials: [],
		related_stat: 'atk',
		values: [0.736, 0.736]
	},
	{
		key: 'flickering_reverie_dmg',
		type: 'skill',
		elements: ['havoc'],
		specials: ['echo_skill'],
		related_stat: 'atk',
		values: [1.9623]
	},
	{
		key: 'jolt_dmg',
		type: 'basic',
		elements: ['havoc'],
		specials: ['coordinated_attack'],
		related_stat: 'atk',
		values: [1.9881]
	}
] as const satisfies MotionDef[];

export { data as skill };
