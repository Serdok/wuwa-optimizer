import { Class, type EchoData, Sonata } from '$lib/types/echo';
import { AttackDMGBonus, BaseAttribute, CombatAttribute, ElementDMGBonus } from '$lib/types/stat';

export const calamity: EchoData[] = [
	{
		name: 'Bell-Borne Geochelone',
		class: Class.Calamity,
		cost: 4,
		sonatas: [Sonata.RejuvenatingGlow, Sonata.MoonlitClouds],
		image: { head: 'T_IconMonsterHead_992_UI.png' }
	},
	{
		name: 'Jué',
		class: Class.Calamity,
		cost: 4,
		sonatas: [Sonata.CelestialLight],
		image: { head: 'T_IconMonsterHead_327_UI.png' }
	},
	{
		name: 'Dreamless',
		class: Class.Calamity,
		cost: 4,
		sonatas: [Sonata.SunSinkingEclipse],
		image: { head: 'T_IconMonsterHead_998_UI.png' }
	}
] as const;

export const overlord: EchoData[] = [
	{
		name: 'Inferno Rider',
		class: Class.Overlord,
		cost: 4,
		sonatas: [Sonata.MoltenRift],
		image: { head: 'T_IconMonsterHead_325_UI.png' }
	},
	{
		name: 'Thundering Mephis',
		class: Class.Overlord,
		cost: 4,
		sonatas: [Sonata.VoidThunder],
		image: { head: 'T_IconMonsterHead_226_UI.png' }
	},
	{
		name: 'Fallacy of No Return',
		class: Class.Overlord,
		cost: 4,
		sonatas: [Sonata.RejuvenatingGlow],
		image: { head: 'T_IconMonsterHead_350_UI.png' }
	},
	{
		name: 'Impermanence Heron',
		class: Class.Overlord,
		cost: 4,
		sonatas: [Sonata.MoonlitClouds],
		image: { head: 'T_IconMonsterHead_995_UI.png' }
	},
	{
		name: 'Mech Abomination',
		class: Class.Overlord,
		cost: 4,
		sonatas: [Sonata.LingeringTunes],
		image: { head: 'T_IconMonsterHead_993_UI.png' }
	},
	{
		name: 'Mourning Aix',
		class: Class.Overlord,
		cost: 4,
		sonatas: [Sonata.CelestialLight],
		image: { head: 'T_IconMonsterHead_997_UI.png' }
	},
	{
		name: 'Lampylumen Myriad',
		class: Class.Overlord,
		cost: 4,
		sonatas: [Sonata.FreezingFrost],
		image: { head: 'T_IconMonsterHead_994_UI.png' }
	},
	{
		name: 'Feilian Beringal',
		class: Class.Overlord,
		cost: 4,
		sonatas: [Sonata.SierraGale],
		image: { head: 'T_IconMonsterHead_996_UI.png' }
	},
	{
		name: 'Crownless',
		class: Class.Overlord,
		cost: 4,
		sonatas: [Sonata.SunSinkingEclipse],
		image: { head: 'T_IconMonsterHead_999_UI.png' }
	},
	{
		name: 'Tempest Mephis',
		class: Class.Overlord,
		cost: 4,
		sonatas: [Sonata.VoidThunder],
		image: { head: 'T_IconMonsterHead_225_UI.png' }
	}
] as const;

