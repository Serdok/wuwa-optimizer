import type { BuffDef, BuffSchema } from '$lib/data/optimizer/types';
import type { SonataInit } from '$lib/data/sonatas/types';
import { SonataBuilder } from '$lib/data/sonatas/builder';

import image from './T_IconElementAttriWindErrorA.png';

const init = {
	key: 'windward_pilgrimage',
	image,
} as const satisfies SonataInit;

const effects = [2, 5] as const;

const buffs = {
	aero_erosion: { key: 'aero_erosion', kind: 'toggle' },
} as const satisfies BuffSchema<BuffDef>;

const data = SonataBuilder.create(init, effects, buffs)
	.set_effect_for(2, stats => stats.aero_bonus += 0.1)
	.set_effect_for(5, (stats, { buffs }) => {
		if (buffs.aero_erosion) {
			stats.crit_rate += 0.1;
			stats.aero_bonus += 0.3;
		}
	})
  .build();

export { data as windward_pilgrimage };
