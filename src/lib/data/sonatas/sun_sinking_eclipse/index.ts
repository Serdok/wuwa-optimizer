import type { BuffDef, BuffSchema } from '$lib/data/optimizer/types';
import type { SonataInit } from '$lib/data/sonatas/types';
import { SonataBuilder } from '$lib/data/sonatas/builder';

import image from './T_IconElementAttriDark.png';

const init = {
	key: 'sun_sinking_eclipse',
	image,
} as const satisfies SonataInit;

const effects = [2, 5] as const;

const buffs = {
	basic_released: { key: 'basic_released', kind: 'slider', min_value: 0, max_value: 4, },
	heavy_released: { key: 'heavy_released', kind: 'slider', min_value: 0, max_value: 4, }
} as const satisfies BuffSchema<BuffDef>;

const data = SonataBuilder.create(init, effects, buffs)
	.set_effect_for(2, stats => stats.havoc_bonus += 0.1)
	.set_effect_for(5, (stats, { buffs }) => {
		stats.havoc_bonus += 0.075 * Math.min(4, buffs.basic_released + buffs.heavy_released);
	})
  .build();

export { data as sun_sinking_eclipse };
