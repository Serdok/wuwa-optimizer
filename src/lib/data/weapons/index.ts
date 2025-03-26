import type { BaseStatKey, StatValue } from '$lib/data/stats';
import type { Buff, GameplayEffect } from '$lib/optimizer';

import { SWORDS } from './swords';
import { BROADSWORDS } from './broadswords';

export const WEAPON_TYPES = ['broadsword', 'sword', 'pistol', 'gauntlet', 'rectifier'] as const;
export type WeaponKey = typeof WEAPON_TYPES[number];

export const WEAPONS: Record<WeaponKey, Record<string, WeaponData>> = {
	broadsword: BROADSWORDS,
	sword: SWORDS,
	pistol: SWORDS,
	gauntlet: SWORDS,
	rectifier: SWORDS,
};

export type WeaponData = GameplayEffect & {
	key: string,
	weapon_type: WeaponKey,
	base_stats: {
		primary: StatValue<BaseStatKey>,
		secondary: StatValue,
	},
	buffs: { [key: string]: Buff },
};
