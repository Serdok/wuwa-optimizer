export const BASE_ELEMENTS = ['general', 'physical', 'glacio', 'fusion', 'electro', 'aero', 'spectro', 'havoc'] as const;
export const DEBUFF_ELEMENTS = ['aero_erosion', 'electro_flare', 'glacio_chafe', 'fusion_burst', 'spectro_frazzle', 'havoc_bane'] as const;
export const ELEMENTS = [...BASE_ELEMENTS, ...DEBUFF_ELEMENTS] as const;

export type BaseElementType = typeof BASE_ELEMENTS[number];
export type DebuffElementType = typeof DEBUFF_ELEMENTS[number];
export type ElementType = typeof ELEMENTS[number];
