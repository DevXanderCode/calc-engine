import type { priorityMap } from "./utils/constants.js";
export type Operators = [keyof typeof priorityMap][number];
export type ValidOperators = Exclude<Operators, "(">;
export type Token = number | Operators | ")";
//# sourceMappingURL=types.d.ts.map