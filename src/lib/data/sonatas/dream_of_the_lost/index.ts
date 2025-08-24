import type { BuffDef, BuffSchema } from '$lib/data/optimizer/types';
import type { SonataInit } from '$lib/data/sonatas/types';
import { SonataBuilder } from '$lib/data/sonatas/builder';

import image from './T_IconElementAttriDarkVision.png';

const init = {
	key: 'dream_of_the_lost',
	image,
} as const satisfies SonataInit;

const effects = [3] as const;

const buffs = {
	no_energy: { key: 'no_energy', kind: 'toggle' },
} as const satisfies BuffSchema<BuffDef>;

const data = SonataBuilder.create(init, effects, buffs)
	.set_effect_for(3, (stats, { buffs }) => {
		if (buffs.no_energy) {
			stats.crit_rate += 0.2;
			stats.echo_skill += 0.35;
		}
	})
  .build();

export { data as dream_of_the_lost };
