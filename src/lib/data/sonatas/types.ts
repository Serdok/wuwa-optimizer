import type { ApplyEffect, BuffDef, BuffSchema } from '$lib/data/optimizer/types';

export const SONATA_TYPES = [
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
] as const;

export type SonataType = typeof SONATA_TYPES[number];

export type SonataDef<P extends readonly number[], S extends BuffSchema<BuffDef>> = {
	key: string;
	piece_effects: P;
	buffs: S;
	apply_effect_for: Record<number, ApplyEffect<BuffDef, S>>;
	image: string;
};

export type SonataInit = Omit<SonataDef<never, never>, 'piece_effects' | 'buffs' | 'apply_effect_for'>;