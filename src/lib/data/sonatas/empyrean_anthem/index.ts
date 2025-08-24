import type { BuffDef, BuffSchema } from '$lib/data/optimizer/types';
import type { SonataInit } from '$lib/data/sonatas/types';
import { SonataBuilder } from '$lib/data/sonatas/builder';

import image from './T_IconElementAttriCooperate.png';

const init = {
	key: 'empyrean_anthem',
	image,
} as const satisfies SonataInit;

const effects = [2, 5] as const;

const buffs = {
	coordinated_crit: { key: 'coordinated_crit', kind: 'toggle' },
} as const satisfies BuffSchema<BuffDef>;

const data = SonataBuilder.create(init, effects, buffs)
	.set_effect_for(2, stats => stats.energy_regen += 0.1)
	.set_effect_for(5, (stats, { buffs }) => {
		stats.coordinated_attack += 0.8;
		if (buffs.coordinated_crit) stats.atk_p += 0.2;
	})
  .build();

export { data as empyrean_anthem };