export const elite: EchoData[] = [
	{
		name: 'Hoochief',
		class: Class.Elite,
		cost: 3,
		sonatas: [Sonata.SierraGale, Sonata.RejuvenatingGlow],
		image: { head: 'T_IconMonsterHead_989_UI.png' }
	},
	{
		name: 'Carapace',
		class: Class.Elite,
		cost: 3,
		sonatas: [Sonata.SierraGale, Sonata.MoonlitClouds],
		image: { head: 'T_IconMonsterHead_970_UI.png' }
	},
	{
		name: 'Autopuppet Scout',
		class: Class.Elite,
		cost: 3,
		sonatas: [Sonata.FreezingFrost, Sonata.CelestialLight],
		image: { head: 'T_IconMonsterHead_1003_UI.png' }
	},
	{
		name: 'Glacio Dreadmane',
		class: Class.Elite,
		cost: 3,
		sonatas: [Sonata.FreezingFrost, Sonata.MoonlitClouds],
		image: { head: 'T_IconMonsterHead_985_UI.png' }
	},
	{
		name: 'Lumiscale Construct',
		class: Class.Elite,
		cost: 3,
		sonatas: [Sonata.FreezingFrost, Sonata.VoidThunder],
		image: { head: 'T_IconMonsterHead_329_UI.png' }
	},
	{
		name: 'Lightcrusher',
		class: Class.Elite,
		cost: 3,
		sonatas: [Sonata.CelestialLight],
		image: { head: 'T_IconMonsterHead_328_UI.png' }
	},
	{
		name: 'Violet-Feathered Heron',
		class: Class.Elite,
		cost: 3,
		sonatas: [Sonata.MoltenRift, Sonata.VoidThunder],
		image: { head: 'T_IconMonsterHead_125_UI.png' }
	},
	{
		name: 'Cyan-Feathered Heron',
		class: Class.Elite,
		cost: 3,
		sonatas: [Sonata.SierraGale, Sonata.CelestialLight],
		image: { head: 'T_IconMonsterHead_135_UI.png' }
	},
	{
		name: 'Stonewall Bracer',
		class: Class.Elite,
		cost: 3,
		sonatas: [Sonata.RejuvenatingGlow, Sonata.MoonlitClouds],
		image: { head: 'T_IconMonsterHead_185_UI.png' }
	},
	{
		name: 'Flautist',
		class: Class.Elite,
		cost: 3,
		sonatas: [Sonata.VoidThunder, Sonata.LingeringTunes],
		image: { head: 'T_IconMonsterHead_195_UI.png' }
	},
	{
		name: 'Tambourinist',
		class: Class.Elite,
		cost: 3,
		sonatas: [Sonata.FreezingFrost, Sonata.SunSinkingEclipse],
		image: { head: 'T_IconMonsterHead_205_UI.png' }
	},
	{
		name: 'Rockstead Guardian',
		class: Class.Elite,
		cost: 3,
		sonatas: [Sonata.CelestialLight, Sonata.RejuvenatingGlow],
		image: { head: 'T_IconMonsterHead_245_UI.png' }
	},
	{
		name: 'Chasm Guardian',
		class: Class.Elite,
		cost: 3,
		sonatas: [Sonata.RejuvenatingGlow, Sonata.LingeringTunes],
		image: { head: 'T_IconMonsterHead_215_UI.png' }
	},
	{
		name: 'Viridblaze Saurian',
		class: Class.Elite,
		cost: 3,
		sonatas: [Sonata.MoltenRift, Sonata.MoonlitClouds],
		image: { head: 'T_IconMonsterHead_295_UI.png' }
	},
	{
		name: 'Roseshroom',
		class: Class.Elite,
		cost: 3,
		sonatas: [Sonata.FreezingFrost, Sonata.SunSinkingEclipse],
		image: { head: 'T_IconMonsterHead_315_UI.png' }
	},
	{
		name: 'Havoc Dreadmane',
		class: Class.Elite,
		cost: 3,
		sonatas: [Sonata.MoltenRift, Sonata.SunSinkingEclipse],
		image: { head: 'T_IconMonsterHead_984_UI.png' }
	},
	{
		name: 'Spearback',
		class: Class.Elite,
		cost: 3,
		sonatas: [Sonata.MoonlitClouds, Sonata.LingeringTunes],
		image: { head: 'T_IconMonsterHead_986_UI.png' }
	}
] as const;

