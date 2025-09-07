import type { RankedBuffDef } from '$lib/data/optimizer/types';
import type { CharacterInit } from '$lib/data/characters/types';
import { CharacterBuilder } from '$lib/data/characters/builder';

import { normal } from './normal';
import { skill } from './skill';
import { forte } from './forte';
import { burst } from './burst';
import { intro } from './intro';
import { outro } from './outro';

import portrait from './T_IconRole_Pile_kelaita_UI.png';
import { stat_bonus_atk_p, stat_bonus_crit_rate } from '$lib/data/stats/utils';
import { create_schema_from_array } from '$lib/utils';

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

const data = (rank: number) => {
	let builder = CharacterBuilder.create(init, create_schema_from_array(buffs, 'key'));

	// character
	builder = builder.set_effect((stats, { buffs }) => {
		if (buffs.deconstruction) {
			stats.enemy_def_ignore += 0.18;
			if (rank >= 1) stats.crit_rate += 0.125;
		}

		if (buffs.yesterday_s_raindrops_make_finest_wine) stats.skill_bonus += 0.25;
	});

	// normal
	builder = builder.set_skill_key('normal', 'silent_execution')
		.set_skill_motions('normal', normal(rank));

	// skill
	builder = builder.set_skill_key('skill', 'art_of_violence')
		.set_skill_motions('skill', skill(rank));

	// forte
	builder = builder.set_skill_key('forte', 'lethal_repertoire')
		.set_skill_motions('forte', forte(rank));

	// burst
	builder = builder.set_skill_key('burst', 'era_of_new_wave')
		.set_skill_motions('burst', burst(rank))
		.set_skill_effect('burst', (stats, { buffs }) => {
			if (buffs.final_bow) stats.skill_multiplier += 0.8;
		});

	// intro
	builder = builder.set_skill_key('intro', 'wintertime_aria')
		.set_skill_motions('intro', intro(rank));

	// outro
	builder = builder.set_skill_key('outro', 'closing_remark')
		.set_skill_motions('outro', outro(rank));

	// finalize
	return builder.build();
}

export { data as carlotta };
