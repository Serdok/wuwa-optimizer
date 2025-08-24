import type {
	AsBuffValues,
	BuffDef,
	BuffSchema,
	CharacterRequest,
	WeaponRequest
} from '$lib/data/optimizer/types';
import type { CharacterKey } from '$lib/data/characters/types';
import type { WeaponKeysFor, WeaponType } from '$lib/data/weapons/types';

export function create_buff_values<D extends BuffDef>(buffs: BuffSchema<D>, set_max: boolean = true) {
	return Object.fromEntries((Object.entries(buffs) as [keyof BuffSchema<D>, D][]).map(([key, b]) => [key, set_max ? b.kind === 'toggle' ? true : b.max_value : 0])) as AsBuffValues<D, BuffSchema<D>>;
}

export function create_character_request<K extends CharacterKey>(data: CharacterRequest<K>) {
	return data;
}

export function create_weapon_request<WT extends WeaponType, WK extends WeaponKeysFor<WT>>(data: WeaponRequest<WT, WK>) {
	return data;
}