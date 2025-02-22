import type { StatKey } from '$lib/data/stats';

import hp from './T_Iconpropertygreenlife_UI.png';
import atk from './T_Iconpropertyredattack_UI.png';
import def from './T_Iconpropertygreendefense_UI.png';

import crit_rate from './T_Iconpropertyredbaoji_UI.png';
import crit_dmg from './T_Iconpropertyredcrit_UI.png';
import energy_regen from './T_Iconpropertygreenenergy_UI.png';
import healing_bonus from './T_Iconpropertygreencure_UI.png';

import physical from './T_Iconpropertyredgeneral_UI.png';
import glacio from './T_Iconpropertyredice_UI.png';
import fusion from './T_Iconpropertyredhot_UI.png';
import electro from './T_Iconpropertyredmine_UI.png';
import aero from './T_Iconpropertyredwind_UI.png';
import spectro from './T_Iconpropertyredlight_UI.png';
import havoc from './T_Iconpropertyreddark_UI.png';

import basic from './T_Iconpropertyredphysics_UI.png';
import heavy from './T_Iconpropertyredfoco_UI.png';
import skill from './T_Iconpropertyredskill_UI.png';
import burst from './T_Iconpropertyredqte_UI.png';


export default {
	'hp': hp,
	'atk': atk,
	'def': def,

	'hp_p': hp,
	'atk_p': atk,
	'def_p': def,
	'crit_rate': crit_rate,
	'crit_dmg': crit_dmg,
	'energy_regen': energy_regen,
	'healing_bonus': healing_bonus,

	'physical_bonus': physical,
	'glacio_bonus': glacio,
	'fusion_bonus': fusion,
	'electro_bonus': electro,
	'aero_bonus': aero,
	'spectro_bonus': spectro,
	'havoc_bonus': havoc,

	'basic_bonus': basic,
	'heavy_bonus': heavy,
	'skill_bonus': skill,
	'burst_bonus': burst,
} as const satisfies { [key in StatKey]?: string };