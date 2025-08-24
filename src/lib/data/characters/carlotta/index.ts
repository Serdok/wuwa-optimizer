import type { RankedBuffDef } from '$lib/data/optimizer/types';
import type { CharacterInit } from '$lib/data/characters/types';
import { CharacterBuilder } from '$lib/data/characters/builder';

import { normal } from './normal';
import { skill } from './skill';
import { forte } from './forte';
import { burst } from './burst';
import { intro } from './intro';
import { kaleidoscope_sparks_s3, outro } from './outro';

import portrait from './T_IconRole_Pile_kelaita_UI.png';
import { stat_bonus_atk_p, stat_bonus_crit_rate } from '$lib/data/stats/utils';
import { create_schema_from_array, deep_clone } from '$lib/utils';

const init = {
	key: 'carlotta',
  weapon_type: 'pistol',
  base_element: 'glacio',
  base_stats: {
    hp: { stat: 'hp', value: 996, },
    atk: { stat: 'atk', value: 37, },
    def: { stat: 'def', value: 98, },
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
	{ key: 'final_bow', kind: 'toggle', rank: 0, },
	{ key: 'deconstruction', kind: 'toggle', rank: 0, },
	{ key: 'yesterday_s_raindrops_make_finest_wine', kind: 'toggle', rank: 4, },
] as const satisfies RankedBuffDef[];

const data = CharacterBuilder.create(init, create_schema_from_array(buffs, 'key'))
  // character
	.set_effect((stats, { buffs, rank }) => {
		if (buffs.deconstruction) {
			stats.enemy_def_ignore += 0.18;
			if (rank >= 1) stats.crit_rate += 0.125;
		}

		if (buffs.yesterday_s_raindrops_make_finest_wine) stats.skill_bonus += 0.25;
	})
	.set_rank_effect((base, rank) => {
		if (rank < 3) return base;

		const updated = deep_clone(base);
		updated.skills.outro.motions = base.skills.outro.motions.concat(kaleidoscope_sparks_s3);
		return updated;
	})
  // normal
  .set_skill_key('normal', 'silent_execution')
  .set_skill_motions('normal', normal)
  // skill
  .set_skill_key('skill', 'art_of_violence')
  .set_skill_motions('skill', skill)
	.set_skill_effect('skill', (stats, { rank }) => {
		if (rank >= 3) stats.skill_multiplier += 0.93;
	})
  // forte
  .set_skill_key('forte', 'lethal_repertoire')
  .set_skill_motions('forte', forte)
	.set_motion_effect('forte', 'imminent_oblivion', (stats, { rank }) => {
		if (rank >= 5) stats.skill_multiplier += 0.47;
	})
  // burst
  .set_skill_key('burst', 'era_of_new_wave')
  .set_skill_motions('burst', burst)
	.set_skill_effect('burst', (stats, { buffs }) => {
		if (buffs.final_bow) stats.skill_multiplier += 0.8;
	})
	.set_motion_effect('burst', 'death_knell_dmg', (stats, { rank }) => {
		if (rank >= 6) stats.skill_multiplier += 1.866;
	})
	.set_motion_effect('burst', 'fatal_finale_dmg', (stats, { rank }) => {
		if (rank >= 2) stats.skill_multiplier += 1.26;
	})
  // intro
  .set_skill_key('intro', 'wintertime_aria')
  .set_skill_motions('intro', intro)
  // outro
  .set_skill_key('outro', 'closing_remark')
  .set_skill_motions('outro', outro)
  // finalize
  .build();

export { data as carlotta };
