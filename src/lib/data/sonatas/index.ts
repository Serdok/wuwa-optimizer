export const SONATAS = {
	// 1.0
	freezing_frost: (await import('./freezing_frost')).freezing_frost,
	molten_rift: (await import('./molten_rift')).molten_rift,
	void_thunder: (await import('./void_thunder')).void_thunder,
	sierra_gale: (await import('./sierra_gale')).sierra_gale,
	celestial_light: (await import('./celestial_light')).celestial_light,
	sun_sinking_eclipse: (await import('./sun_sinking_eclipse')).sun_sinking_eclipse,
	rejuvenating_glow: (await import('./rejuvenating_glow')).rejuvenating_glow,
	moonlit_clouds: (await import('./moonlit_clouds')).moonlit_clouds,
	lingering_tunes: (await import('./lingering_tunes')).lingering_tunes,
	// 2.0
	frosty_resolve: (await import('./frosty_resolve')).frosty_resolve,
	eternal_radiance: (await import('./eternal_radiance')).eternal_radiance,
	midnight_veil: (await import('./midnight_veil')).midnight_veil,
	empyrean_anthem: (await import('./empyrean_anthem')).empyrean_anthem,
	tidebreaking_courage: (await import('./tidebreaking_courage')).tidebreaking_courage,
	// 2.2
	gusts_of_welkin: (await import('./gusts_of_welkin')).gusts_of_welkin,
	// 2.4
	windward_pilgrimage: (await import('./windward_pilgrimage')).windward_pilgrimage,
	flaming_clawprint: (await import('./flaming_clawprint')).flaming_clawprint,
	// 2.5
	dream_of_the_lost: (await import('./dream_of_the_lost')).dream_of_the_lost,
} as const;