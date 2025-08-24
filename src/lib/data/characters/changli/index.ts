import type { RankedBuffDef } from '$lib/data/optimizer/types';
import type { CharacterInit } from '$lib/data/characters/types';
import { CharacterBuilder } from '$lib/data/characters/builder';

import { normal } from './normal';
import { skill } from './skill';
import { forte } from './forte';
import { burst } from './burst';
import { intro } from './intro';
import { outro } from './outro';

import portrait from './T_IconRole_Pile_changli_UI.png';
import { stat_bonus_atk_p, stat_bonus_crit_rate } from '$lib/data/stats/utils';
import { create_schema_from_array } from '$lib/utils';

const init = {
	key: 'changli',
  weapon_type: 'sword',
  base_element: 'fusion',
  base_stats: {
    hp: { stat: 'hp', value: 831, },
    atk: { stat: 'atk', value: 37, },
    def: { stat: 'def', value: 90, },
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
	{ key: 'enflamement', kind: 'slider', rank: 0, min_value: 0, max_value: 4, },
	{ key: 'fiery_feather', kind: 'toggle', rank: 0, },
	{ key: 'polished_words', kind: 'toggle', rank: 4, },
] as const satisfies RankedBuffDef[];

const data = CharacterBuilder.create(init, create_schema_from_array(buffs, 'key'))
  // character
	.set_effect((stats, { buffs, rank }) => {
		if (buffs.fiery_feather) stats.atk_p += 0.25;
		if (rank >= 2 && buffs.enflamement > 0) stats.crit_rate += 0.25;
		if (buffs.polished_words) stats.atk_p += 0.2;
	})
  // normal
  .set_skill_key('normal', 'blazing_enlightment')
  .set_skill_motions('normal', normal)
  // skill
  .set_skill_key('skill', 'tripartite_flames')
  .set_skill_motions('skill', skill)
	.set_skill_effect('skill', (stats, { rank }) => {
		if (rank >= 1) stats.general_bonus += 0.1;
		if (rank >= 6) stats.enemy_def_ignore += 0.4;
	})
	.set_motion_effect('skill', 'true_sight_conquest_dmg', (stats, { buffs }) => {
		stats.fusion_bonus += 0.05 * buffs.enflamement;
	})
	.set_motion_effect('skill', 'true_sight_charge_dmg', (stats, { buffs }) => {
		stats.fusion_bonus += 0.05 * buffs.enflamement;
	})
  // forte
  .set_skill_key('forte', 'flaming_sacrifice')
  .set_skill_motions('forte', forte)
	.set_skill_effect('forte', (stats, { rank }) => {
		if (rank >= 1) stats.general_bonus += 0.1;
		if (rank >= 4) {
			stats.skill_multiplier += 0.5;
			stats.skill_bonus += 0.5;
		}
		if (rank >= 6) stats.enemy_def_ignore += 0.4;
	})
	.set_motion_effect('forte', 'flaming_sacrifice_dmg', stats => {
		stats.fusion_bonus += 0.2;
		stats.enemy_def_ignore += 0.15;
	})
  // burst
  .set_skill_key('burst', 'radiance_of_fealty')
  .set_skill_motions('burst', burst)
	.set_skill_effect('burst', (stats, { rank }) => {
		if (rank >= 3) stats.burst_bonus += 0.8;
		if (rank >= 6) stats.enemy_def_ignore += 0.4;
	})
	.set_motion_effect('burst', 'skill_dmg', stats => {
		stats.fusion_bonus += 0.2;
		stats.enemy_def_ignore += 0.15;
	})
  // intro
  .set_skill_key('intro', 'obedience_of_rules')
  .set_skill_motions('intro', intro)
  // outro
  .set_skill_key('outro', 'strategy_of_duality')
  .set_skill_motions('outro', outro)
  // finalize
  .build();

export { data as changli };
