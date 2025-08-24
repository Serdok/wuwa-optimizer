import type { BuffDef, BuffSchema } from '$lib/data/optimizer/types';
import type { SonataInit } from '$lib/data/sonatas/types';
import { SonataBuilder } from '$lib/data/sonatas/builder';

import image from './T_IconElementAttriThunder.png';

const init = {
	key: 'void_thunder',
	image,
} as const satisfies SonataInit;

const effects = [2, 5] as const;

const buffs = {
	heavy_released: { key: 'heavy_released', kind: 'slider', min_value: 0, max_value: 2, },
	skill_released: { key: 'skill_released', kind: 'slider', min_value: 0, max_value: 2, }
} as const satisfies BuffSchema<BuffDef>;

const data = SonataBuilder.create(init, effects, buffs)
	.set_effect_for(2, stats => stats.electro_bonus += 0.1)
	.set_effect_for(5, (stats, { buffs }) => {
		stats.electro_bonus += 0.15 * Math.min(2, buffs.heavy_released + buffs.skill_released);
	})
  .build();

export { data as void_thunder };
