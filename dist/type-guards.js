import { priorityMap } from "./utils/constants.js";
export const isOperator = (s) => {
    if (typeof s === "string" && priorityMap?.[s])
        return true;
    return false;
};
export function assertValidExpression(firstOpn, secondOpn, operator) {
    if (firstOpn == null || secondOpn == null || !operator || operator === "(") {
        throw new Error("Syntax error (invalid expression)");
    }
    return [firstOpn, secondOpn, operator];
}
//# sourceMappingURL=type-guards.js.map