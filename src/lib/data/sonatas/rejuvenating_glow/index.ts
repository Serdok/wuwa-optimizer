import type { BuffDef, BuffSchema } from '$lib/data/optimizer/types';
import type { SonataInit } from '$lib/data/sonatas/types';
import { SonataBuilder } from '$lib/data/sonatas/builder';

import image from './T_IconElementAttriCure.png';

const init = {
	key: 'rejuvenating_glow',
	image,
} as const satisfies SonataInit;

const effects = [2, 5] as const;

const buffs = {
	healing_allies: { key: 'healing_allies', kind: 'toggle' },
} as const satisfies BuffSchema<BuffDef>;

const data = SonataBuilder.create(init, effects, buffs)
	.set_effect_for(2, stats => stats.healing_bonus += 0.1)
	.set_effect_for(5, (stats, { buffs }) => {
		if (buffs.healing_allies) stats.atk_p += 0.15;
		// todo: +15% ATK for all party members
	})
  .build();

export { data as rejuvenating_glow };
