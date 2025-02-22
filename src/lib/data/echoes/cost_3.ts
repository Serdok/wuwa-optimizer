import type { EchoData } from './types';

export default [
	{
		key: 'hoochief',
		cost: 3,
		possible_sonatas: ['sierra_gale', 'rejuvenating_glow'],
		image: { head: 'T_IconMonsterHead_989_UI.png' }
	},
	{
		key: 'carapace',
		cost: 3,
		possible_sonatas: ['sierra_gale', 'moonlit_clouds'],
		image: { head: 'T_IconMonsterHead_970_UI.png' }
	},
	{
		key: 'autopuppet_scout',
		cost: 3,
		possible_sonatas: ['freezing_frost', 'celestial_light'],
		image: { head: 'T_IconMonsterHead_1003_UI.png' }
	},
	{
		key: 'glacio_dreadmane',
		cost: 3,
		possible_sonatas: ['freezing_frost', 'moonlit_clouds'],
		image: { head: 'T_IconMonsterHead_985_UI.png' }
	},
	{
		key: 'lumiscale_construct',
		cost: 3,
		possible_sonatas: ['freezing_frost', 'void_thunder'],
		image: { head: 'T_IconMonsterHead_329_UI.png' }
	},
	{
		key: 'lightcrusher',
		cost: 3,
		possible_sonatas: ['celestial_light'],
		image: { head: 'T_IconMonsterHead_328_UI.png' }
	},
	{
		key: 'violet_feathered_heron',
		cost: 3,
		possible_sonatas: ['molten_rift', 'void_thunder'],
		image: { head: 'T_IconMonsterHead_125_UI.png' }
	},
	{
		key: 'cyan_feathered_heron',
		cost: 3,
		possible_sonatas: ['sierra_gale', 'celestial_light'],
		image: { head: 'T_IconMonsterHead_135_UI.png' }
	},
	{
		key: 'stonewall_bracer',
		cost: 3,
		possible_sonatas: ['rejuvenating_glow', 'moonlit_clouds'],
		image: { head: 'T_IconMonsterHead_185_UI.png' }
	},
	{
		key: 'flautist',
		cost: 3,
		possible_sonatas: ['void_thunder', 'lingering_tunes'],
		image: { head: 'T_IconMonsterHead_195_UI.png' }
	},
	{
		key: 'tambourinist',
		cost: 3,
		possible_sonatas: ['freezing_frost', 'sun_sinking_eclipse'],
		image: { head: 'T_IconMonsterHead_205_UI.png' }
	},
	{
		key: 'rockstead_guardian',
		cost: 3,
		possible_sonatas: ['celestial_light', 'rejuvenating_glow'],
		image: { head: 'T_IconMonsterHead_245_UI.png' }
	},
	{
		key: 'chasm_guardian',
		cost: 3,
		possible_sonatas: ['rejuvenating_glow', 'lingering_tunes'],
		image: { head: 'T_IconMonsterHead_215_UI.png' }
	},
	{
		key: 'viridblaze_saurian',
		cost: 3,
		possible_sonatas: ['molten_rift', 'moonlit_clouds'],
		image: { head: 'T_IconMonsterHead_295_UI.png' }
	},
	{
		key: 'roseshroom',
		cost: 3,
		possible_sonatas: ['freezing_frost', 'sun_sinking_eclipse'],
		image: { head: 'T_IconMonsterHead_315_UI.png' }
	},
	{
		key: 'havoc_dreadmane',
		cost: 3,
		possible_sonatas: ['molten_rift', 'sun_sinking_eclipse'],
		image: { head: 'T_IconMonsterHead_984_UI.png' }
	},
	{
		key: 'spearback',
		cost: 3,
		possible_sonatas: ['moonlit_clouds', 'lingering_tunes'],
		image: { head: 'T_IconMonsterHead_986_UI.png' }
	}
] as const satisfies EchoData[];