import { CHARACTERS } from '$lib/data/characters/index';
import type { CharacterDef, CharacterKey } from '$lib/data/characters/types';
import type { BuffSchema, RankedBuffDef } from '$lib/data/optimizer/types';
import { get_weapon_keys_of_type, get_weapons_of_type } from '$lib/data/weapons/utils';
import { deep_clone } from '$lib/utils';

// erases any type information, so get directly from CHARACTERS should you need the full definition
export function get_character(key: CharacterKey) {
	return deep_clone(CHARACTERS[key]) as CharacterDef<BuffSchema<RankedBuffDef>>;
}

export function get_weapons_for_character(key: CharacterKey) {
	return get_weapons_of_type(CHARACTERS[key].weapon_type);
}

export function get_weapon_keys_for_character(key: CharacterKey) {
	return get_weapon_keys_of_type(CHARACTERS[key].weapon_type);
}
