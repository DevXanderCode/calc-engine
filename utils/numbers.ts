import type { ValidOperators } from "../types.js";

/**
 * Check if character is a digit
 */
export function isDigit(char: string): boolean {
  //   return char >= "0" && char <= "9";
  return !isNaN(parseFloat(char)) && isFinite(Number(char));
}

export function evaluate(
  firstOpn: number,
  opr: ValidOperators,
  secondOpn: number
) {
  console.log("eval called ", firstOpn, opr, secondOpn);
  switch (opr) {
    case "+":
      return firstOpn + secondOpn;
    case "-":
      return firstOpn - secondOpn;
    case "*":
      return firstOpn * secondOpn;
    case "/":
      if (secondOpn === 0) throw new Error("Division By Zero Error");

      return firstOpn / secondOpn;
    case "^":
      return firstOpn ** secondOpn;

    default:
      throw new Error(`Operation ${opr} not supported yet.`);
  }
}

export function addAll(nums: number[]) {
  let res = 0;
  if (nums.length === 0) return 0;

  for (const num of nums) {
    res += num;
  }

  return res;
}
