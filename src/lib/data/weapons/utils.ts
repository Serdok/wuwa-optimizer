// erases any type information, so get directly from SONATAS should you need the full definition
import type { WeaponDef, WeaponType } from '$lib/data/weapons/types';
import type { BuffDef, BuffSchema } from '$lib/data/optimizer/types';
import { WEAPONS, type WeaponKeysFor } from '$lib/data/weapons';


// erases any type information, so get directly from WEAPONS should you need the full definition
export function get_weapons_of_type<T extends WeaponType, K extends WeaponKeysFor<T>>(type: T) {
	return WEAPONS[type] as Record<K, (rank: number) => WeaponDef<BuffSchema<BuffDef>>>;
}

export function get_weapon_keys_of_type<T extends WeaponType, K extends WeaponKeysFor<T>>(type: T) {
	return Object.keys(get_weapons_of_type(type)) as Array<K>;
}

// erases any type information, so get directly from WEAPONS should you need the full definition
export function get_weapon<T extends WeaponType, K extends WeaponKeysFor<T>>(type: T, key: K, rank: number) {
	const weapons = get_weapons_of_type(type);
	return weapons[key](rank);
}