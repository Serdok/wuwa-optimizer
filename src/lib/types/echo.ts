import type { Attribute, BaseAttribute, Stat } from '$lib/types/stat';

export enum Sonata {
	FreezingFrost = 'Freezing Frost',
	MoltenRift = 'Molten Rift',
	VoidThunder = 'Void Thunder',
	SierraGale = 'Sierra Gale',
	CelestialLight = 'Celestial Light',
	SunSinkingEclipse = 'Sun-Sinking Eclipse',
	RejuvenatingGlow = 'Rejuvenating Glow',
	MoonlitClouds = 'Moonlit Clouds',
	LingeringTunes = 'Lingering Tunes'
}

export enum Class {
	Common = 'Common',
	Elite = 'Elite',
	Overlord = 'Overlord',
	Calamity = 'Calamity',
}

export const Cost = [1, 3, 4] as const;
export type Cost = typeof Cost[number];

export const Quality = [1, 2, 3, 4, 5] as const;
export type Quality = typeof Quality[number];

export type EchoData = {
	name: string,
	class: Class,
	cost: Cost,
	sonatas: Sonata[],
};

export type Echo = {
	name: string,
	sonata: Sonata,
	quality: Quality,
	class: Class,
	cost: Cost,
	level: number,
	main_stat: {
		primary: Stat<BaseAttribute>,
		secondary: Stat<Exclude<Attribute, BaseAttribute>>
	},
	sub_stats: Stat<Attribute>[],
	image: {
		head: string,
	}
};
