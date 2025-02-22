export const ELEMENTS = ['general', 'physical', 'glacio', 'fusion', 'electro', 'aero', 'spectro', 'havoc'] as const;
export type ElementKey = typeof ELEMENTS[number];