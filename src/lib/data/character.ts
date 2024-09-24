import { base } from '$app/paths';
import { AttackType, Attribute, SkillType } from '$lib/types/stat';
import { WeaponType } from '$lib/types/weapon';
import { Element } from '$lib/types/element';
import type { CharacterLevel, CharacterMetadata } from '$lib/types/character';

export const CHARACTER_CURVE: { [level in CharacterLevel]: { [Attribute.HP]: number, [Attribute.ATK]: number, [Attribute.DEF]: number, } } = {
	'1/20': { [Attribute.HP]: 1, [Attribute.ATK]: 1, [Attribute.DEF]: 1, },
	'20/20': { [Attribute.HP]: 2.6011, [Attribute.ATK]: 2.6011, [Attribute.DEF]: 2.5655, },
	'20/40': { [Attribute.HP]: 3.2677, [Attribute.ATK]: 3.3511, [Attribute.DEF]: 3.2136, },
	'40/40': { [Attribute.HP]: 4.9531, [Attribute.ATK]: 5.0365, [Attribute.DEF]: 4.8616, },
	'40/50': { [Attribute.HP]: 5.6198, [Attribute.ATK]: 5.7865, [Attribute.DEF]: 5.5097, },
	'50/50': { [Attribute.HP]: 6.4625, [Attribute.ATK]: 6.6292, [Attribute.DEF]: 6.3337, },
	'50/60': { [Attribute.HP]: 7.1292, [Attribute.ATK]: 7.3792, [Attribute.DEF]: 6.9818, },
	'60/60': { [Attribute.HP]: 7.9719, [Attribute.ATK]: 8.2219, [Attribute.DEF]: 7.8058, },
	'60/70': { [Attribute.HP]: 8.6385, [Attribute.ATK]: 8.9719, [Attribute.DEF]: 8.454, },
	'70/70': { [Attribute.HP]: 9.4812, [Attribute.ATK]: 9.8146, [Attribute.DEF]: 9.2779, },
	'70/80': { [Attribute.HP]: 10.1479, [Attribute.ATK]: 10.3146, [Attribute.DEF]: 9.9261, },
	'80/80': { [Attribute.HP]: 10.9906, [Attribute.ATK]: 11.1573, [Attribute.DEF]: 10.7501, },
	'80/90': { [Attribute.HP]: 11.6573, [Attribute.ATK]: 11.6573, [Attribute.DEF]: 11.3982, },
	'90/90': { [Attribute.HP]: 12.5, [Attribute.ATK]: 12.5, [Attribute.DEF]: 12.2222, }
} as const;