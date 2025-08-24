import type { RankedBuffDef } from '$lib/data/optimizer/types';
import type { CharacterInit } from '$lib/data/characters/types';
import { CharacterBuilder } from '$lib/data/characters/builder';

import { normal } from './normal';
import { skill } from './skill';
import { forte } from './forte';
import { burst } from './burst';
import { intro } from './intro';
import { outro } from './outro';

import portrait from './T_IconRole_Pile_katixiya_UI.png';
import { stat_bonus_crit_rate, stat_bonus_hp_p } from '$lib/data/stats/utils';
import { create_schema_from_array } from '$lib/utils';

const init = {
	key: 'cartethyia',
  weapon_type: 'sword',
  base_element: 'aero',
  base_stats: {
    'hp': { stat: 'hp', value: 1184, },
    'atk': { stat: 'atk', value: 25, },
    'def': { stat: 'def', value: 50, },
  },
  stat_bonus: [
		...stat_bonus_hp_p(),
		...stat_bonus_crit_rate(),
		...stat_bonus_hp_p(),
		...stat_bonus_crit_rate(),
	],
  image: { portrait },
} as const satisfies CharacterInit;

const buffs = [
	{ key: 'manifest', kind: 'toggle', rank: 0 },
	{ key: 'mandate_of_divinity', kind: 'toggle', rank: 0, },
	{ key: 'aero_erosion', kind: 'slider', rank: 0, min_value: 0, max_value: 6, },
	{ key: 'conviction', kind: 'slider', rank: 1, min_value: 0, max_value: 4, },
	{ key: 'debuff_effect', kind: 'toggle', rank: 4, },
] as const satisfies RankedBuffDef[];

const data = CharacterBuilder.create(init, create_schema_from_array(buffs, 'key'))
  // character
	.set_effect((stats, { buffs, rank }) => {
		if (buffs.manifest) {
			if (buffs.mandate_of_divinity) stats.aero_erosion_amplify += 0.5;
			stats.crit_dmg += 0.25 * Math.min(buffs.conviction, 4);
		}

		if (buffs.aero_erosion > 0) stats.enemy_damage_vulnerability += 0.3;
		if (buffs.aero_erosion >= 3) stats.enemy_damage_vulnerability += 0.1 * Math.min(buffs.aero_erosion - 3, 3);

		if (buffs.debuff_effect) stats.general_bonus += 0.2;

		if (rank >= 6) stats.enemy_damage_vulnerability += 0.4;
	})
  // normal
  .set_skill_key('normal', 'sword_to_carve_my_forms')
  .set_skill_motions('normal', normal)
	.set_motion_effect('normal', 'stage_1_dmg', (stats, { rank }) => {
		if (rank >= 2) stats.skill_multiplier += 0.5;
	})
	.set_motion_effect('normal', 'stage_2_dmg', (stats, { rank }) => {
		if (rank >= 2) stats.skill_multiplier += 0.5;
	})
	.set_motion_effect('normal', 'stage_3_dmg', (stats, { rank }) => {
		if (rank >= 2) stats.skill_multiplier += 0.5;
	})
	.set_motion_effect('normal', 'stage_4_dmg', (stats, { rank }) => {
		if (rank >= 2) stats.skill_multiplier += 0.5;
	})
	.set_motion_effect('normal', 'dodge_counter_dmg', (stats, { rank }) => {
		if (rank >= 2) stats.skill_multiplier += 0.5;
	})
	.set_motion_effect('normal', 'heavy_attack_dmg', (stats, { rank }) => {
		if (rank >= 2) stats.skill_multiplier += 0.5;
	})
	.set_motion_effect('normal', 'mid_air_attack', (stats, { rank }) => {
		if (rank >= 2) stats.skill_multiplier += 2;
	})
	.set_motion_effect('normal', 'mid_air_attack_1_sword_shadow_recalled', (stats, { rank }) => {
		if (rank >= 2) stats.skill_multiplier += 2;
	})
	.set_motion_effect('normal', 'mid_air_attack_2_sword_shadow_recalled', (stats, { rank }) => {
		if (rank >= 2) stats.skill_multiplier += 2;
	})
	.set_motion_effect('normal', 'mid_air_attack_3_sword_shadow_recalled', (stats, { rank }) => {
		if (rank >= 2) stats.skill_multiplier += 2;
	})
  // skill
  .set_skill_key('skill', 'sword_to_bear_their_names')
  .set_skill_motions('skill', skill)
  // forte
  .set_skill_key('forte', 'tempest')
  .set_skill_motions('forte', forte)
  // burst
  .set_skill_key('burst', 'a_knights_heartfelt_prayers')
  .set_skill_motions('burst', burst)
	.set_motion_effect('burst', 'blade_of_howling_squall_dmg', (stats, { buffs, rank }) => {
		// fixme: is it enemy damage amplify?
		stats.general_amplify += 0.2 * Math.min(5, buffs.aero_erosion);

		if (rank >= 3) stats.skill_multiplier += 1;
	})
  // intro
  .set_skill_key('intro', 'sword_to_mark_tides_trace')
  .set_skill_motions('intro', intro)
  // outro
  .set_skill_key('outro', 'winds_divine_blessing')
  .set_skill_motions('outro', outro)
  // finalize
  .build();

export { data as cartethyia };
