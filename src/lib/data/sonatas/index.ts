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
import windward_pilgrimage from './T_IconElementAttriWindErrorA.png';
import flaming_clawprint from './T_IconElementAttriFireUltimateSkill.png';
import dream_of_the_lost from './T_IconElementAttriDarkVision.png';

import type { Buff, OptimizerContext, OptimizerInput } from '$lib/optimizer';
import type { StatKey } from '$lib/data/stats';


export type SonataData = {
	key: string;
	image: string;
	buffs: Record<string, Buff>;
	piece_effects: number[];
	apply_effects: (input: OptimizerInput, combat_stats: Record<StatKey, number>, context: OptimizerContext) => void;
};

export const SONATA_DATA: Record<string, SonataData> = {
	freezing_frost: {
		key: 'freezing_frost',
		image: freezing_frost,
		buffs: {
			'basic_released': {
				key: 'basic_released',
				kind: 'slider',
				value: 3,
				min_value: 0,
				max_value: 3,
			},
			'heavy_released': {
				key: 'heavy_released',
				kind: 'slider',
				value: 3,
				min_value: 0,
				max_value: 3,
			},
		},
		piece_effects: [2, 5],
		apply_effects: (input, combat_stats, context) => {
			const echo_count = context.build.filter(e => e.sonata === 'freezing_frost').length;

			if (echo_count >= 2)
				combat_stats.glacio_bonus += 0.1;

			if (echo_count >= 5) {
				const { basic_released = 0, heavy_released = 0 } = input.echo.buffs.freezing_frost;
				combat_stats.glacio_bonus += 0.1 * Math.min(3, basic_released + heavy_released);
			}
		}
	},
	molten_rift: {
		key: 'molten_rift',
		image: molten_rift,
		buffs: {
			skill_released: {
				key: 'skill_released',
				kind: 'switch',
				value: 1,
			}
		},
		piece_effects: [2, 5],
		apply_effects: (input, combat_stats, context) => {
			const echo_count = context.build.filter(e => e.sonata === 'freezing_frost').length;

			if (echo_count >= 2)
				combat_stats.fusion_bonus += 0.1;

			if (echo_count >= 5) {
				const { skill_released = 0 } = input.echo.buffs.molten_rift;
				combat_stats.fusion_bonus += 0.3 * skill_released;
			}
		}
	},
	void_thunder: {
		key: 'void_thunder',
		image: void_thunder,
		buffs: {
			heavy_released: {
				key: 'heavy_released',
				kind: 'slider',
				value: 2,
				min_value: 0,
				max_value: 2,
			},
			skill_released: {
				key: 'skill_released',
				kind: 'slider',
				value: 2,
				min_value: 0,
				max_value: 2,
			}
		},
		piece_effects: [2, 5],
		apply_effects: (input, combat_stats, context) => {
			const echo_count = context.build.filter(e => e.sonata === 'freezing_frost').length;

			if (echo_count >= 2)
				combat_stats.electro_bonus += 0.1;

			if (echo_count >= 5) {
				const { heavy_released = 0, skill_released = 0 } = input.echo.buffs.void_thunder;
				combat_stats.electro_bonus += 0.15 * Math.min(2, heavy_released + skill_released);
			}

			combat_stats.electro_bonus += 0.1;
		}
	},
	sierra_gale: {
		key: 'sierra_gale',
		image: sierra_gale,
		buffs: {
			intro_released: {
				key: 'intro_released',
				kind: 'switch',
				value: 1,
			}
		},
		piece_effects: [2, 5],
		apply_effects: (input, combat_stats, context) => {
			const echo_count = context.build.filter(e => e.sonata === 'sierra_gale').length;

			if (echo_count >= 2)
				combat_stats.aero_bonus += 0.1;

			if (echo_count >= 5) {
				const { intro_released = 0 } = input.echo.buffs.sierra_gale;
				combat_stats.aero_bonus += 0.3 * intro_released;
			}
		}
	},
	celestial_light: {
		key: 'celestial_light',
		image: celestial_light,
		buffs: {
			intro_released: {
				key: 'intro_released',
				kind: 'switch',
				value: 1,
			}
		},
		piece_effects: [2, 5],
		apply_effects: (input, combat_stats, context) => {
			const echo_count = context.build.filter(e => e.sonata === 'celestial_light').length;

			if (echo_count >= 2)
				combat_stats.spectro_bonus += 0.1;

			if (echo_count >= 5) {
				const { intro_released = 0 } = input.echo.buffs.celestial_light;
				combat_stats.spectro_bonus += 0.3 * intro_released;
			}

			combat_stats.spectro_bonus += 0.1;
		}
	},
	sun_sinking_eclipse: {
		key: 'sun_sinking_eclipse',
		image: sun_sinking_eclipse,
		buffs: {
			basic_released: {
				key: 'basic_released',
				kind: 'slider',
				value: 4,
				min_value: 0,
				max_value: 4,
			},
			heavy_released: {
				key: 'heavy_released',
				kind: 'slider',
				value: 4,
				min_value: 0,
				max_value: 4,
			}
		},
		piece_effects: [2, 5],
		apply_effects: (input, combat_stats, context) => {
			const echo_count = context.build.filter(e => e.sonata === 'sun_sinking_eclipse').length;

			if (echo_count >= 2)
				combat_stats.havoc_bonus += 0.1;

			if (echo_count >= 5) {
				const { basic_released = 0, heavy_released = 0 } = input.echo.buffs.sun_sinking_eclipse;
				combat_stats.havoc_bonus += 0.075 * Math.min(4, basic_released + heavy_released);
			}
		}
	},
	rejuvenating_glow: {
		key: 'rejuvenating_glow',
		image: rejuvenating_glow,
		buffs: {
			healing_allies: {
				key: 'healing_allies',
				kind: 'switch',
				value: 1,
			}
		},
		piece_effects: [2, 5],
		apply_effects: (input, combat_stats, context) => {
			const echo_count = context.build.filter(e => e.sonata === 'rejuvenating_glow').length;

			if (echo_count >= 2)
				combat_stats.healing_bonus += 0.1;

			if (echo_count >= 5) {
				const { healing_allies = 0 } = input.echo.buffs.rejuvenating_glow;
				combat_stats.atk_p += 0.15 * healing_allies;
				// todo: +15% ATK for all party members
			}

			combat_stats.healing_bonus += 0.1;
		}
	},
	moonlit_clouds: {
		key: 'moonlit_clouds',
		image: moonlit_clouds,
		buffs: {
			outro_released: {
				key: 'outro_released',
				kind: 'switch',
				value: 1
			}
		},
		piece_effects: [2, 5],
		apply_effects: (input, combat_stats, context) => {
			const echo_count = context.build.filter(e => e.sonata === 'moonlit_clouds').length;

			if (echo_count >= 2)
				combat_stats.energy_regen += 0.1;

			if (echo_count >= 5) {
				const { outro_released = 0 } = input.echo.buffs.moonlit_clouds;
				// todo: +22.5% ATK for the next character
			}

			combat_stats.energy_regen += 0.1;
		}
	},
	lingering_tunes: {
		key: 'lingering_tunes',
		image: lingering_tunes,
		buffs: {
			on_field: {
				key: 'on_field',
				kind: 'slider',
				value: 4,
				min_value: 0,
				max_value: 4,
			}
		},
		piece_effects: [2, 5],
		apply_effects: (input, combat_stats, context) => {
			const echo_count = context.build.filter(e => e.sonata === 'lingering_tunes').length;

			if (echo_count >= 2)
				combat_stats.atk_p += 0.1;

			if (echo_count >= 5) {
				const { on_field = 0 } = input.echo.buffs.lingering_tunes;
				combat_stats.atk_p += 0.05 * Math.min(4, on_field);
				combat_stats.outro_bonus += 0.6;
			}
		}
	},
	frosty_resolve: {
		key: 'frosty_resolve',
		image: frosty_resolve,
		buffs: {
			skill_released: {
				key: 'skill_released',
				kind: 'slider',
				value: 2,
				min_value: 0,
				max_value: 2,
			},
			burst_released: {
				key: 'burst_released',
				kind: 'slider',
				value: 2,
				min_value: 0,
				max_value: 2,
			},
		},
		piece_effects: [2, 5],
		apply_effects: (input, combat_stats, context) => {
			const echo_count = context.build.filter(e => e.sonata === 'frosty_resolve').length;

			if (echo_count >= 2)
				combat_stats.skill_bonus += 0.12;

			if (echo_count >= 5) {
				const { skill_released = 0, burst_released = 0 } = input.echo.buffs.frosty_resolve;
				combat_stats.glacio_bonus += 0.225 * Math.min(2, skill_released);
				combat_stats.skill_bonus += 0.18 * Math.min(2, burst_released);
			}
		}
	},
	eternal_radiance: {
		key: 'eternal_radiance',
		image: eternal_radiance,
		buffs: {
			spectro_frazzle: {
				key: 'spectro_frazzle',
				kind: 'slider',
				value: 10,
				min_value: 0,
				max_value: 10
			}
		},
		piece_effects: [2, 5],
		apply_effects: (input, combat_stats, context) => {
			const echo_count = context.build.filter(e => e.sonata === 'eternal_radiance').length;

			if (echo_count >= 2)
				combat_stats.spectro_bonus += 0.1;

			if (echo_count >= 5) {
				const { spectro_frazzle = 0 } = input.echo.buffs.eternal_radiance;
				combat_stats.crit_rate += 0.2 * +(spectro_frazzle > 0);
				combat_stats.spectro_bonus += 0.15 * +(spectro_frazzle >= 10);
			}
		}
	},
	midnight_veil: {
		key: 'midnight_veil',
		image: midnight_veil,
		buffs: {
			outro_released: {
				key: 'outro_released',
				kind: 'switch',
				value: 1,
			}
		},
		piece_effects: [2, 5],
		apply_effects: (input, combat_stats, context) => {
			const echo_count = context.build.filter(e => e.sonata === 'midnight_veil').length;

			if (echo_count >= 2)
				combat_stats.havoc_bonus += 0.1;

			if (echo_count >= 5) {
				const { outro_released = 0 } = input.echo.buffs.midnight_veil;
				// todo: +15% havoc bonus for the next character

				context.character.skills.outro.motions.push({
					key: 'midnight_veil',
					type: ['outro'],
					element: ['havoc'],
					tags: [],
					related_stat: 'atk',
					values: [4.8],
					apply_effects: () => {}
				});
			}
		}
	},
	empyrean_anthem: {
		key: 'empyrean_anthem',
		image: empyrean_anthem,
		buffs: {
			coordinated_crit: {
				key: 'coordinated_crit',
				kind: 'switch',
				value: 1,
			}
		},
		piece_effects: [2, 5],
		apply_effects: (input, combat_stats, context) => {
			const echo_count = context.build.filter(e => e.sonata === 'empyrean_anthem').length;

			if (echo_count >= 2)
				combat_stats.energy_regen += 0.1;

			if (echo_count >= 5) {
				const { coordinated_crit = 0 } = input.echo.buffs.empyrean_anthem;
				combat_stats.coordinated_attack += 0.8;
				combat_stats.atk_p += 0.2 * coordinated_crit;
			}
		}
	},
	tidebreaking_courage: {
		key: 'tidebreaking_courage',
		image: tidebreaking_courage,
		buffs: {},
		piece_effects: [2, 5],
		apply_effects: (input, combat_stats, context) => {
			const echo_count = context.build.filter(e => e.sonata === 'tidebreaking_courage').length;

			if (echo_count >= 2)
				combat_stats.energy_regen += 0.1;

			if (echo_count >= 5) {
				combat_stats.atk_p += 0.15;
				if (combat_stats.energy_regen >= 2.5) {
					combat_stats.general_bonus += 0.3;
				}
			}
		}
	},
	gusts_of_welkin: {
		key: 'gusts_of_welkin',
		image: gusts_of_welkin,
		buffs: {
			aero_erosion: {
				key: 'aero_erosion',
				kind: 'switch',
				value: 1,
			}
		},
		piece_effects: [2, 5],
		apply_effects: (input, combat_stats, context) => {
			const echo_count = context.build.filter(e => e.sonata === 'gusts_of_welkin').length;

			if (echo_count >= 2)
				combat_stats.aero_bonus += 0.1;

			if (echo_count >= 5) {
				const { aero_erosion = 0 } = input.echo.buffs.gusts_of_welkin;
				// todo: +15% team aero bonus
				combat_stats.aero_bonus += 0.3 * aero_erosion;
			}
		}
	},
	windward_pilgrimage: {
		key: 'windward_pilgrimage',
		image: windward_pilgrimage,
		buffs: {
			aero_erosion: {
				key: 'aero_erosion',
				kind: 'switch',
				value: 1,
			}
		},
		piece_effects: [2, 5],
		apply_effects: (input, combat_stats, context) => {
			const echo_count = context.build.filter(e => e.sonata === 'windward_pilgrimage').length;

			if (echo_count >= 2) {
				combat_stats.aero_bonus += 0.1;
			}

			if (echo_count >= 5) {
				const { aero_erosion } = input.echo.buffs.windward_pilgrimage;
				combat_stats.crit_rate += 0.1 * aero_erosion;
				combat_stats.aero_bonus += 0.3 * aero_erosion;
			}
		},
	},
	flaming_clawprint: {
		key: 'flaming_clawprint',
		image: flaming_clawprint,
		buffs: {
			burst_released: {
				key: 'burst_released',
				kind: 'switch',
				value: 1,
			}
		},
		piece_effects: [2, 5],
		apply_effects: (input, combat_stats, context) => {
			const echo_count = context.build.filter(e => e.sonata === 'flaming_clawprint').length;

			if (echo_count >= 2) {
				combat_stats.fusion_bonus += 0.1;
			}

			if (echo_count >= 5) {
				const { burst_released } = input.echo.buffs.flaming_clawprint;
				// todo: +15% team fusion bonus
				combat_stats.fusion_bonus += 0.15 * burst_released;
				combat_stats.burst_bonus += 0.2 * burst_released;
			}
		},
	},
	dream_of_the_lost: {
		key: 'dream_of_the_lost',
		image: dream_of_the_lost,
		buffs: {
			no_energy: {
				key: 'no_energy',
				kind: 'switch',
				value: 1,
			}
		},
		piece_effects: [3],
		apply_effects: (input, combat_stats, context) => {
			const echo_count = context.build.filter(e => e.sonata === 'dream_of_the_lost').length;

			if (echo_count >= 3) {
				const { no_energy } = input.echo.buffs.dream_of_the_lost;
				if (no_energy) {
					combat_stats.crit_rate += 0.2;
					combat_stats.echo_skill += 0.35;
				}
			}
		},
	},
} as const;


export const SONATAS = Object.keys(SONATA_DATA) as (keyof typeof SONATA_DATA)[];
export type SonataKey = (typeof SONATAS)[number];

export type SonataBuff<T extends SonataKey> = {
	[K in keyof typeof SONATA_DATA[T]['buffs']]: number
};

