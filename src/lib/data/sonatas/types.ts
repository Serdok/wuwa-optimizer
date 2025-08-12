import type { ApplyEffect, BuffDef, BuffSchema } from '$lib/data/optimizer/types';

export const SONATAS = [
	'freezing_frost',
	'molten_rift',
	'void_thunder',
	'sierra_gale',
	'celestial_light',
	'sun_sinking_eclipse',
	'rejuvenating_glow',
	'moonlit_clouds',
	'lingering_tunes',
	'frosty_resolve',
	'eternal_radiance',
	'midnight_veil',
	'empyrean_anthem',
	'tidebreaking_courage',
	'gusts_of_welkin',
	'windward_pilgrimage',
	'flaming_clawprint',
	'dream_of_the_lost',
	'crown_of_valor',
	'law_of_harmony'
] as const;

export type SonataType = typeof SONATAS[number];

export type SonataDef = {
	key: string;
	piece_effects: number[];
	buffs: BuffSchema<BuffDef>;
	apply_effect: ApplyEffect<BuffDef, BuffSchema<BuffDef>>;
	image: string;
};