import type { EchoDef } from '$lib/data/echoes/types';

import COST_4 from './cost_4';
import COST_3 from './cost_3';
import COST_1 from './cost_1';

export const ALL_ECHOES = [...COST_4, ...COST_3, ...COST_1] as const satisfies EchoDef[];
export { COST_1, COST_3, COST_4 };