export const common: EchoData[] = [
	{
		name: 'Hooscamp',
		class: Class.Common,
		cost: 1,
		sonatas: [Sonata.SierraGale, Sonata.LingeringTunes],
		image: { head: 'T_IconMonsterHead_988_UI.png' }
	},
	{
		name: 'Diamondclaw',
		class: Class.Common,
		cost: 1,
		sonatas: [Sonata.MoonlitClouds, Sonata.LingeringTunes],
		image: { head: 'T_IconMonsterHead_987_UI.png' }
	},
	{
		name: 'Chirpuff',
		class: Class.Common,
		cost: 1,
		sonatas: [Sonata.SierraGale, Sonata.SunSinkingEclipse],
		image: { head: 'T_IconMonsterHead_971_UI.png' }
	},
	{
		name: 'Traffic Illuminator',
		class: Class.Common,
		cost: 1,
		sonatas: [Sonata.MoltenRift, Sonata.VoidThunder, Sonata.SierraGale],
		image: { head: 'T_IconMonsterHead_1000_UI.png' }
	},
	{
		name: 'Clang Bang',
		class: Class.Common,
		cost: 1,
		sonatas: [Sonata.FreezingFrost, Sonata.CelestialLight],
		image: { head: 'T_IconMonsterHead_1001_UI.png' }
	},
	{
		name: 'Lava Larva',
		class: Class.Common,
		cost: 1,
		sonatas: [Sonata.MoltenRift, Sonata.LingeringTunes],
		image: { head: 'T_IconMonsterHead_326_UI.png' }
	},
	{
		name: 'Dwarf Cassowary',
		class: Class.Common,
		cost: 1,
		sonatas: [Sonata.SierraGale, Sonata.RejuvenatingGlow],
		image: { head: 'T_IconMonsterHead_330_UI.png' }
	},
	{
		name: 'Vanguard Junrock',
		class: Class.Common,
		cost: 1,
		sonatas: [Sonata.VoidThunder, Sonata.RejuvenatingGlow, Sonata.LingeringTunes],
		image: { head: 'T_IconMonsterHead_015_UI.png' }
	},
	{
		name: 'Fission Junrock',
		class: Class.Common,
		cost: 1,
		sonatas: [Sonata.VoidThunder, Sonata.RejuvenatingGlow, Sonata.MoonlitClouds],
		image: { head: 'T_IconMonsterHead_025_UI.png' }
	},
	{
		name: 'Electro Predator',
		class: Class.Common,
		cost: 1,
		sonatas: [Sonata.MoltenRift, Sonata.VoidThunder],
		image: { head: 'T_IconMonsterHead_035_UI.png' }
	},
	{
		name: 'Fusion Warrior',
		class: Class.Common,
		cost: 1,
		sonatas: [Sonata.MoltenRift, Sonata.VoidThunder, Sonata.SierraGale],
		image: { head: 'T_IconMonsterHead_045_UI.png' }
	},
	{
		name: 'Havoc Warrior',
		class: Class.Common,
		cost: 1,
		sonatas: [Sonata.CelestialLight, Sonata.SunSinkingEclipse],
		image: { head: 'T_IconMonsterHead_055_UI.png' }
	},
	{
		name: 'Snip Snap',
		class: Class.Common,
		cost: 1,
		sonatas: [Sonata.MoltenRift, Sonata.RejuvenatingGlow, Sonata.LingeringTunes],
		image: { head: 'T_IconMonsterHead_065_UI.png' }
	},
	{
		name: 'Zig Zag',
		class: Class.Common,
		cost: 1,
		sonatas: [Sonata.CelestialLight, Sonata.MoonlitClouds, Sonata.LingeringTunes],
		image: { head: 'T_IconMonsterHead_075_UI.png' }
	},
	{
		name: 'Whiff Whaff',
		class: Class.Common,
		cost: 1,
		sonatas: [Sonata.SierraGale, Sonata.RejuvenatingGlow, Sonata.MoonlitClouds],
		image: { head: 'T_IconMonsterHead_085_UI.png' }
	},
	{
		name: 'Tick Tack',
		class: Class.Common,
		cost: 1,
		sonatas: [Sonata.SunSinkingEclipse, Sonata.RejuvenatingGlow, Sonata.LingeringTunes],
		image: { head: 'T_IconMonsterHead_095_UI.png' }
	},
	{
		name: 'Glacio Predator',
		class: Class.Common,
		cost: 1,
		sonatas: [Sonata.FreezingFrost, Sonata.CelestialLight],
		image: { head: 'T_IconMonsterHead_105_UI.png' }
	},
	{
		name: 'Aero Predator',
		class: Class.Common,
		cost: 1,
		sonatas: [Sonata.VoidThunder, Sonata.SierraGale],
		image: { head: 'T_IconMonsterHead_235_UI.png' }
	},
	{
		name: 'Cruisewing',
		class: Class.Common,
		cost: 1,
		sonatas: [Sonata.CelestialLight, Sonata.RejuvenatingGlow, Sonata.MoonlitClouds],
		image: { head: 'T_IconMonsterHead_255_UI.png' }
	},
	{
		name: 'Sabyr Boar',
		class: Class.Common,
		cost: 1,
		sonatas: [Sonata.FreezingFrost, Sonata.SierraGale, Sonata.MoonlitClouds],
		image: { head: 'T_IconMonsterHead_265_UI.png' }
	},
	{
		name: 'Gulpuff',
		class: Class.Common,
		cost: 1,
		sonatas: [Sonata.FreezingFrost, Sonata.CelestialLight],
		image: { head: 'T_IconMonsterHead_115_UI.png' }
	},
	{
		name: 'Excarat',
		class: Class.Common,
		cost: 1,
		sonatas: [Sonata.FreezingFrost, Sonata.SunSinkingEclipse],
		image: { head: 'T_IconMonsterHead_275_UI.png' }
	},
	{
		name: 'Baby Viridblaze Saurian',
		class: Class.Common,
		cost: 1,
		sonatas: [Sonata.MoltenRift, Sonata.VoidThunder, Sonata.LingeringTunes],
		image: { head: 'T_IconMonsterHead_285_UI.png' }
	},
	{
		name: 'Young Roseshroom',
		class: Class.Common,
		cost: 1,
		sonatas: [Sonata.SierraGale, Sonata.SunSinkingEclipse],
		image: { head: 'T_IconMonsterHead_305_UI.png' }
	},
	{
		name: 'Fusion Dreadmane',
		class: Class.Common,
		cost: 1,
		sonatas: [Sonata.MoltenRift, Sonata.RejuvenatingGlow],
		image: { head: 'T_IconMonsterHead_980_UI.png' }
	},
	{
		name: 'Hoartoise',
		class: Class.Common,
		cost: 1,
		sonatas: [Sonata.FreezingFrost, Sonata.CelestialLight],
		image: { head: 'T_IconMonsterHead_969_UI.png' }
	},
	{
		name: 'Fusion Prism',
		class: Class.Common,
		cost: 1,
		sonatas: [Sonata.FreezingFrost, Sonata.MoltenRift, Sonata.LingeringTunes],
		image: { head: 'T_IconMonsterHead_155_UI.png' }
	},
	{
		name: 'Glacio Prism',
		class: Class.Common,
		cost: 1,
		sonatas: [Sonata.FreezingFrost, Sonata.SunSinkingEclipse, Sonata.MoonlitClouds],
		image: { head: 'T_IconMonsterHead_145_UI.png' }
	},
	{
		name: 'Spectro Prism',
		class: Class.Common,
		cost: 1,
		sonatas: [Sonata.MoltenRift, Sonata.VoidThunder, Sonata.CelestialLight],
		image: { head: 'T_IconMonsterHead_165_UI.png' }
	},
	{
		name: 'Havoc Prism',
		class: Class.Common,
		cost: 1,
		sonatas: [Sonata.VoidThunder, Sonata.CelestialLight, Sonata.SunSinkingEclipse],
		image: { head: 'T_IconMonsterHead_175_UI.png' }
	}
] as const;

