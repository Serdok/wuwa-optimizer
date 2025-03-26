import freezing_frost from './T_IconElementAttriIce.png';
import molten_rift from './T_IconElementAttriFire.png';
import void_thunder from './T_IconElementAttriThunder.png';
import sierra_gale from './T_IconElementAttriWind.png';
import celestial_light from './T_IconElementAttriLight.png';
import sun_sinking_eclipse from './T_IconElementAttriDark.png';
import rejuvenating_glow from './T_IconElementAttriCure.png';
import moonlit_clouds from './T_IconElementAttriCloud.png';
import lingering_tunes from './T_IconElementAttriAttack.png';
import frosty_resolve from './T_IconElementAttriIceUltimateSkill.png';
import eternal_radiance from './T_IconElementAttriLightError.png';
import midnight_veil from './T_IconElementAttriDarkAssist.png';
import empyrean_anthem from './T_IconElementAttriCooperate.png';
import tidebreaking_courage from './T_IconElementAttriEnergy.png';
import gusts_of_welkin from './T_IconElementAttriWind.png';

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
] as const;
export type SonataKey = typeof SONATAS[number];

export type SonataData = {
	key: SonataKey;
	image: string;
};

export const SONATA_DATA: Record<SonataKey, SonataData> = {
	freezing_frost: {
		key: 'freezing_frost',
		image: freezing_frost
	},
	molten_rift: {
		key: 'molten_rift',
		image: molten_rift
	},
	void_thunder: {
		key: 'void_thunder',
		image: void_thunder
	},
	sierra_gale: {
		key: 'sierra_gale',
		image: sierra_gale
	},
	celestial_light: {
		key: 'celestial_light',
		image: celestial_light
	},
	sun_sinking_eclipse: {
		key: 'sun_sinking_eclipse',
		image: sun_sinking_eclipse
	},
	rejuvenating_glow: {
		key: 'rejuvenating_glow',
		image: rejuvenating_glow
	},
	moonlit_clouds: {
		key: 'moonlit_clouds',
		image: moonlit_clouds
	},
	lingering_tunes: {
		key: 'lingering_tunes',
		image: lingering_tunes
	},
	frosty_resolve: {
		key: 'frosty_resolve',
		image: frosty_resolve,
	},
	eternal_radiance: {
		key: 'eternal_radiance',
		image: eternal_radiance,
	},
	midnight_veil: {
		key: 'midnight_veil',
		image: midnight_veil,
	},
	empyrean_anthem: {
		key: 'empyrean_anthem',
		image: empyrean_anthem,
	},
	tidebreaking_courage: {
		key: 'tidebreaking_courage',
		image: tidebreaking_courage,
	},
	gusts_of_welkin: {
		key: 'gusts_of_welkin',
		image: gusts_of_welkin,
	},
} as const;
