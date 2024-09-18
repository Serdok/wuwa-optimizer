import { Sonata } from '$lib/types/echo';

export const get_sonata_image = (sonata: Sonata) => {
	switch (sonata) {
		case Sonata.FreezingFrost: return '/assets/sonata/T_IconElementIce1.png';
		case Sonata.MoltenRift: return '/assets/sonata/T_IconElementFire1.png';
		case Sonata.VoidThunder: return '/assets/sonata/T_IconElementThunder1.png';
		case Sonata.SierraGale: return '/assets/sonata/T_IconElementWind1.png';
		case Sonata.CelestialLight: return '/assets/sonata/T_IconElementLight1.png';
		case Sonata.SunSinkingEclipse: return '/assets/sonata/T_IconElementDark1.png';
		case Sonata.RejuvenatingGlow: return '/assets/sonata/T_Iconpropertyhealingtag_UI.png';
		case Sonata.MoonlitClouds: return '/assets/sonata/T_Iconpropertyswitchtag_UI.png';
		case Sonata.LingeringTunes: return '/assets/sonata/T_Iconpropertyattacktag_UI.png';
		default: return '';
	}
}