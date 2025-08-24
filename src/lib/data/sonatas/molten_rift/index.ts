import type { BuffDef, BuffSchema } from '$lib/data/optimizer/types';
import type { SonataInit } from '$lib/data/sonatas/types';
import { SonataBuilder } from '$lib/data/sonatas/builder';

import image from './T_IconElementAttriFire.png';

const init = {
	key: 'molten_rift',
	image,
} as const satisfies SonataInit;

const effects = [2, 5] as const;

const buffs = {
	skill_released: { key: 'skill_released', kind: 'toggle' }
} as const satisfies BuffSchema<BuffDef>;

const data = SonataBuilder.create(init, effects, buffs)
	.set_effect_for(2, stats => stats.fusion_bonus += 0.1)
	.set_effect_for(5, (stats, { buffs }) => {
		if (buffs.skill_released) stats.fusion_bonus += 0.3;
	})
  .build();

export { data as molten_rift };
