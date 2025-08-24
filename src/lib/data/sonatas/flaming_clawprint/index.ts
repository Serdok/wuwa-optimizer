import type { BuffDef, BuffSchema } from '$lib/data/optimizer/types';
import type { SonataInit } from '$lib/data/sonatas/types';
import { SonataBuilder } from '$lib/data/sonatas/builder';

import image from './T_IconElementAttriFireUltimateSkill.png';

const init = {
	key: 'flaming_clawprint',
	image,
} as const satisfies SonataInit;

const effects = [2, 5] as const;

const buffs = {
	burst_released: { key: 'burst_released', kind: 'toggle' }
} as const satisfies BuffSchema<BuffDef>;

const data = SonataBuilder.create(init, effects, buffs)
	.set_effect_for(2, stats => stats.fusion_bonus += 0.1)
	.set_effect_for(5, (stats, { buffs }) => {
		if (buffs.burst_released) {
			stats.fusion_bonus += 0.15;
			stats.burst_bonus += 0.2;
		}
	})
  .build();

export { data as flaming_clawprint };
