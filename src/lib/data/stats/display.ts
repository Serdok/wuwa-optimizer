import type { StatType } from '$lib/data/stats/types';

import hp from './T_Iconpropertygreenlife_UI.png';
import atk from './T_Iconpropertyredattack_UI.png';
import def from './T_Iconpropertygreendefense_UI.png';

import crit_rate from './T_Iconpropertyredbaoji_UI.png';
import crit_dmg from './T_Iconpropertyredcrit_UI.png';
import energy_regen from './T_Iconpropertygreenenergy_UI.png';
import healing_bonus from './T_Iconpropertygreencure_UI.png';

import physical_bonus from './T_Iconpropertyredgeneral_UI.png';
import glacio_bonus from './T_Iconpropertyredice_UI.png';
import fusion_bonus from './T_Iconpropertyredhot_UI.png';
import electro_bonus from './T_Iconpropertyredmine_UI.png';
import aero_bonus from './T_Iconpropertyredwind_UI.png';
import spectro_bonus from './T_Iconpropertyredlight_UI.png';
import havoc_bonus from './T_Iconpropertyreddark_UI.png';

import basic_bonus from './T_Iconpropertyredphysics_UI.png';
import heavy_bonus from './T_Iconpropertyredfoco_UI.png';
import skill_bonus from './T_Iconpropertyredskill_UI.png';
import burst_bonus from './T_Iconpropertyredqte_UI.png';

const STAT_ICONS = {
	hp: hp,
	atk: atk,
	def: def,

	hp_p: hp,
	atk_p: atk,
	def_p: def,
	crit_rate: crit_rate,
	crit_dmg: crit_dmg,
	energy_regen: energy_regen,
	healing_bonus: healing_bonus,

	physical_bonus: physical_bonus,
	glacio_bonus: glacio_bonus,
	fusion_bonus: fusion_bonus,
	electro_bonus: electro_bonus,
	aero_bonus: aero_bonus,
	spectro_bonus: spectro_bonus,
	havoc_bonus: havoc_bonus,

	basic_bonus: basic_bonus,
	heavy_bonus: heavy_bonus,
	skill_bonus: skill_bonus,
	burst_bonus: burst_bonus,
} as const satisfies Partial<Record<StatType, string>>;

export { STAT_ICONS };