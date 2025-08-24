import type { RankedBuffDef } from '$lib/data/optimizer/types';
import type { CharacterInit } from '$lib/data/characters/types';
import { CharacterBuilder } from '$lib/data/characters/builder';

import { normal } from './normal';
import { skill } from './skill';
import { forte } from './forte';
import { burst } from './burst';
import { intro } from './intro';
import { outro } from './outro';

import portrait from './T_IconRole_Pile_Feibi_UI.png';
import { create_schema_from_array } from '$lib/utils';
import { stat_bonus_atk_p, stat_bonus_crit_dmg } from '$lib/data/stats/utils';

const init = {
	key: 'phoebe',
  weapon_type: 'rectifier',
  base_element: 'spectro',
  base_stats: {
    hp: { stat: 'hp', value: 866, },
    atk: { stat: 'atk', value: 33, },
    def: { stat: 'def', value: 103, },
  },
  stat_bonus: [
		...stat_bonus_crit_dmg(),
		...stat_bonus_atk_p(),
		...stat_bonus_crit_dmg(),
		...stat_bonus_atk_p(),
	],
  image: { portrait },
} as const satisfies CharacterInit;

const buffs = [
	{ key: 'spectro_frazzle', kind: 'toggle', rank: 0, },
	{ key: 'absolution', kind: 'toggle', rank: 0, },
	{ key: 'confession', kind: 'toggle', rank: 0, },
	{ key: 'ring_of_mirrors', kind: 'toggle', rank: 6, },
] as const satisfies RankedBuffDef[];

const data = CharacterBuilder.create(init, create_schema_from_array(buffs, 'key'))
  // character
	.set_effect((stats, { buffs }) => {
		if (buffs.absolution || buffs.confession) stats.spectro_bonus += 0.12;
		if (buffs.ring_of_mirrors) stats.atk_p += 0.1;
	})
  // normal
  .set_skill_key('normal', 'o_come_divine_light')
  .set_skill_motions('normal', normal)
	.set_skill_effect('normal', (stats, { rank }) => {
		if (rank >= 4) stats.enemy_resistance -= 0.1;
	})
  // skill
  .set_skill_key('skill', 'to_where_light_shines')
  .set_skill_motions('skill', skill)
  // forte
  .set_skill_key('forte', 'radiant_invocation')
  .set_skill_motions('forte', forte)
	.set_motion_effect('forte', 'heavy_attack_starflash_dmg', (stats, { buffs, rank }) => {
		if (buffs.spectro_frazzle) stats.general_amplify += 2.56;
		if (rank >= 3) {
			if (buffs.absolution) stats.skill_multiplier += 0.91;
			if (buffs.confession) stats.skill_multiplier += 2.49;
		}
	})
  // burst
  .set_skill_key('burst', 'dawn_of_enlightenment')
  .set_skill_motions('burst', burst)
	.set_skill_effect('burst', (stats, { buffs, rank }) => {
		let multiplier = 2.55;
		if (rank >= 1) multiplier += 4.8;
		if (buffs.absolution) stats.skill_multiplier += multiplier;
		if (rank >= 1 && buffs.confession) stats.skill_multiplier += 0.9;
	})
  // intro
  .set_skill_key('intro', 'golden_grace')
  .set_skill_motions('intro', intro)
	.set_skill_effect('intro', (stats, { rank }) => {
		if (rank >= 5) stats.spectro_bonus += 0.12;
	})
  // outro
  .set_skill_key('outro', 'attentive_heart')
  .set_skill_motions('outro', outro)
	.set_skill_effect('outro', (stats, { buffs, rank }) => {
		if (buffs.absolution) stats.skill_multiplier += 2.55;
		if (rank >= 2 && buffs.absolution) stats.general_amplify += 1.2;
 	})
  // finalize
  .build();

export { data as phoebe };
