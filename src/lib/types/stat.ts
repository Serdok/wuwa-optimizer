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
	IntroBonus = 'Intro DMG Bonus',
	OutroBonus = 'Outro DMG Bonus',

	GlacioAmplify = 'Glacio DMG Amplify',
	FusionAmplify = 'Fusion DMG Amplify',
	ElectroAmplify = 'Electro DMG Amplify',
	AeroAmplify = 'Aero DMG Amplify',
	SpectroAmplify = 'Spectro DMG Amplify',
	HavocAmplify = 'Havoc DMG Amplify',

	BasicAttackAmplify = 'Basic Attack DMG Amplify',
	HeavyAttackAmplify = 'Heavy Attack DMG Amplify',
	ResonanceSkillAmplify = 'Resonance Skill DMG Amplify',
	ResonanceLiberationAmplify = 'Resonance Liberation DMG Amplify',
	IntroAmplify = 'Intro DMG Amplify',
	OutroAmplify = 'Outro DMG Amplify',

	BasicAttackDEFIgnore = 'Basic Attack DEF Ignore',
	HeavyAttackDEFIgnore = 'Heavy Attack DEF Ignore',
	ResonanceSkillDEFIgnore = 'Resonance Skill DEF Ignore',
	ResonanceLiberationDEFIgnore = 'Resonance Liberation DEF Ignore',
	IntroDEFIgnore = 'Intro Skill DEF Ignore',
	OutroDEFIgnore = 'Outro Skill DEF Ignore',

	BasicAttackMultiplier = 'Basic Attack Multiplier',
	HeavyAttackMultiplier = 'Heavy Attack Multiplier',
	ResonanceSkillMultiplier = 'Resonance Skill Multiplier',
	ResonanceLiberationMultiplier = 'Resonance Liberation Multiplier',
	ForteCircuitMultiplier = 'Forte Circuit Multiplier',
	IntroMultiplier = 'Intro Skill Multiplier',
	OutroMultiplier = 'Outro Skill Multiplier',
}

export enum SkillType {
	NormalAttack = 'Normal Attack',
	ResonanceSkill = 'Resonance Skill',
	ForteCircuit = 'Forte Circuit',
	ResonanceLiberation = 'Resonance Liberation',
	IntroSkill = 'Intro Skill',
	OutroSkill = 'Outro Skill',
}

export enum AttackType {
	BasicAttack = 'Basic Attack',
	HeavyAttack = 'Heavy Attack',
	ResonanceSkill = 'Resonance Skill',
	ResonanceLiberation = 'Resonance Liberation',
	IntroSkill = 'Intro Skill',
	OutroSkill = 'Outro Skill',
}

export type Stat = { attribute: Attribute, value: number, };

