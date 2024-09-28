import type { Character, CharacterResonanceChain } from '$lib/types/character';
import changli from '$lib/data/character/changli';
import type { Weapon, WeaponSyntonize } from '$lib/types/weapon';
import blazing_brilliance from '$lib/data/weapon/blazing_brilliance';
import { WEAPON_CURVE_1, WEAPON_CURVE_2 } from '$lib/data/weapon';
import { Attribute } from '$lib/types/stat';
import { CHARACTER_CURVE } from '$lib/data/character';

export function create_character_config(game_id: number, resonance_chain: CharacterResonanceChain): Character {
	// TODO: get character metadata from game id :^)
	const character = changli(resonance_chain);

	return {
		...character,
		resonance_chain,
		base_stats: {
			[Attribute.HP]: { attribute: Attribute.HP, value: character.base_stats[Attribute.HP].value * CHARACTER_CURVE['90/90'][Attribute.HP] },
			[Attribute.ATK]: { attribute: Attribute.ATK, value: character.base_stats[Attribute.ATK].value * CHARACTER_CURVE['90/90'][Attribute.ATK] },
			[Attribute.DEF]: { attribute: Attribute.DEF, value: character.base_stats[Attribute.DEF].value * CHARACTER_CURVE['90/90'][Attribute.DEF] },
		},
		stat_bonuses: character.stat_bonuses.map((s) => ({ ...s, enabled: true })), // assume all passive stats are unlocked
		stacks: Object.fromEntries(
			Object.entries(character.stacks).map(([key, value]) => [
				key,
				{ ...value, value: value.default_value, }
			])
		)
	};
}

export function create_weapon_config(game_id: number, syntonize: WeaponSyntonize): Weapon {
	// TODO: get weapon metadata from game id :^)

	return {
		...blazing_brilliance,
		syntonize,
		main_stat: {
			primary: {
				...blazing_brilliance.main_stat.primary,
				value: blazing_brilliance.main_stat.primary.value * WEAPON_CURVE_1['90/90']
			},
			secondary: {
				...blazing_brilliance.main_stat.secondary,
				value: blazing_brilliance.main_stat.secondary.value * WEAPON_CURVE_2['90/90']
			}
		},
		stacks: Object.fromEntries(Object.entries(blazing_brilliance.stacks).map(([key, value]) => [key, { ...value, value: value.default_value, }])),
	};
}