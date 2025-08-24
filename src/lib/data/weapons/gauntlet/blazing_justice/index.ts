import type { BuffDef, BuffSchema } from '$lib/data/optimizer/types';
import type { WeaponInit } from '$lib/data/weapons/types';
import { WeaponBuilder } from '$lib/data/weapons/builder';

const ranks = [0.12, 0.15, 0.18, 0.21, 0.24] as const;
const def_ignore = [0.08, 0.1, 0.12, 0.14, 0.16] as const;
const sfrazzle_amp = [0.5, 0.625, 0.75, 0.875, 1] as const;

const init = {
	key: 'blazing_justice',
	weapon_type: 'gauntlet',
	base_stats: {
	  primary: { stat: 'atk', value: 47 },
	  secondary: { stat: 'crit_dmg', value: 0.108 }
	}
} as const satisfies WeaponInit;

const buffs = {
	cast_basic_attack: { key: 'cast_basic_attack', kind: 'toggle' }
} as const satisfies BuffSchema<BuffDef>;

const data = WeaponBuilder.create(init, buffs)
	.set_effect((stats, { buffs, rank }) => {
		stats.atk_p += ranks[rank - 1];
		if (buffs.cast_basic_attack) {
			stats.enemy_def_ignore += def_ignore[rank - 1];
			stats.spectro_frazzle_amplify += sfrazzle_amp[rank - 1];
		}
	})
  .build();

export { data as blazing_justice };
