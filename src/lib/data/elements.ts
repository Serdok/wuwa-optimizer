export const ELEMENTS = [
	'general',
	'physical',
	'glacio',
	'fusion',
	'electro',
	'aero',
	'spectro',
	'havoc',
	'aero_erosion',
	'electro_flare',
	'glacio_chafe',
	'fusion_burst',
	'spectro_frazzle',
	'havoc_bane'
] as const;
export type ElementKey = typeof ELEMENTS[number];