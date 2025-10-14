import { BLANKSPACE, OPERATORS } from "./constants.js";
import { isDigit } from "./numbers.js";
export const parseInput = (expression) => {
    const res = [];
    let i = 0;
    while (i < expression.length) {
        let char = expression[i];
        if (char == null)
            return res;
        if (BLANKSPACE.includes(char)) {
            i++;
            continue;
        }
        if (OPERATORS.has(char)) {
            res.push(char);
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
export function parseNumber(expression, startIndex) {
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
        }
        else if (char === "." && !hasDecimal) {
            $temp += char;
            hasDecimal = true;
            j++;
        }
        else {
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
//# sourceMappingURL=parser.js.map