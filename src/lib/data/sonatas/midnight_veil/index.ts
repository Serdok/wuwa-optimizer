import type { BuffDef, BuffSchema } from '$lib/data/optimizer/types';
import type { SonataInit } from '$lib/data/sonatas/types';
import { SonataBuilder } from '$lib/data/sonatas/builder';

import image from './T_IconElementAttriDarkAssist.png';
import { motion } from './motion';

const init = {
	key: 'midnight_veil',
	image,
} as const satisfies SonataInit;

const effects = [2, 5] as const;

const buffs = {
	outro_released: { key: 'outro_released', kind: 'toggle' },
} as const satisfies BuffSchema<BuffDef>;

const data = SonataBuilder.create(init, effects, buffs)
	.set_effect_for(2, stats => stats.havoc_bonus += 0.1)
	.set_effect_for(5, (_, { character }) => {
		// todo: +15% havoc bonus for the next character

		character.skills.outro.motions = character.skills.outro.motions.concat(motion);
	})
  .build();

export { data as midnight_veil };
