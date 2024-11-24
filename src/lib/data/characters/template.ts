import { type CharacterData, SkillType } from '$lib/types/character';
import { Element } from '$lib/types/element';
import { WeaponType } from '$lib/types/weapon';
import { BaseAttribute } from '$lib/types/stat';


const data: CharacterData = {
	name: '',
	element: Element.Physical,
	quality: 5,
	weapon_type: WeaponType.Broadsword,
	base_stats: {
		[BaseAttribute.HP]: { attribute: BaseAttribute.HP, value: 0 },
		[BaseAttribute.ATK]: { attribute: BaseAttribute.ATK, value: 0 },
		[BaseAttribute.DEF]: { attribute: BaseAttribute.DEF, value: 0 },
	},
	conditionals: {},
	apply_effects: (input, stats) => {

	},
	skills: {
		[SkillType.Normal]: {
			type: SkillType.Normal,
			name: '',
			apply_effects: () => {},
			motions: []
		},
		[SkillType.Skill]: {
			type: SkillType.Skill,
			name: '',
			apply_effects: () => {},
			motions: []
		},
		[SkillType.Liberation]: {
			type: SkillType.Liberation,
			name: '',
			apply_effects: () => {},
			motions: []
		},
		[SkillType.Forte]: {
			type: SkillType.Forte,
			name: '',
			apply_effects: () => {},
			motions: []
		},
		[SkillType.Intro]: {
			type: SkillType.Intro,
			name: '',
			apply_effects: () => {},
			motions: []
		},
		[SkillType.Outro]: {
			type: SkillType.Outro,
			name: '',
			apply_effects: () => {},
			motions: []
		},
	},
	image: {
		portrait: ''
	}
};

export default data;