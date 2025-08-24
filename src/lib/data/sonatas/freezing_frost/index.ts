import type { BuffDef, BuffSchema } from '$lib/data/optimizer/types';
import type { SonataInit } from '$lib/data/sonatas/types';
import { SonataBuilder } from '$lib/data/sonatas/builder';

import image from './T_IconElementAttriIce.png';

const init = {
	key: 'freezing_frost',
	image,
} as const satisfies SonataInit;

const effects = [2, 5] as const;

const buffs = {
	basic_released: { key: 'basic_released', kind: 'slider', min_value: 0, max_value: 3, },
	heavy_released: { key: 'heavy_released', kind: 'slider', min_value: 0, max_value: 3, }
} as const satisfies BuffSchema<BuffDef>;

const data = SonataBuilder.create(init, effects, buffs)
	.set_effect_for(2, stats => stats.glacio_bonus += 0.1)
	.set_effect_for(5, (stats, { buffs }) => {
		stats.glacio_bonus += 0.1 * Math.min(3, buffs.basic_released + buffs.heavy_released);
	})
	.build();

export { data as freezing_frost };
