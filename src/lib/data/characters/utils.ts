import { CHARACTERS, type CharacterKey } from '$lib/data/characters/index';
import type { CharacterDef } from '$lib/data/characters/types';
import type { BuffSchema, RankedBuffDef } from '$lib/data/optimizer/types';
import { get_weapon_keys_of_type, get_weapons_of_type } from '$lib/data/weapons/utils';

// erases any type information, so get directly from CHARACTERS should you need the full definition
export function get_character(key: CharacterKey, rank: number) {
	return CHARACTERS[key](rank) as CharacterDef<BuffSchema<RankedBuffDef>>;
}

export function get_weapons_for_character(key: CharacterKey, rank: number) {
	return get_weapons_of_type(CHARACTERS[key](rank).weapon_type);
}

export function get_weapon_keys_for_character(key: CharacterKey, rank: number) {
	return get_weapon_keys_of_type(CHARACTERS[key](rank).weapon_type);
}
