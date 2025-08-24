import type { MotionDef } from '$lib/data/characters/types';

const data = [
	{
		key: 'flowing_suffocation_dmg',
		type: 'basic',
		elements: ['havoc'],
		specials: ['echo_skill'],
		related_stat: 'atk',
		values: [3.76]
	},
	{
		key: 'diffusion_dmg',
		type: 'basic',
		elements: ['havoc'],
		specials: ['coordinated_attack'],
		related_stat: 'atk',
		values: Array(21).fill(0.1454)
	}
] as const satisfies MotionDef[];

const diffusion_s5 = {
	key: 'diffusion_dmg',
	type: 'basic',
	elements: ['havoc'],
	specials: ['coordinated_attack'],
	related_stat: 'atk',
	values: Array(26).fill(0.1454)
} as const satisfies MotionDef;

export { data as burst, diffusion_s5 };
