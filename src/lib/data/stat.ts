import { base } from '$app/paths';
import { AttackType, Attribute } from '$lib/types/stat';
import { Element } from '$lib/types/element';

export function is_flat_stat(stat: Attribute) {
	return stat === Attribute.HP || stat === Attribute.ATK || stat === Attribute.DEF;
}

export const STATS_ICONS = {
	[Attribute.HP]: `${base}/assets/attribute/T_Iconpropertygreenlife_UI.png`,
	[Attribute.HP_P]: `${base}/assets/attribute/T_Iconpropertygreenlife_UI.png`,
	[Attribute.ATK]: `${base}/assets/attribute/T_Iconpropertyredattack_UI.png`,
	[Attribute.ATK_P]: `${base}/assets/attribute/T_Iconpropertyredattack_UI.png`,
	[Attribute.DEF]: `${base}/assets/attribute/T_Iconpropertygreendefense_UI.png`,
	[Attribute.DEF_P]: `${base}/assets/attribute/T_Iconpropertygreendefense_UI.png`,
	[Attribute.CritRate]: `${base}/assets/attribute/T_Iconpropertyredbaoji_UI.png`,
	[Attribute.CritDamage]: `${base}/assets/attribute/T_Iconpropertyredcrit_UI.png`,
	[Attribute.EnergyRegen]: `${base}/assets/attribute/T_Iconpropertygreenenergy_UI.png`,
	[Attribute.HealingBonus]: `${base}/assets/attribute/T_Iconpropertygreencure_UI.png`,
	[Attribute.GlacioBonus]: `${base}/assets/attribute/T_Iconpropertyredice_UI.png`,
	[Attribute.FusionBonus]: `${base}/assets/attribute/T_Iconpropertyredhot_UI.png`,
	[Attribute.ElectroBonus]: `${base}/assets/attribute/T_Iconpropertyredmine_UI.png`,
	[Attribute.AeroBonus]: `${base}/assets/attribute/T_Iconpropertyredwind_UI.png`,
	[Attribute.SpectroBonus]: `${base}/assets/attribute/T_Iconpropertyredlight_UI.png`,
	[Attribute.HavocBonus]: `${base}/assets/attribute/T_Iconpropertyreddark_UI.png`,
	[Attribute.BasicAttackBonus]: `${base}/assets/attribute/T_Iconpropertyredphysics_UI.png`,
	[Attribute.HeavyAttackBonus]: `${base}/assets/attribute/T_Iconpropertyredfoco_UI.png`,
	[Attribute.ResonanceSkillBonus]: `${base}/assets/attribute/T_Iconpropertyredskill_UI.png`,
	[Attribute.ResonanceLiberationBonus]: `${base}/assets/attribute/T_Iconpropertyredqte_UI.png`,
} as const;