export const all_echoes: EchoData[] = [...calamity, ...overlord, ...elite, ...common] as const;

export const secondary_main_stats = {
	1: {
		cost: 1,
		stats: {
			[CombatAttribute.HP_P]: {
				attribute: CombatAttribute.HP_P,
				values: {
					2: { quality: 2, base: 0.028 },
					3: { quality: 3, base: 0.03 },
					4: { quality: 4, base: 0.034 },
					5: { quality: 5, base: 0.045 }
				}
			},
			[CombatAttribute.ATK_P]: {
				attribute: CombatAttribute.ATK_P,
				values: {
					2: { quality: 2, base: 0.022 },
					3: { quality: 3, base: 0.024 },
					4: { quality: 4, base: 0.027 },
					5: { quality: 5, base: 0.036 }
				}
			},
			[CombatAttribute.DEF_P]: {
				attribute: CombatAttribute.DEF_P,
				values: {
					2: { quality: 2, base: 0.022 },
					3: { quality: 3, base: 0.024 },
					4: { quality: 4, base: 0.027 },
					5: { quality: 5, base: 0.036 }
				}
			}
		}
	},
	3: {
		cost: 3,
		stats: {
			[CombatAttribute.HP_P]: {
				attribute: CombatAttribute.HP_P,
				values: {
					2: { quality: 2, base: 0.037 },
					3: { quality: 3, base: 0.04 },
					4: { quality: 4, base: 0.045 },
					5: { quality: 5, base: 0.06 }
				}
			},
			[CombatAttribute.ATK_P]: {
				attribute: CombatAttribute.ATK_P,
				values: {
					2: { quality: 2, base: 0.037 },
					3: { quality: 3, base: 0.04 },
					4: { quality: 4, base: 0.045 },
					5: { quality: 5, base: 0.06 }
				}
			},
			[CombatAttribute.DEF_P]: {
				attribute: CombatAttribute.DEF_P,
				values: {
					2: { quality: 2, base: 0.047 },
					3: { quality: 3, base: 0.05 },
					4: { quality: 4, base: 0.057 },
					5: { quality: 5, base: 0.076 }
				}
			},
			[ElementDMGBonus.Glacio]: {
				attribute: ElementDMGBonus.Glacio,
				values: {
					2: { quality: 2, base: 0.037 },
					3: { quality: 3, base: 0.04 },
					4: { quality: 4, base: 0.045 },
					5: { quality: 5, base: 0.06 }
				}
			},
			[ElementDMGBonus.Fusion]: {
				attribute: ElementDMGBonus.Fusion,
				values: {
					2: { quality: 2, base: 0.037 },
					3: { quality: 3, base: 0.04 },
					4: { quality: 4, base: 0.045 },
					5: { quality: 5, base: 0.06 }
				}
			},
			[ElementDMGBonus.Electro]: {
				attribute: ElementDMGBonus.Electro,
				values: {
					2: { quality: 2, base: 0.037 },
					3: { quality: 3, base: 0.04 },
					4: { quality: 4, base: 0.045 },
					5: { quality: 5, base: 0.06 }
				}
			},
			[ElementDMGBonus.Aero]: {
				attribute: ElementDMGBonus.Aero,
				values: {
					2: { quality: 2, base: 0.037 },
					3: { quality: 3, base: 0.04 },
					4: { quality: 4, base: 0.045 },
					5: { quality: 5, base: 0.06 }
				}
			},
			[ElementDMGBonus.Spectro]: {
				attribute: ElementDMGBonus.Spectro,
				values: {
					2: { quality: 2, base: 0.037 },
					3: { quality: 3, base: 0.04 },
					4: { quality: 4, base: 0.045 },
					5: { quality: 5, base: 0.06 }
				}
			},
			[ElementDMGBonus.Havoc]: {
				attribute: ElementDMGBonus.Havoc,
				values: {
					2: { quality: 2, base: 0.037 },
					3: { quality: 3, base: 0.04 },
					4: { quality: 4, base: 0.045 },
					5: { quality: 5, base: 0.06 }
				}
			},
			[CombatAttribute.EnergyRegen]: {
				attribute: CombatAttribute.EnergyRegen,
				values: {
					2: { quality: 2, base: 0.0385 }, // approximation
					3: { quality: 3, base: 0.05 },
					4: { quality: 4, base: 0.057 },
					5: { quality: 5, base: 0.076 }
				}
			}
		}
	},
	4: {
		cost: 4,
		stats: {
			[CombatAttribute.HP_P]: {
				attribute: CombatAttribute.HP_P,
				values: {
					2: { quality: 2, base: 0.041 },
					3: { quality: 3, base: 0.043 },
					4: { quality: 4, base: 0.049 },
					5: { quality: 5, base: 0.066 }
				}
			},
			[CombatAttribute.ATK_P]: {
				attribute: CombatAttribute.ATK_P,
				values: {
					2: { quality: 2, base: 0.041 },
					3: { quality: 3, base: 0.043 },
					4: { quality: 4, base: 0.049 },
					5: { quality: 5, base: 0.066 }
				}
			},
			[CombatAttribute.DEF_P]: {
				attribute: CombatAttribute.DEF_P,
				values: {
					2: { quality: 2, base: 0.052 },
					3: { quality: 3, base: 0.055 },
					4: { quality: 4, base: 0.062 },
					5: { quality: 5, base: 0.083 }
				}
			},
			[CombatAttribute.CritRate]: {
				attribute: CombatAttribute.CritRate,
				values: {
					2: { quality: 2, base: 0.027 },
					3: { quality: 3, base: 0.029 },
					4: { quality: 4, base: 0.033 },
					5: { quality: 5, base: 0.044 }
				}
			},
			[CombatAttribute.CritDamage]: {
				attribute: CombatAttribute.CritDamage,
				values: {
					2: { quality: 2, base: 0.054 },
					3: { quality: 3, base: 0.058 },
					4: { quality: 4, base: 0.066 },
					5: { quality: 5, base: 0.088 }
				}
			},
			[CombatAttribute.HealingBonus]: {
				attribute: CombatAttribute.HealingBonus,
				values: {
					2: { quality: 2, base: 0.0327 }, // approximation
					3: { quality: 3, base: 0.035 },
					4: { quality: 4, base: 0.039 },
					5: { quality: 5, base: 0.052 }
				}
			}
		}
	}
} as const;

