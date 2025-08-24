import type { RankedBuffDef } from '$lib/data/optimizer/types';
import type { CharacterInit } from '$lib/data/characters/types';
import { CharacterBuilder } from '$lib/data/characters/builder';

import { normal } from './normal';
import { skill } from './skill';
import { forte } from './forte';
import { burst } from './burst';
import { intro } from './intro';
import { outro } from './outro';

import portrait from './T_IconRole_Pile_zanni_UI.png';
import { create_schema_from_array } from '$lib/utils';
import { stat_bonus_atk_p, stat_bonus_crit_rate } from '$lib/data/stats/utils';

const init = {
	key: 'zani',
  weapon_type: 'gauntlet',
  base_element: 'spectro',
  base_stats: {
    hp: { stat: 'hp', value: 862, },
    atk: { stat: 'atk', value: 35, },
    def: { stat: 'def', value: 93, },
  },
  stat_bonus: [
		...stat_bonus_crit_rate(),
		...stat_bonus_atk_p(),
		...stat_bonus_crit_rate(),
		...stat_bonus_atk_p(),
	],
  image: { portrait },
} as const satisfies CharacterInit;

const buffs = [
	{ key: 'sunburst', kind: 'toggle', rank: 0, },
	{ key: 'inferno_mode', kind: 'toggle', rank: 0, },
	{ key: 'nightfall_blaze_consumed', kind: 'slider', rank: 0, min_value: 0, max_value: 40, },
	{ key: 'immediate_execution', kind: 'toggle', rank: 0, },
	{ key: 'heliacal_ember', kind: 'slider', rank: 0, min_value: 0, max_value: 60, },
	{ key: 'total_blaze_consumed', kind: 'slider', rank: 3, min_value: 0, max_value: 150, },
] as const satisfies RankedBuffDef[];

const data = CharacterBuilder.create(init, create_schema_from_array(buffs, 'key'))
  // character
	.set_effect((stats, { buffs, rank }) => {
		if (buffs.sunburst) {
			stats.spectro_frazzle_amplify += 0.2;
			if (rank >= 1) stats.spectro_bonus += 0.5;
		}

		if (buffs.immediate_execution) {
			stats.spectro_bonus += 0.12;
			if (rank >= 4) stats.atk_p += 0.2;
		}

		if (rank >= 2) stats.crit_rate += 0.2;
	})

  // normal
  .set_skill_key('normal', 'routine_negotiation')
  .set_skill_motions('normal', normal)
  // skill
  .set_skill_key('skill', 'restless_watch')
  .set_skill_motions('skill', skill)
	.set_motion_effect('skill', 'targeted_action_dmg', (stats, { rank }) => {
		if (rank >= 2) stats.skill_multiplier += 0.8;
	})
	.set_motion_effect('skill', 'forcible_riposte_dmg', (stats, { rank }) => {
		if (rank >= 2) stats.skill_multiplier += 0.8;
	})
  // forte
  .set_skill_key('forte', 'there_will_be_a_light')
  .set_skill_motions('forte', forte)
	.set_skill_effect('forte', (stats, { buffs }) => {
		if (buffs.inferno_mode) stats.skill_multiplier += 0.25;
	})
	.set_motion_effect('forte', 'heavy_slash_daybreak_dmg', (stats, { rank }) => {
		if (rank >= 6) stats.skill_multiplier += 0.4;
	})
	.set_motion_effect('forte', 'heavy_slash_dawning_dmg', (stats, { rank }) => {
		if (rank >= 6) stats.skill_multiplier += 0.4;
	})
	.set_motion_effect('forte', 'heavy_slash_nightfall_dmg', (stats, { buffs, rank }) => {
		let multiplier = 0.095;
		if (rank >= 6) {
			multiplier += 0.4;
			stats.skill_multiplier += 0.4;
		}

		stats.skill_multiplier += multiplier * buffs.nightfall_blaze_consumed;
	})
  // burst
  .set_skill_key('burst', 'between_dawn_and_dusk')
  .set_skill_motions('burst', burst)
	.set_motion_effect('burst', 'rekindle_dmg', (stats, { rank }) => {
		if (rank >= 5) stats.skill_multiplier += 1.2;
	})
	.set_motion_effect('burst', 'the_last_stand_dmg', (stats, { buffs }) => {
		stats.skill_multiplier += Math.min(0.08 * buffs.total_blaze_consumed, 12);
	})
  // intro
  .set_skill_key('intro', 'immediate_execution')
  .set_skill_motions('intro', intro)
  // outro
  .set_skill_key('outro', 'beacon_for_the_future')
  .set_skill_motions('outro', outro)
	.set_motion_effect('outro', 'skill_dmg', (stats, { buffs }) => {
		stats.skill_multiplier += 0.1 * buffs.heliacal_ember;
	})
  // finalize
  .build();

export { data as zani };
