import type { EchoData } from './types';

export default [
	// calamity
	// 1.0
	{
		key: 'bell_borne_geochelone',
		cost: 4,
		possible_sonatas: ['rejuvenating_glow', 'moonlit_clouds'],
	},
	{
		key: 'dreamless',
		cost: 4,
		possible_sonatas: ['sun_sinking_eclipse'],
	},
	// 1.1
	{
		key: 'jué',
		cost: 4,
		possible_sonatas: ['celestial_light'],
	},
	// 2.0
	{
		key: 'hecate',
		cost: 4,
		possible_sonatas: [
			'freezing_frost', 'molten_rift', 'void_thunder', 'sierra_gale', 'celestial_light', 'sun_sinking_eclipse',
			'rejuvenating_glow', 'moonlit_clouds', 'lingering_tunes', 'frosty_resolve', 'eternal_radiance',
			'midnight_veil', 'empyrean_anthem', 'tidebreaking_courage'
		],
	},
	// 2.2
	{
		key: 'reminiscence_fleurdelys',
		cost: 4,
		possible_sonatas: ['gusts_of_welkin'],
	},

	// overlord
	// 1.0
	{
		key: 'inferno_rider',
		cost: 4,
		possible_sonatas: ['molten_rift'],
	},
	{
		key: 'thundering_mephis',
		cost: 4,
		possible_sonatas: ['void_thunder'],
	},
	{
		key: 'impermanence_heron',
		cost: 4,
		possible_sonatas: ['moonlit_clouds'],
	},
	{
		key: 'mech_abomination',
		cost: 4,
		possible_sonatas: ['lingering_tunes'],
	},
	{
		key: 'mourning_aix',
		cost: 4,
		possible_sonatas: ['celestial_light'],
	},
	{
		key: 'lampylumen_myriad',
		cost: 4,
		possible_sonatas: ['freezing_frost'],
	},
	{
		key: 'feilian_beringal',
		cost: 4,
		possible_sonatas: ['sierra_gale'],
	},
	{
		key: 'crownless',
		cost: 4,
		possible_sonatas: ['sun_sinking_eclipse'],
	},
	{
		key: 'tempest_mephis',
		cost: 4,
		possible_sonatas: ['void_thunder'],
	},
	// 1.2
	{
		key: 'fallacy_of_no_return',
		cost: 4,
		possible_sonatas: ['rejuvenating_glow'],
	},
	// 2.0
	{
		key: 'lorelei',
		cost: 4,
		possible_sonatas: ['midnight_veil'],
	},
	{
		key: 'sentry_construct',
		cost: 4,
		possible_sonatas: ['frosty_resolve'],
	},
	{
		key: 'dragon_of_dirge',
		cost: 4,
		possible_sonatas: ['tidebreaking_courage'],
	},
	{
		key: 'nightmare_inferno_rider',
		cost: 4,
		possible_sonatas: ['molten_rift'],
	},
	{
		key: 'nightmare_thundering_mephis',
		cost: 4,
		possible_sonatas: ['void_thunder'],
	},
	{
		key: 'nightmare_impermanence_heron',
		cost: 4,
		possible_sonatas: ['midnight_veil'],
	},
	{
		key: 'nightmare_mourning_aix',
		cost: 4,
		possible_sonatas: ['celestial_light'],
	},
	{
		key: 'nightmare_feilian_beringal',
		cost: 4,
		possible_sonatas: ['sierra_gale'],
	},
	{
		key: 'nightmare_crownless',
		cost: 4,
		possible_sonatas: ['sun_sinking_eclipse'],
	},
	{
		key: 'nightmare_tempest_mephis',
		cost: 4,
		possible_sonatas: ['void_thunder', 'empyrean_anthem'],
	},
	// 2.2
	{
		key: 'nightmare_lampylumen_myriad',
		cost: 4,
		possible_sonatas: ['freezing_frost', 'empyrean_anthem'],
	},
] as const satisfies EchoData[];