export const primary_main_stats = {
	1: {
		cost: 1,
		stats: {
			[BaseAttribute.HP]: {
				attribute: BaseAttribute.HP,
				values: {
					2: { quality: 2, base: 114 },
					3: { quality: 3, base: 152 },
					4: { quality: 4, base: 228 },
					5: { quality: 5, base: 456 }
				}
			}
		}
	},
	3: {
		cost: 3,
		stats: {
			[BaseAttribute.ATK]: {
				attribute: BaseAttribute.ATK,
				values: {
					2: { quality: 2, base: 12 },
					3: { quality: 3, base: 13 },
					4: { quality: 4, base: 15 },
					5: { quality: 5, base: 20 }
				}
			}
		}
	},
	4: {
		cost: 4,
		stats: {
			[BaseAttribute.ATK]: {
				attribute: BaseAttribute.ATK,
				values: {
					2: { quality: 2, base: 18 },
					3: { quality: 3, base: 20 },
					4: { quality: 4, base: 22 },
					5: { quality: 5, base: 30 }
				}
			}
		}
	}
} as const;

export const sub_stats = {
	[BaseAttribute.HP]: {
		attribute: BaseAttribute.HP,
		values: [320, 360, 390, 430, 470, 510, 540, 580]
	},
	[BaseAttribute.ATK]: {
		attribute: BaseAttribute.ATK,
		values: [30, 40, 50, 60, 70]
	},
	[BaseAttribute.DEF]: {
		attribute: BaseAttribute.DEF,
		values: [30, 40, 50, 60, 70]
	},
	[CombatAttribute.HP_P]: {
		attribute: CombatAttribute.HP_P,
		values: [0.064, 0.071, 0.079, 0.086, 0.094, 0.101, 0.109, 0.116]
	},
	[CombatAttribute.ATK_P]: {
		attribute: CombatAttribute.ATK_P,
		values: [0.064, 0.071, 0.079, 0.086, 0.094, 0.101, 0.109, 0.116]
	},
	[CombatAttribute.DEF_P]: {
		attribute: CombatAttribute.DEF_P,
		values: [0.081, 0.09, 0.1, 0.109, 0.118, 0.128, 0.138, 0.147]
	},
	[CombatAttribute.CritRate]: {
		attribute: CombatAttribute.CritRate,
		values: [0.063, 0.069, 0.075, 0.081, 0.087, 0.093, 0.099, 0.105]
	},
	[CombatAttribute.CritDamage]: {
		attribute: CombatAttribute.CritDamage,
		values: [0.126, 0.138, 0.15, 0.162, 0.174, 0.186, 0.198, 0.21]
	},
	[CombatAttribute.EnergyRegen]: {
		attribute: CombatAttribute.EnergyRegen,
		values: [0.068, 0.076, 0.084, 0.092, 0.1, 0.108, 0.116, 0.124]
	},
	[AttackDMGBonus.Basic]: {
		attribute: AttackDMGBonus.Basic,
		values: [0.064, 0.071, 0.079, 0.086, 0.094, 0.101, 0.109, 0.116]
	},
	[AttackDMGBonus.Heavy]: {
		attribute: AttackDMGBonus.Heavy,
		values: [0.064, 0.071, 0.079, 0.086, 0.094, 0.101, 0.109, 0.116]
	},
	[AttackDMGBonus.Skill]: {
		attribute: AttackDMGBonus.Skill,
		values: [0.064, 0.071, 0.079, 0.086, 0.094, 0.101, 0.109, 0.116]
	},
	[AttackDMGBonus.Liberation]: {
		attribute: AttackDMGBonus.Liberation,
		values: [0.064, 0.071, 0.079, 0.086, 0.094, 0.101, 0.109, 0.116]
	}
} as const;
