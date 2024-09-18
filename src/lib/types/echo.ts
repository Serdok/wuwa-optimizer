import type { UUID } from '$lib/types/common';
import type { Stat } from '$lib/types/stat';

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

export enum EchoClass {
	Common = 'Common',
	Elite = 'Elite',
	Overlord = 'Overlord',
	Calamity = 'Calamity',
}

export const EchoCost = [4, 3, 1] as const;
export type EchoCost = typeof EchoCost[number];

export const EchoQuality = [5, 4, 3, 2] as const;
export type EchoQuality = typeof EchoQuality[number];

export type EchoMetadata = {
	name: string,
	class: EchoClass,
	sonata: Sonata[],
	icon: { head: string, },
}

export type Echo = {
	id: UUID,
	name: string,
	sonata: Sonata,
	quality: EchoQuality,
	level: number,
	main_stat: { primary: Stat, secondary: Stat, },
	sub_stats: Stat[],
	equipped_by: UUID | null,
}


