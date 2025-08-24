import type { RankedBuffDef } from '$lib/data/optimizer/types';
import type { CharacterInit } from '$lib/data/characters/types';
import { CharacterBuilder } from '$lib/data/characters/builder';

import { normal } from './normal';
import { skill } from './skill';
import { forte } from './forte';
import { burst } from './burst';
import { intro } from './intro';
import { outro } from './outro';

import portrait from './T_IconRole_Pile_jinxi_UI.png';
import { stat_bonus_atk_p, stat_bonus_crit_rate } from '$lib/data/stats/utils';
import { create_schema_from_array } from '$lib/utils';

const init = {
	key: 'jinhsi',
  weapon_type: 'broadsword',
  base_element: 'spectro',
  base_stats: {
    hp: { stat: 'hp', value: 866, },
    atk: { stat: 'atk', value: 33, },
    def: { stat: 'def', value: 103, },
  },
  stat_bonus: [
		...stat_bonus_crit_rate(),
		...stat_bonus_atk_p(),
		...stat_bonus_crit_rate(),
		...stat_bonus_atk_p(),
	],
  image: { portrait },
} as const satisfies CharacterInit;

const arr = [
	{ key: 'incandescence', kind: 'slider', rank: 0, min_value: 0, max_value: 50, },
	{ key: 'herald_of_revival', kind: 'slider', rank: 1, min_value: 0, max_value: 4, },
	{ key: 'immortal_s_descendancy', kind: 'slider', rank: 3, min_value: 0, max_value: 2, },
	{ key: 'benevolent_grace', kind: 'toggle', rank: 3, },
] as const satisfies RankedBuffDef[];

const data = CharacterBuilder.create(init, create_schema_from_array(arr, 'key'))
  // character
	.set_effect((stats, { buffs }) => {
		stats.spectro_bonus += 0.2;
		stats.atk_p += 0.25 * buffs.immortal_s_descendancy;
		if (buffs.benevolent_grace) stats.general_bonus += 0.2;
	})

  // normal
  .set_skill_key('normal', 'slash_of_breaking_dawn')
  .set_skill_motions('normal', normal)
  // skill
  .set_skill_key('skill', 'trailing_lights_of_eons')
  .set_skill_motions('skill', skill)
  // forte
  .set_skill_key('forte', 'luminal_synthesis')
  .set_skill_motions('forte', forte)
	.set_motion_effect('forte', 'illuminous_epiphany_solar_flare_dmg', (stats, { buffs, rank }) => {
		stats.skill_bonus += 0.2 * buffs.herald_of_revival;
		if (rank >= 6) stats.skill_multiplier += 0.45;
	})
	.set_motion_effect('forte', 'illuminous_epiphany_stella_glamor_dmg', (stats, { buffs, rank }) => {
		let incandescence = 0.4454;
		if (rank >= 6) {
			incandescence += 0.45;
			stats.skill_multiplier += 0.45;
		}

		stats.skill_multiplier += incandescence * buffs.incandescence;
		stats.skill_bonus += 0.2 * buffs.herald_of_revival;
	})
  // burst
  .set_skill_key('burst', 'purge_of_light')
  .set_skill_motions('burst', burst)
	.set_skill_effect('burst', stats => {
		stats.skill_multiplier += 1.2;
	})
  // intro
  .set_skill_key('intro', 'loong_s_halo')
  .set_skill_motions('intro', intro)
	.set_skill_effect('intro', stats => {
		stats.skill_multiplier += 0.5;
	})
  // outro
  .set_skill_key('outro', 'temporal_bender')
  .set_skill_motions('outro', outro)
  // finalize
  .build();

export { data as jinhsi };
