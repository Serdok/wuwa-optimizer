import { base } from '$app/paths';
import { Sonata } from '$lib/types/echo';

export const get_sonata_image = (sonata: Sonata) => {
	switch (sonata) {
		case Sonata.FreezingFrost: return `${base}/assets/sonata/T_IconElementIce1.png`;
		case Sonata.MoltenRift: return `${base}/assets/sonata/T_IconElementFire1.png`;
		case Sonata.VoidThunder: return `${base}/assets/sonata/T_IconElementThunder1.png`;
		case Sonata.SierraGale: return `${base}/assets/sonata/T_IconElementWind1.png`;
		case Sonata.CelestialLight: return `${base}/assets/sonata/T_IconElementLight1.png`;
		case Sonata.SunSinkingEclipse: return `${base}/assets/sonata/T_IconElementDark1.png`;
		case Sonata.RejuvenatingGlow: return `${base}/assets/sonata/T_Iconpropertyhealingtag_UI.png`;
		case Sonata.MoonlitClouds: return `${base}/assets/sonata/T_Iconpropertyswitchtag_UI.png`;
		case Sonata.LingeringTunes: return `${base}/assets/sonata/T_Iconpropertyattacktag_UI.png`;
		default: return '';
	}
}