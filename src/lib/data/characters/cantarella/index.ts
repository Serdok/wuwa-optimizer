import type { RankedBuffDef } from '$lib/data/optimizer/types';
import type { CharacterInit } from '$lib/data/characters/types';
import { CharacterBuilder } from '$lib/data/characters/builder';

import { normal } from './normal';
import { skill } from './skill';
import { forte } from './forte';
import { burst } from './burst';
import { intro } from './intro';
import { outro } from './outro';

import portrait from './T_IconRole_Pile_kanteleila_UI.png';
import { stat_bonus_atk_p, stat_bonus_crit_rate } from '$lib/data/stats/utils';
import { create_schema_from_array } from '$lib/utils';

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
	{ key: 'flowing_suffocation', kind: 'toggle', rank: 6, },
] as const satisfies RankedBuffDef[];

const data = (rank: number) => {
	let builder = CharacterBuilder.create(init, create_schema_from_array(buffs, 'key'));

	// character
	builder = builder.set_effect((stats, { buffs }) => {
		stats.havoc_bonus += 0.06 * buffs.poison;
		if (buffs.flowing_suffocation) stats.enemy_def_ignore += 0.3;
	});

	// normal
	builder = builder.set_skill_key('normal', 'illusion_collapse')
		.set_skill_motions('normal', normal(rank));

		// skill
	builder = builder.set_skill_key('skill', 'dance_with_shadows')
	.set_skill_motions('skill', skill(rank));

	// forte
	builder = builder.set_skill_key('forte', 'between_illusion_and_reality')
		.set_skill_motions('forte', forte(rank));

	// burst
	builder = builder.set_skill_key('burst', 'beneath_the_sea')
		.set_skill_motions('burst', burst(rank));

	// intro
	builder = builder.set_skill_key('intro', 'cruise')
		.set_skill_motions('intro', intro(rank));

	// outro
	builder = builder.set_skill_key('outro', 'gentle_tentacles')
		.set_skill_motions('outro', outro(rank));

	// finalize
	return builder.build();
}

export { data as cantarella };
