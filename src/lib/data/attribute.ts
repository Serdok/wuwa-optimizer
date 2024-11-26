import {
	type Attribute,
	AttackDMGBonus,
	BaseAttribute,
	CombatAttribute,
	ElementDMGBonus
} from '$lib/types/stat';

export const attribute_asset: { [v in Attribute]?: string } = {
	[BaseAttribute.HP]: 'T_Iconpropertygreenlife_UI.png',
	[BaseAttribute.ATK]: 'T_Iconpropertyredattack_UI.png',
	[BaseAttribute.DEF]: 'T_Iconpropertygreendefense_UI.png',

	[CombatAttribute.HP_P]: 'T_Iconpropertygreenlife_UI.png',
	[CombatAttribute.ATK_P]: 'T_Iconpropertyredattack_UI.png',
	[CombatAttribute.DEF_P]: 'T_Iconpropertygreendefense_UI.png',
	[CombatAttribute.CritRate]: 'T_Iconpropertyredbaoji_UI.png',
	[CombatAttribute.CritDamage]: 'T_Iconpropertyredcrit_UI.png',
	[CombatAttribute.EnergyRegen]: 'T_Iconpropertygreenenergy_UI.png',
	[CombatAttribute.HealingBonus]: 'T_Iconpropertygreencure_UI.png',
	// [CombatAttribute.SkillMultiplier]: '',
	// [CombatAttribute.DEFIgnore]: '',

	// [ElementDMGBonus.Common]: '',
	[ElementDMGBonus.Physical]: 'T_Iconpropertyredgeneral_UI.png',
	[ElementDMGBonus.Glacio]: 'T_Iconpropertyredice_UI.png',
	[ElementDMGBonus.Fusion]: 'T_Iconpropertyredhot_UI.png',
	[ElementDMGBonus.Electro]: 'T_Iconpropertyredmine_UI.png',
	[ElementDMGBonus.Aero]: 'T_Iconpropertyredwind_UI.png',
	[ElementDMGBonus.Spectro]: 'T_Iconpropertyredlight_UI.png',
	[ElementDMGBonus.Havoc]: 'T_Iconpropertyreddark_UI.png',

	[AttackDMGBonus.Basic]: 'T_Iconpropertyredphysics_UI.png',
	[AttackDMGBonus.Heavy]: 'T_Iconpropertyredfoco_UI.png',
	[AttackDMGBonus.Skill]: 'T_Iconpropertyredskill_UI.png',
	[AttackDMGBonus.Liberation]: 'T_Iconpropertyredqte_UI.png',
	// [AttackDMGBonus.Outro]: '',
	// [AttackDMGBonus.Intro]: '',

	// [ElementDMGAmplify.Common]: '',
	// [ElementDMGAmplify.Physical]: '',
	// [ElementDMGAmplify.Glacio]: '',
	// [ElementDMGAmplify.Fusion]: '',
	// [ElementDMGAmplify.Electro]: '',
	// [ElementDMGAmplify.Aero]: '',
	// [ElementDMGAmplify.Spectro]: '',
	// [ElementDMGAmplify.Havoc]: '',

	// [AttackDMGAmplify.Basic]: '',
	// [AttackDMGAmplify.Heavy]: '',
	// [AttackDMGAmplify.Skill]: '',
	// [AttackDMGAmplify.Liberation]: '',
	// [AttackDMGAmplify.Outro]: '',
	// [AttackDMGAmplify.Intro]: '',
}