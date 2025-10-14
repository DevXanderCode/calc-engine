import type { Token, Operators } from "../types.js";
import { BLANKSPACE, OPERATORS } from "./constants.js";
import { isDigit } from "./numbers.js";

export const parseInput = (expression: string): Token[] => {
  const res: Token[] = [];

  let i = 0;
  while (i < expression.length) {
    let char = expression[i];

    if (char == null) return res;

    if (BLANKSPACE.includes(char)) {
      i++;
      continue;
    }

    console.log("operator char", char);
    if (OPERATORS.has(char)) {
      res.push(char as Operators);
      i++;
      continue;
    }

    if (isDigit(char) || char == "." || char == "-") {
      const number = parseNumber(expression, i);
      if (number != null) {
        res.push(number.value);
        i = number.endIndex;
        continue;
      }
    }

    i++;
  }

  return res;
};

export function parseNumber(expression: string, startIndex: number) {
  let j = startIndex;
  let $temp = "";

  let hasDigits = false;
  let hasDecimal = false;

  while (j < expression.length) {
    const char = expression[j];

    if (char == null) {
      j++;
      continue;
    }

    if (isDigit(char)) {
      hasDigits = true;
      $temp += char;
      j++;
    } else if (char === "." && !hasDecimal) {
      $temp += char;
      hasDecimal = true;
      j++;
    } else {
      break;
    }
  }

  if (!hasDigits) {
    return null;
  }

  const value = parseFloat($temp);

  // Check if valid number
  if (isNaN(value)) {
    return null;
  }

  return { value, endIndex: j };
}
