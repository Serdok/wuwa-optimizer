import type { BuffDef, BuffSchema } from '$lib/data/optimizer/types';
import type { SonataInit } from '$lib/data/sonatas/types';
import { SonataBuilder } from '$lib/data/sonatas/builder';

import image from './T_IconElementAttriAttack.png';

const init = {
	key: 'lingering_tunes',
	image,
} as const satisfies SonataInit;

const effects = [2, 5] as const;

const buffs = {
	on_field: { key: 'on_field', kind: 'slider', min_value: 0, max_value: 4, },
} as const satisfies BuffSchema<BuffDef>;

const data = SonataBuilder.create(init, effects, buffs)
	.set_effect_for(2, stats => stats.atk_p += 0.1)
	.set_effect_for(5, (stats, { buffs }) => {
		stats.outro_bonus += 0.6;
		stats.atk_p += 0.05 * Math.min(4, buffs.on_field);
	})
  .build();

export { data as lingering_tunes };
