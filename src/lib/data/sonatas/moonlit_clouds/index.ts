import type { BuffDef, BuffSchema } from '$lib/data/optimizer/types';
import type { SonataInit } from '$lib/data/sonatas/types';
import { SonataBuilder } from '$lib/data/sonatas/builder';

import image from './T_IconElementAttriCloud.png';

const init = {
	key: 'moonlit_clouds',
	image,
} as const satisfies SonataInit;

const effects = [2, 5] as const;

const buffs = {
	outro_released: { key: 'outro_released', kind: 'toggle' },
} as const satisfies BuffSchema<BuffDef>;

const data = SonataBuilder.create(init, effects, buffs)
	.set_effect_for(2, stats => stats.energy_regen += 0.1)
	.set_effect_for(5, (stats, { buffs }) => {
		// todo: +22.5% ATK for the next character
	})
  .build();

export { data as moonlit_clouds };
