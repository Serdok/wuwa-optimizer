import type { BuffDef, BuffSchema } from '$lib/data/optimizer/types';
import type { SonataInit } from '$lib/data/sonatas/types';
import { SonataBuilder } from '$lib/data/sonatas/builder';

import image from './T_IconElementAttriLightError.png';

const init = {
	key: 'eternal_radiance',
	image,
} as const satisfies SonataInit;

const effects = [2, 5] as const;

const buffs = {
	spectro_frazzle: { key: 'spectro_frazzle', kind: 'slider', min_value: 0, max_value: 10, },
} as const satisfies BuffSchema<BuffDef>;

const data = SonataBuilder.create(init, effects, buffs)
	.set_effect_for(2, stats => stats.spectro_bonus += 0.1)
	.set_effect_for(5, (stats, { buffs }) => {
		if (buffs.spectro_frazzle > 0) stats.crit_rate += 0.2;
		if (buffs.spectro_frazzle >= 10) stats.spectro_bonus += 0.15;
	})
  .build();

export { data as eternal_radiance };
