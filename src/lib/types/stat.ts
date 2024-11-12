export enum BaseAttribute {
    HP = 'HP',
    ATK = 'ATK',
    DEF = 'DEF',
}

export enum CombatAttribute {
    HP_P = 'HP%',
    ATK_P = 'ATK%',
    DEF_P = 'DEF%',
    CritRate = 'Crit. Rate%',
    CritDamage = 'Crit. Damage%',
    EnergyRegen = 'Energy Regen%',
    HealingBonus = 'Healing Bonus%',

    SkillMultiplier = 'Skill Multiplier%',
    DEFIgnore = 'Enemy DEF Ignore%',
}

export enum ElementDMGBonus {
    Common = 'Attribute DMG Bonus',
    Physical = 'Physical DMG Bonus',
    Glacio = 'Glacio DMG Bonus',
    Fusion = 'Fusion DMG Bonus',
    Electro = 'Electro DMG Bonus',
    Aero = 'Aero DMG Bonus',
    Spectro = 'Spectro DMG Bonus',
    Havoc = 'Havoc DMG Bonus',
}

export enum AttackDMGBonus {
    Basic = 'Basic Attack DMG Bonus',
    Heavy = 'Heavy Attack DMG Bonus',
    Skill = 'Resonance Skill DMG Bonus',
    Liberation = 'Resonance Liberation DMG Bonus',
    Intro = 'Intro DMG Bonus',
    Outro = 'Outro DMG Bonus',
}

export enum ElementDMGAmplify {
    Common = 'Attribute DMG Amplify',
    Physical = 'Physical DMG Amplify',
    Glacio = 'Glacio DMG Amplify',
    Fusion = 'Fusion DMG Amplify',
    Electro = 'Electro DMG Amplify',
    Aero = 'Aero DMG Amplify',
    Spectro = 'Spectro DMG Amplify',
    Havoc = 'Havoc DMG Amplify',
}

export enum AttackDMGAmplify {
    Basic = 'Basic Attack DMG Amplify',
    Heavy = 'Heavy Attack DMG Amplify',
    Skill = 'Resonance Skill DMG Amplify',
    Liberation = 'Resonance Liberation DMG Amplify',
    Intro = 'Intro DMG Amplify',
    Outro = 'Outro DMG Amplify',
}

export type Attribute = BaseAttribute | CombatAttribute
    | ElementDMGBonus | AttackDMGBonus
    | ElementDMGAmplify | AttackDMGAmplify;

export type Stat<T extends Attribute> = { attribute: T, value: number };
