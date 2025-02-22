import freezing_frost from './T_IconElementIce1.png';
import molten_rift from './T_IconElementFire1.png';
import void_thunder from './T_IconElementThunder1.png';
import sierra_gale from './T_IconElementWind1.png';
import celestial_light from './T_IconElementLight1.png';
import sun_sinking_eclipse from './T_IconElementDark1.png';
import rejuvenating_glow from './T_Iconpropertyhealingtag_UI.png';
import moonlit_clouds from './T_Iconpropertyswitchtag_UI.png';
import lingering_tunes from './T_Iconpropertyattacktag_UI.png';

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
	}
} as const;
