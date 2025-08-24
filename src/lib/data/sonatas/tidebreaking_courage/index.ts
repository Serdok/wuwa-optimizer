import type { BuffDef, BuffSchema } from '$lib/data/optimizer/types';
import type { SonataInit } from '$lib/data/sonatas/types';
import { SonataBuilder } from '$lib/data/sonatas/builder';

import image from './T_IconElementAttriEnergy.png';

const init = {
	key: 'tidebreaking_courage',
	image,
} as const satisfies SonataInit;

const effects = [2, 5] as const;

const buffs = {
} as const satisfies BuffSchema<BuffDef>;

const data = SonataBuilder.create(init, effects, buffs)
	.set_effect_for(2, stats => stats.energy_regen += 0.1)
	.set_effect_for(5, stats => {
		stats.atk_p += 0.15;
		if (stats.energy_regen >= 2.5) stats.general_bonus += 0.3;
	})
  .build();

export { data as tidebreaking_courage };
