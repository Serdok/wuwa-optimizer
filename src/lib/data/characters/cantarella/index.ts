import type { RankedBuffDef } from '$lib/data/optimizer/types';
import type { CharacterInit } from '$lib/data/characters/types';
import { CharacterBuilder } from '$lib/data/characters/builder';

import { normal } from './normal';
import { skill } from './skill';
import { forte } from './forte';
import { burst, diffusion_s5 } from './burst';
import { intro } from './intro';
import { outro } from './outro';

import portrait from './T_IconRole_Pile_kanteleila_UI.png';
import { stat_bonus_atk_p, stat_bonus_crit_rate } from '$lib/data/stats/utils';
import { create_schema_from_array, deep_clone } from '$lib/utils';

const init = {
	key: 'cantarella',
  weapon_type: 'rectifier',
  base_element: 'havoc',
  base_stats: {
    'hp': { stat: 'hp', value: 928, },
    'atk': { stat: 'atk', value: 32, },
    'def': { stat: 'def', value: 90, },
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
	{ key: 'poison', kind: 'slider', rank: 0, min_value: 0, max_value: 2, },
	{ key: 'flowing_suffocation', kind: 'toggle', rank: 0, },
] as const satisfies RankedBuffDef[];

const data = CharacterBuilder.create(init, create_schema_from_array(buffs, 'key'))
  // character
	.set_effect((stats, { buffs }) => {
		stats.havoc_bonus += 0.06 * buffs.poison;
		if (buffs.flowing_suffocation) stats.enemy_def_ignore += 0.3;
	})
	.set_rank_effect((base, rank) => {
		if (rank < 5) return base;

		const updated = deep_clone(base);
		updated.skills.burst.motions = base.skills.burst.motions.map(m => m.key === diffusion_s5.key ? diffusion_s5 : m);
		return updated;
	})
  // normal
  .set_skill_key('normal', 'illusion_collapse')
  .set_skill_motions('normal', normal)
  // skill
  .set_skill_key('skill', 'dance_with_shadows')
  .set_skill_motions('skill', skill)
	.set_motion_effect('skill', 'graceful_step_dmg', (stats, { rank }) => {
		if (rank >= 1) stats.skill_multiplier += 0.5;
	})
	.set_motion_effect('skill', 'flickering_reverie_dmg', (stats, { rank }) => {
		if (rank >= 1) stats.skill_multiplier += 0.5;
	})
	.set_motion_effect('skill', 'jolt_dmg', (stats, { rank }) => {
		if (rank >= 2) stats.skill_multiplier += 2.45;
	})
  // forte
  .set_skill_key('forte', 'between_illusion_and_reality')
  .set_skill_motions('forte', forte)
	.set_motion_effect('forte', 'phantom_sting_stage_1_dmg', (stats, { rank }) => {
		if (rank >= 6) stats.skill_multiplier += 0.8;
	})
	.set_motion_effect('forte', 'phantom_sting_stage_2_dmg', (stats, { rank }) => {
		if (rank >= 6) stats.skill_multiplier += 0.8;
	})
	.set_motion_effect('forte', 'phantom_sting_stage_3_dmg', (stats, { rank }) => {
		if (rank >= 6) stats.skill_multiplier += 0.8;
	})
	.set_motion_effect('forte', 'perception_drain_dmg', (stats, { rank }) => {
		if (rank >= 1) stats.skill_multiplier += 0.5;
	})
  // burst
  .set_skill_key('burst', 'beneath_the_sea')
  .set_skill_motions('burst', burst)
	.set_motion_effect('burst', 'flowing_suffocation_dmg', (stats, { rank }) => {
		if (rank >= 3) stats.skill_multiplier += 3.7;
	})
  // intro
  .set_skill_key('intro', 'cruise')
  .set_skill_motions('intro', intro)
  // outro
  .set_skill_key('outro', 'gentle_tentacles')
  .set_skill_motions('outro', outro)
  // finalize
  .build();

export { data as cantarella };
