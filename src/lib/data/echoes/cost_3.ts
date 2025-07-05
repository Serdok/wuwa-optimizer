import type { EchoData } from './types';

export default [
	// 1.0
	{
		key: 'hoochief',
		cost: 3,
		possible_sonatas: ['sierra_gale', 'rejuvenating_glow'],
	},
	{
		key: 'carapace',
		cost: 3,
		possible_sonatas: ['sierra_gale', 'moonlit_clouds'],
	},
	{
		key: 'autopuppet_scout',
		cost: 3,
		possible_sonatas: ['freezing_frost', 'celestial_light'],
	},
	{
		key: 'violet_feathered_heron',
		cost: 3,
		possible_sonatas: ['molten_rift', 'void_thunder'],
	},
	{
		key: 'cyan_feathered_heron',
		cost: 3,
		possible_sonatas: ['sierra_gale', 'celestial_light'],
	},
	{
		key: 'stonewall_bracer',
		cost: 3,
		possible_sonatas: ['rejuvenating_glow', 'moonlit_clouds'],
	},
	{
		key: 'flautist',
		cost: 3,
		possible_sonatas: ['void_thunder', 'lingering_tunes'],
	},
	{
		key: 'tambourinist',
		cost: 3,
		possible_sonatas: ['freezing_frost', 'sun_sinking_eclipse'],
	},
	{
		key: 'rockstead_guardian',
		cost: 3,
		possible_sonatas: ['celestial_light', 'rejuvenating_glow'],
	},
	{
		key: 'chasm_guardian',
		cost: 3,
		possible_sonatas: ['rejuvenating_glow', 'lingering_tunes'],
	},
	{
		key: 'viridblaze_saurian',
		cost: 3,
		possible_sonatas: ['molten_rift', 'moonlit_clouds'],
	},
	{
		key: 'roseshroom',
		cost: 3,
		possible_sonatas: ['freezing_frost', 'sun_sinking_eclipse'],
	},
	{
		key: 'havoc_dreadmane',
		cost: 3,
		possible_sonatas: ['molten_rift', 'sun_sinking_eclipse'],
	},
	{
		key: 'spearback',
		cost: 3,
		possible_sonatas: ['moonlit_clouds', 'lingering_tunes'],
	},
	// 1.1
	{
		key: 'glacio_dreadmane',
		cost: 3,
		possible_sonatas: ['freezing_frost', 'moonlit_clouds'],
	},
	{
		key: 'lumiscale_construct',
		cost: 3,
		possible_sonatas: ['freezing_frost', 'void_thunder'],
	},
	{
		key: 'lightcrusher',
		cost: 3,
		possible_sonatas: ['celestial_light'],
	},
	// 2.0
	{
		key: 'questless_knight',
		cost: 3,
		possible_sonatas: ['empyrean_anthem', 'midnight_veil'],
	},
	{
		key: 'diurnus_knight',
		cost: 3,
		possible_sonatas: ['eternal_radiance', 'tidebreaking_courage'],
	},
	{
		key: 'nocturnus_knight',
		cost: 3,
		possible_sonatas: ['midnight_veil', 'empyrean_anthem'],
	},
	{
		key: 'abyssal_patricus',
		cost: 3,
		possible_sonatas: ['frosty_resolve', 'empyrean_anthem'],
	},
	{
		key: 'abyssal_gladius',
		cost: 3,
		possible_sonatas: ['midnight_veil', 'tidebreaking_courage'],
	},
	{
		key: 'abyssal_mercator',
		cost: 3,
		possible_sonatas: ['frosty_resolve', 'eternal_radiance'],
	},
	{
		key: 'chop_chop',
		cost: 3,
		possible_sonatas: ['empyrean_anthem', 'tidebreaking_courage'],
	},
	{
		key: 'vitreum_dancer',
		cost: 3,
		possible_sonatas: ['eternal_radiance', 'empyrean_anthem'],
	},
	{
		key: 'cuddle_wuddle',
		cost: 3,
		possible_sonatas: ['molten_rift', 'void_thunder', 'frosty_resolve', 'midnight_veil'],
	},
	// 2.1
	{
		key: 'rage_against_the_statue',
		cost: 3,
		possible_sonatas: ['eternal_radiance', 'gusts_of_welkin'],
	},
	{
		key: 'hurriclaw',
		cost: 3,
		possible_sonatas: ['tidebreaking_courage', 'gusts_of_welkin'],
	},
	// 2.2
	{
		key: 'capitaneus',
		cost: 3,
		possible_sonatas: ['eternal_radiance', 'gusts_of_welkin'],
	}
] as const satisfies EchoData[];