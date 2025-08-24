import type { BuffDef, BuffSchema } from '$lib/data/optimizer/types';
import type { SonataInit } from '$lib/data/sonatas/types';
import { SonataBuilder } from '$lib/data/sonatas/builder';

import image from './T_IconElementAttriWind.png';

const init = {
	key: 'sierra_gale',
	image,
} as const satisfies SonataInit;

const effects = [2, 5] as const;

const buffs = {
	intro_released: { key: 'intro_released', kind: 'toggle' },
} as const satisfies BuffSchema<BuffDef>;

const data = SonataBuilder.create(init, effects, buffs)
	.set_effect_for(2, stats => stats.aero_bonus += 0.1)
	.set_effect_for(5, (stats, { buffs }) => {
		if (buffs.intro_released) stats.aero_bonus += 0.3;
	})
  .build();

export { data as sierra_gale };
