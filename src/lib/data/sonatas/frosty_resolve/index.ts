import type { BuffDef, BuffSchema } from '$lib/data/optimizer/types';
import type { SonataInit } from '$lib/data/sonatas/types';
import { SonataBuilder } from '$lib/data/sonatas/builder';

import image from './T_IconElementAttriIceUltimateSkill.png';

const init = {
	key: 'frosty_resolve',
	image,
} as const satisfies SonataInit;

const effects = [2, 5] as const;

const buffs = {
	skill_released: { key: 'skill_released', kind: 'slider', min_value: 0, max_value: 2, },
	burst_released: { key: 'burst_released', kind: 'slider', min_value: 0, max_value: 2, },
} as const satisfies BuffSchema<BuffDef>;

const data = SonataBuilder.create(init, effects, buffs)
	.set_effect_for(2, stats => stats.skill_bonus += 0.2)
	.set_effect_for(5, (stats, { buffs }) => {
		stats.glacio_bonus += 0.225 * Math.min(2, buffs.skill_released);
		stats.skill_bonus += 0.18 * Math.min(2, buffs.burst_released);
	})
  .build();

export { data as frosty_resolve };
