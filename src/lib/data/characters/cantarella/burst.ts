import type { MotionDef } from '$lib/data/characters/types';

const flowing_suffocation = {
	key: 'flowing_suffocation_dmg',
	type: 'basic',
	elements: ['havoc'],
	specials: ['echo_skill'],
	related_stat: 'atk',
	values: [3.76]
} as const satisfies MotionDef;

const flowing_suffocation_s3 = {
	key: 'flowing_suffocation_dmg',
	type: 'basic',
	elements: ['havoc'],
	specials: ['echo_skill'],
	related_stat: 'atk',
	values: [17.672]
} as const satisfies MotionDef;


const diffusion = {
	key: 'diffusion_dmg',
	type: 'basic',
	elements: ['havoc'],
	specials: ['coordinated_attack'],
	related_stat: 'atk',
	values: Array(21).fill(0.1454)
} as const satisfies MotionDef;

const diffusion_s5 = {
	key: 'diffusion_dmg',
	type: 'basic',
	elements: ['havoc'],
	specials: ['coordinated_attack'],
	related_stat: 'atk',
	values: Array(26).fill(0.1454)
} as const satisfies MotionDef;


const data = (rank: number) => {
	if (rank >= 5) return [flowing_suffocation_s3, diffusion_s5];
	if (rank >= 3) return [flowing_suffocation_s3, diffusion];
	return [flowing_suffocation, diffusion];
};



export { data as burst };
