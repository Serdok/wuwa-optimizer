import type { MotionDef } from '$lib/data/characters/types';

const data = [
	{
		key: 'ripple_dmg',
		type: 'intro',
		elements: ['havoc'],
		specials: [],
		related_stat: 'atk',
		values: [0.4225, 0.4225, 0.4225, 0.4225]
	},
	{
		key: 'tidal_surge_dmg',
		type: 'intro',
		elements: ['havoc'],
		specials: ['coordinated_attack'],
		related_stat: 'atk',
		values: [0.169, 0.169, 0.169, 1.183]
	}
] as const satisfies MotionDef[];

export { data as intro };
