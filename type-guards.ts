import type { Operators, ValidOperators } from "./types.js";
import { priorityMap } from "./utils/constants.js";

export const isOperator = (s: any): s is Operators => {
  if (typeof s === "string" && priorityMap?.[s as Operators]) return true;
  return false;
};

export function assertValidExpression(
  firstOpn: number | undefined,
  secondOpn: number | undefined,
  operator: Operators | undefined
): [number, number, ValidOperators] {
  if (firstOpn == null || secondOpn == null || !operator || operator === "(") {
    throw new Error("Syntax error (invalid expression)");
  }

  return [firstOpn, secondOpn, operator];
}
