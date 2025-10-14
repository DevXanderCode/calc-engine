import type { Operators, ValidOperators } from "./types.js";
export declare const isOperator: (s: any) => s is Operators;
export declare function assertValidExpression(firstOpn: number | undefined, secondOpn: number | undefined, operator: Operators | undefined): [number, number, ValidOperators];
//# sourceMappingURL=type-guards.d.ts.map