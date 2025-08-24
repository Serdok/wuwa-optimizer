import type { BaseStatType, StatDef, StatType } from '$lib/data/stats/types';
import type { ApplyEffect, BuffDef, BuffSchema } from '$lib/data/optimizer/types';
import type { WEAPONS } from '$lib/data/weapons/index';

export const WEAPON_TYPES = ['broadsword', 'sword', 'pistol', 'gauntlet', 'rectifier'] as const;
export type WeaponType = typeof WEAPON_TYPES[number];

export type WeaponDef<S extends BuffSchema<BuffDef>> = {
	key: string;
	weapon_type: WeaponType;
	base_stats: { primary: StatDef<BaseStatType>; secondary: StatDef<StatType>; };
	buffs: S;
	apply_effect: ApplyEffect<BuffDef, S>;
};

export type WeaponInit = Omit<WeaponDef<BuffSchema<BuffDef>>, 'buffs' | 'apply_effect'>;

export type WeaponsFor<T extends WeaponType> = typeof WEAPONS[T];
export type WeaponKeysByType = { [T in WeaponType]: Extract<keyof WeaponsFor<T>, string>; };
export type WeaponKeysFor<T extends WeaponType> = WeaponKeysByType[T];