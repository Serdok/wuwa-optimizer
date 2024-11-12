import { BaseAttribute } from '$lib/types/stat';

export const character_curve = {
	'0/1': { [BaseAttribute.HP]: 1, [BaseAttribute.ATK]: 1, [BaseAttribute.DEF]: 1, },
	'0/20': { [BaseAttribute.HP]: 2.6011, [BaseAttribute.ATK]: 2.6011, [BaseAttribute.DEF]: 2.5655, },
	'1/20': { [BaseAttribute.HP]: 3.2677, [BaseAttribute.ATK]: 3.3511, [BaseAttribute.DEF]: 3.2136, },
	'1/40': { [BaseAttribute.HP]: 4.9531, [BaseAttribute.ATK]: 5.0365, [BaseAttribute.DEF]: 4.8616, },
	'2/40': { [BaseAttribute.HP]: 5.6198, [BaseAttribute.ATK]: 5.7865, [BaseAttribute.DEF]: 5.5097, },
	'2/50': { [BaseAttribute.HP]: 6.4625, [BaseAttribute.ATK]: 6.6292, [BaseAttribute.DEF]: 6.3337, },
	'3/50': { [BaseAttribute.HP]: 7.1292, [BaseAttribute.ATK]: 7.3792, [BaseAttribute.DEF]: 6.9818, },
	'3/60': { [BaseAttribute.HP]: 7.9719, [BaseAttribute.ATK]: 8.2219, [BaseAttribute.DEF]: 7.8058, },
	'4/60': { [BaseAttribute.HP]: 8.6385, [BaseAttribute.ATK]: 8.9719, [BaseAttribute.DEF]: 8.454, },
	'4/70': { [BaseAttribute.HP]: 9.4812, [BaseAttribute.ATK]: 9.8146, [BaseAttribute.DEF]: 9.2779, },
	'5/70': { [BaseAttribute.HP]: 10.1479, [BaseAttribute.ATK]: 10.3146, [BaseAttribute.DEF]: 9.9261, },
	'5/80': { [BaseAttribute.HP]: 10.9906, [BaseAttribute.ATK]: 11.1573, [BaseAttribute.DEF]: 10.7501, },
	'6/80': { [BaseAttribute.HP]: 11.6573, [BaseAttribute.ATK]: 11.6573, [BaseAttribute.DEF]: 11.3982, },
	'6/90': { [BaseAttribute.HP]: 12.5, [BaseAttribute.ATK]: 12.5, [BaseAttribute.DEF]: 12.2222, }
}