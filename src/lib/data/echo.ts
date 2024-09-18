import { EchoClass, type EchoMetadata, Sonata } from '$lib/types/echo';

export const get_echo_class = (name: string) => ECHOES_METADATA.find(e => e.name === name)?.class;
export const get_echo_icon = (name: string) => ECHOES_METADATA.find(e => e.name === name)?.icon;

export const ECHO_CLASS_COST = {
	[EchoClass.Common]: 1,
	[EchoClass.Elite]: 3,
	[EchoClass.Overlord]: 4,
	[EchoClass.Calamity]: 4,
} as const;

export const ECHOES_METADATA: EchoMetadata[] = [
	{
		name: 'Inferno Rider',
		class: EchoClass.Overlord,
		sonata: [Sonata.MoltenRift],
		icon: { head: '/assets/monster/head/T_IconMonsterHead_325_UI.png' }
	},
	{
		name: 'Viridblaze Saurian',
		class: EchoClass.Elite,
		sonata: [Sonata.MoltenRift, Sonata.MoonlitClouds],
		icon: { head: '/assets/monster/head/T_IconMonsterHead_295_UI.png' }
	},
	{
		name: 'Violet-Feathered Heron',
		class: EchoClass.Elite,
		sonata: [Sonata.MoltenRift, Sonata.VoidThunder],
		icon: { head: '/assets/monster/head/T_IconMonsterHead_125_UI.png' }
	},
	{
		name: 'Havoc Dreadmane',
		class: EchoClass.Elite,
		sonata: [Sonata.MoltenRift, Sonata.SunSinkingEclipse],
		icon: { head: '/assets/monster/head/T_IconMonsterHead_984_UI.png' }
	},
	{
		name: 'Traffic Illuminator',
		class: EchoClass.Common,
		sonata: [Sonata.MoltenRift, Sonata.VoidThunder, Sonata.SierraGale],
		icon: { head: '/assets/monster/head/T_IconMonsterHead_1000_UI.png' }
	},
	{
		name: 'Spectro Prism',
		class: EchoClass.Common,
		sonata: [Sonata.MoltenRift, Sonata.VoidThunder, Sonata.CelestialLight],
		icon: { head: '/assets/monster/head/T_IconMonsterHead_165_UI.png' }
	},
	{
		name: 'Snip Snap',
		class: EchoClass.Common,
		sonata: [Sonata.MoltenRift, Sonata.RejuvenatingGlow, Sonata.LingeringTunes],
		icon: { head: '/assets/monster/head/T_IconMonsterHead_065_UI.png' }
	},
	{
		name: 'Lava Larva',
		class: EchoClass.Common,
		sonata: [Sonata.MoltenRift, Sonata.LingeringTunes],
		icon: { head: '/assets/monster/head/T_IconMonsterHead_326_UI.png' }
	},
	{
		name: 'Fusion Warrior',
		class: EchoClass.Common,
		sonata: [Sonata.MoltenRift, Sonata.VoidThunder, Sonata.SierraGale],
		icon: { head: '/assets/monster/head/T_IconMonsterHead_045_UI.png' }
	},
	{
		name: 'Fusion Prism',
		class: EchoClass.Common,
		sonata: [Sonata.MoltenRift, Sonata.FreezingFrost, Sonata.LingeringTunes],
		icon: { head: '/assets/monster/head/T_IconMonsterHead_155_UI.png' }
	},
	{
		name: 'Fusion Dreadmane',
		class: EchoClass.Common,
		sonata: [Sonata.MoltenRift, Sonata.RejuvenatingGlow],
		icon: { head: '/assets/monster/head/T_IconMonsterHead_980_UI.png' }
	},
	{
		name: 'Electro Predator',
		class: EchoClass.Common,
		sonata: [Sonata.MoltenRift, Sonata.VoidThunder],
		icon: { head: '/assets/monster/head/T_IconMonsterHead_035_UI.png' }
	},
	{
		name: 'Baby Viridblaze Saurian',
		class: EchoClass.Common,
		sonata: [Sonata.MoltenRift, Sonata.VoidThunder, Sonata.LingeringTunes],
		icon: { head: '/assets/monster/head/T_IconMonsterHead_285_UI.png' }
	}
] as const;
