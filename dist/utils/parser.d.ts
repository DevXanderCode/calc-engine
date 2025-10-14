import type { Token } from "../types.js";
export declare const parseInput: (expression: string) => Token[];
export declare function parseNumber(expression: string, startIndex: number): {
    value: number;
    endIndex: number;
} | null;
//# sourceMappingURL=parser.d.ts.map