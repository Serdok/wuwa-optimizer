import { type CharacterData } from '$lib/types/character';

import changli from '$lib/data/characters/changli';
import jinhsi from '$lib/data/characters/jinhsi';
import jiyan from '$lib/data/characters/jiyan';
import xiangli_yao from '$lib/data/characters/xiangli_yao';
import yinlin from '$lib/data/characters/yinlin';
import camellya from '$lib/data/characters/camellya';

export const characters: Record<string, CharacterData> = {
	camellya,
	changli,
	jinhsi,
	jiyan,
	xiangli_yao,
	yinlin
}