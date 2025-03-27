import type { EchoData } from './types';

export default [
	// calamity
	// 1.0
	{
		key: 'bell_borne_geochelone',
		cost: 4,
		possible_sonatas: ['rejuvenating_glow', 'moonlit_clouds'],
		image: { head: 'T_IconMonsterHead_992_UI.png', }
	},
	{
		key: 'dreamless',
		cost: 4,
		possible_sonatas: ['sun_sinking_eclipse'],
		image: { head: 'T_IconMonsterHead_998_UI.png', }
	},
	// 1.1
	{
		key: 'jué',
		cost: 4,
		possible_sonatas: ['celestial_light'],
		image: { head: 'T_IconMonsterHead_327_UI.png', }
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
		image: { head: 'T_IconMonsterHead_34010_1_UI.png', }
	},
	// 2.2
	{
		key: 'reminiscence_fleurdelys',
		cost: 4,
		possible_sonatas: ['gusts_of_welkin'],
		image: { head: 'T_IconMonsterHead_34012_1_UI.png', }
	},

	// overlord
	// 1.0
	{
		key: 'inferno_rider',
		cost: 4,
		possible_sonatas: ['molten_rift'],
		image: { head: 'T_IconMonsterHead_325_UI.png' }
	},
	{
		key: 'thundering_mephis',
		cost: 4,
		possible_sonatas: ['void_thunder'],
		image: { head: 'T_IconMonsterHead_226_UI.png' }
	},
	{
		key: 'impermanence_heron',
		cost: 4,
		possible_sonatas: ['moonlit_clouds'],
		image: { head: 'T_IconMonsterHead_995_UI.png' }
	},
	{
		key: 'mech_abomination',
		cost: 4,
		possible_sonatas: ['lingering_tunes'],
		image: { head: 'T_IconMonsterHead_993_UI.png' }
	},
	{
		key: 'mourning_aix',
		cost: 4,
		possible_sonatas: ['celestial_light'],
		image: { head: 'T_IconMonsterHead_997_UI.png' }
	},
	{
		key: 'lampylumen_myriad',
		cost: 4,
		possible_sonatas: ['freezing_frost'],
		image: { head: 'T_IconMonsterHead_994_UI.png' }
	},
	{
		key: 'feilian_beringal',
		cost: 4,
		possible_sonatas: ['sierra_gale'],
		image: { head: 'T_IconMonsterHead_996_UI.png' }
	},
	{
		key: 'crownless',
		cost: 4,
		possible_sonatas: ['sun_sinking_eclipse'],
		image: { head: 'T_IconMonsterHead_999_UI.png' }
	},
	{
		key: 'tempest_mephis',
		cost: 4,
		possible_sonatas: ['void_thunder'],
		image: { head: 'T_IconMonsterHead_225_UI.png' }
	},
	// 1.2
	{
		key: 'fallacy_of_no_return',
		cost: 4,
		possible_sonatas: ['rejuvenating_glow'],
		image: { head: 'T_IconMonsterHead_350_UI.png' }
	},
	// 2.0
	{
		key: 'lorelei',
		cost: 4,
		possible_sonatas: ['midnight_veil'],
		image: { head: 'T_IconMonsterHead_33011_UI.png' }
	},
	{
		key: 'sentry_construct',
		cost: 4,
		possible_sonatas: ['frosty_resolve'],
		image: { head: 'T_IconMonsterHead_33012_UI.png' }
	},
	{
		key: 'dragon_of_dirge',
		cost: 4,
		possible_sonatas: ['tidebreaking_courage'],
		image: { head: 'T_IconMonsterHead_33013_UI.png' }
	},
	{
		key: 'nightmare_inferno_rider',
		cost: 4,
		possible_sonatas: ['molten_rift'],
		image: { head: 'T_IconMonsterHead_YZ_33019_UI.png' }
	},
	{
		key: 'nightmare_thundering_mephis',
		cost: 4,
		possible_sonatas: ['void_thunder'],
		image: { head: 'T_IconMonsterHead_YZ_33016_UI.png' }
	},
	{
		key: 'nightmare_impermanence_heron',
		cost: 4,
		possible_sonatas: ['midnight_veil'],
		image: { head: 'T_IconMonsterHead_YZ_33015_UI.png' }
	},
	{
		key: 'nightmare_mourning_aix',
		cost: 4,
		possible_sonatas: ['celestial_light'],
		image: { head: 'T_IconMonsterHead_YZ_33020_UI.png' }
	},
	{
		key: 'nightmare_feilian_beringal',
		cost: 4,
		possible_sonatas: ['sierra_gale'],
		image: { head: 'T_IconMonsterHead_YZ_33014_UI.png' }
	},
	{
		key: 'nightmare_crownless',
		cost: 4,
		possible_sonatas: ['sun_sinking_eclipse'],
		image: { head: 'T_IconMonsterHead_YZ_33018_UI.png' }
	},
	{
		key: 'nightmare_tempest_mephis',
		cost: 4,
		possible_sonatas: ['void_thunder', 'empyrean_anthem'],
		image: { head: 'T_IconMonsterHead_YZ_33017_UI.png' }
	},
	// 2.2
	{
		key: 'nightmare_lampylumen_myriad',
		cost: 4,
		possible_sonatas: ['freezing_frost', 'empyrean_anthem'],
		image: { head: 'T_IconMonsterHead00_UI.png' }
	},
] as const satisfies EchoData[];