import { type WeaponMetadata, WeaponType } from '$lib/types/weapon';
import { Attribute } from '$lib/types/stat';
import { base } from '$app/paths';

const weapon: WeaponMetadata = {
	game_id: 21020016,
	name: 'Blazing Brilliance',
	quality: 5,
	weapon_type: WeaponType.Sword,
	main_stat: {
		primary: { attribute: Attribute.ATK, value: 47, },
		secondary: { attribute: Attribute.CritDamage, value: 0.108, },
	},
	stacks: {
		'searing_feather': {
			name: 'Searing Feather',
			default_value: 0,
			max_stacks: 14,
		},
	},
	conditionals: [
		{
			name: 'Crimson Phoenix',
			condition: () => true,
			pre_compute: (weapon, stats) => {
				return {
					...stats,
					// ATK increased by 12%
					[Attribute.ATK_P]: (stats[Attribute.ATK_P] || 0) + (0.09 + 0.03 * weapon.syntonize),
					// For each stack of 'Searing Feather', increase Resonance Skill damage by 4%
					[Attribute.ResonanceSkillBonus]: (stats[Attribute.ResonanceSkillBonus] || 0) + (0.03 + 0.01 * weapon.syntonize) * weapon.stacks['searing_feather'].value,
				}
			}
		},
	],
	image: `${base}/assets/weapon/T_IconWeapon21020016_UI.png`,
};

export default weapon;