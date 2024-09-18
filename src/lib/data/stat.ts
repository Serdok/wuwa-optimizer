import { Attribute } from '$lib/types/stat';

export const is_flat_stat = (stat: Attribute) => stat === Attribute.HP || stat === Attribute.ATK || stat === Attribute.DEF;

export const STATS_ICONS = {
	[Attribute.HP]: '/assets/attribute/T_Iconpropertygreenlife_UI.png',
	[Attribute.HP_P]: '/assets/attribute/T_Iconpropertygreenlife_UI.png',
	[Attribute.ATK]: '/assets/attribute/T_Iconpropertyredattack_UI.png',
	[Attribute.ATK_P]: '/assets/attribute/T_Iconpropertyredattack_UI.png',
	[Attribute.DEF]: '/assets/attribute/T_Iconpropertygreendefense_UI.png',
	[Attribute.DEF_P]: '/assets/attribute/T_Iconpropertygreendefense_UI.png',
	[Attribute.CritRate]: '/assets/attribute/T_Iconpropertyredbaoji_UI.png',
	[Attribute.CritDamage]: '/assets/attribute/T_Iconpropertyredcrit_UI.png',
	[Attribute.EnergyRegen]: '/assets/attribute/T_Iconpropertygreenenergy_UI.png',
	[Attribute.HealingBonus]: '/assets/attribute/T_Iconpropertygreencure_UI.png',
	[Attribute.GlacioBonus]: '/assets/attribute/T_Iconpropertyredice_UI.png',
	[Attribute.FusionBonus]: '/assets/attribute/T_Iconpropertyredhot_UI.png',
	[Attribute.ElectroBonus]: '/assets/attribute/T_Iconpropertyredmine_UI.png',
	[Attribute.AeroBonus]: '/assets/attribute/T_Iconpropertyredwind_UI.png',
	[Attribute.SpectroBonus]: '/assets/attribute/T_Iconpropertyredlight_UI.png',
	[Attribute.HavocBonus]: '/assets/attribute/T_Iconpropertyreddark_UI.png',
	[Attribute.BasicAttackBonus]: '/assets/attribute/T_Iconpropertyredphysics_UI.png',
	[Attribute.HeavyAttackBonus]: '/assets/attribute/T_Iconpropertyredfoco_UI.png',
	[Attribute.ResonanceSkillBonus]: '/assets/attribute/T_Iconpropertyredskill_UI.png',
	[Attribute.ResonanceLiberationBonus]: '/assets/attribute/T_Iconpropertyredqte_UI.png',
};