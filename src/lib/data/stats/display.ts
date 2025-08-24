import type { StatType } from '$lib/data/stats/types';

const STAT_ICONS = {
	hp: (await import('./T_Iconpropertygreenlife_UI.png')).default,
	atk: (await import('./T_Iconpropertyredattack_UI.png')).default,
	def: (await import('./T_Iconpropertygreendefense_UI.png')).default,

	hp_p: (await import('./T_Iconpropertygreenlife_UI.png')).default,
	atk_p: (await import('./T_Iconpropertyredattack_UI.png')).default,
	def_p: (await import('./T_Iconpropertygreendefense_UI.png')).default,
	crit_rate: (await import('./T_Iconpropertyredbaoji_UI.png')).default,
	crit_dmg: (await import('./T_Iconpropertyredcrit_UI.png')).default,
	energy_regen: (await import('./T_Iconpropertygreenenergy_UI.png')).default,
	healing_bonus: (await import('./T_Iconpropertygreencure_UI.png')).default,

	physical_bonus: (await import('./T_Iconpropertyredgeneral_UI.png')).default,
	glacio_bonus: (await import('./T_Iconpropertyredice_UI.png')).default,
	fusion_bonus: (await import('./T_Iconpropertyredhot_UI.png')).default,
	electro_bonus: (await import('./T_Iconpropertyredmine_UI.png')).default,
	aero_bonus: (await import('./T_Iconpropertyredwind_UI.png')).default,
	spectro_bonus: (await import('./T_Iconpropertyredlight_UI.png')).default,
	havoc_bonus: (await import('./T_Iconpropertyreddark_UI.png')).default,

	basic_bonus: (await import('./T_Iconpropertyredphysics_UI.png')).default,
	heavy_bonus: (await import('./T_Iconpropertyredfoco_UI.png')).default,
	skill_bonus: (await import('./T_Iconpropertyredskill_UI.png')).default,
	burst_bonus: (await import('./T_Iconpropertyredqte_UI.png')).default,
} as const satisfies Partial<Record<StatType, string>>;

export { STAT_ICONS };