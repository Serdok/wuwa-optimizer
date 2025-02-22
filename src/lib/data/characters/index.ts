export const SKILLS = ['normal', 'skill', 'forte', 'burst', 'intro', 'outro'] as const;
export type SkillKey = typeof SKILLS[number];

export const ATTACKS = ['basic', 'heavy', 'skill', 'burst', 'intro', 'outro'] as const;
export type AttackKey = typeof ATTACKS[number];