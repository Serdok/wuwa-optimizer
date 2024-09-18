export enum Attribute {
	HP = 'HP',
	HP_P = 'HP%',
	ATK = 'ATK',
	ATK_P = 'ATK%',
	DEF = 'DEF',
	DEF_P = 'DEF%',
	CritRate = 'Crit. Rate',
	CritDamage = 'Crit. Damage',
	EnergyRegen = 'Energy Regen',
	HealingBonus = 'Healing Bonus',
	GlacioBonus = 'Glacio DMG Bonus',
	FusionBonus = 'Fusion DMG Bonus',
	ElectroBonus = 'Electro DMG Bonus',
	AeroBonus = 'Aero DMG Bonus',
	SpectroBonus = 'Spectro DMG Bonus',
	HavocBonus = 'Havoc DMG Bonus',
	BasicAttackBonus = 'Basic Attack DMG Bonus',
	HeavyAttackBonus = 'Heavy Attack DMG Bonus',
	ResonanceSkillBonus = 'Resonance Skill DMG Bonus',
	ResonanceLiberationBonus = 'Resonance Liberation DMG Bonus',
}

export type Stat = { attribute: Attribute, value: number, };

