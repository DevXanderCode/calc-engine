const priorityMap = {
    "(": 4,
    "^": 3,
    "/": 2,
    "*": 2,
    "+": 1,
    "-": 1,
};
const OPERATORS = new Set([...Object.keys(priorityMap), ")"]);
const BLANKSPACE = [" ", "\r", "\t", "\n"];
const isOperator = (s) => {
    if (typeof s === "string" && priorityMap?.[s])
        return true;
    return false;
};
function assertValidExpression(firstOpn, secondOpn, operator) {
    if (firstOpn == null || secondOpn == null || !operator || operator === "(") {
        throw new Error("Syntax error (invalid expression)");
    }
    return [firstOpn, secondOpn, operator];
}
/**
 * Check if character is a digit
 */
function isDigit(char) {
    //   return char >= "0" && char <= "9";
    return !isNaN(parseFloat(char)) && isFinite(Number(char));
}
const parseInput = (expression) => {
    // "2.6 - 4 * 7 / 2 ^ 10" => [2.6, "-", 4, "*", 7, "/", 2, "^", 10]
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
        console.log("operator char", char);
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
function parseNumber(expression, startIndex) {
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
const calcEngine = (input) => {
    const parsedInput = parseInput(input);
    console.log("parsed input", parsedInput);
    const test1 = [2, "+", 3, "*", 8, "/", 4, "^", 1, "-", 5, "^", 2]; // expected answer: -17
    const test2 = [4, "+", 18, "/", "(", 9, "-", 3, ")"]; // expected answer: 7
    const test3 = [0, "-", "(", 100, "-", 16, ")", "/", 2]; // expected answer: -42 TODO: doesn't work yet
    const test4 = [3, "+", 2, "-", 5, "+", 7]; // expected answer: 7
    const test = [3, "+", 2, "-", 5, "-", 7]; // expected answer: -7
    const test6 = ["(", 2, -3, ")"]; // expected answer: -1
    //   const test = []; // ex
    const operandStack = [];
    const operatorStack = [];
    for (const op of parsedInput) {
        if (typeof op === "number") {
            operandStack.push(op);
        }
        else if (isOperator(op)) {
            let lastOperator = operatorStack.at(-1);
            console.log("current operator", op);
            if (operatorStack.length === 0) {
                operatorStack.push(op);
            }
            else if (lastOperator && priorityMap[lastOperator] < priorityMap[op]) {
                operatorStack.push(op);
            }
            else {
                while (lastOperator &&
                    lastOperator !== "(" &&
                    priorityMap[lastOperator] >= priorityMap[op]) {
                    const $secondOpn = operandStack.pop();
                    const $curOpr = operatorStack.pop();
                    const $firstOpn = ["-", "+"].includes(`${$curOpr}`)
                        ? operandStack.pop() || 0
                        : operandStack.pop();
                    const [firstOpn, secondOpn, curOpr] = assertValidExpression($firstOpn, $secondOpn, $curOpr);
                    operandStack.push(evaluate(firstOpn, curOpr, secondOpn));
                    lastOperator = operatorStack.at(-1);
                }
                operatorStack.push(op);
            }
        }
        else if (op === ")" && operatorStack.includes("(")) {
            let lastOperator = operatorStack.at(-1);
            while (lastOperator && lastOperator !== "(") {
                const $secondOpn = operandStack.pop();
                const $curOpr = operatorStack.pop();
                const $firstOpn = ["-", "+"].includes(`${$curOpr}`)
                    ? operandStack.pop() || 0
                    : operandStack.pop();
                const [firstOpn, secondOpn, curOpr] = assertValidExpression($firstOpn, $secondOpn, $curOpr);
                operandStack.push(evaluate(firstOpn, curOpr, secondOpn));
                lastOperator = operatorStack.at(-1);
            }
            operatorStack.pop();
        }
        else {
            throw new Error(`Syntax error (invalid input ${op})`);
        }
    }
    console.log("operand stack", operandStack);
    console.log("operator stack", operatorStack);
    for (let i = operatorStack.length - 1; i >= 0; i--) {
        const $operator = operatorStack[i];
        const $secondOpn = operandStack.pop();
        const $firstOpn = ["-", "+"].includes(`${$operator}`)
            ? operandStack.pop() || 0
            : operandStack.pop();
        console.log("firstOpn", $firstOpn);
        const [firstOpn, secondOpn, operator] = assertValidExpression($firstOpn, $secondOpn, $operator);
        operatorStack.pop();
        operandStack.push(evaluate(firstOpn, operator, secondOpn));
    }
    console.log("operand stack", operandStack);
    console.log("operator stack", operatorStack);
    console.log("result", addAll(operandStack));
    return addAll(operandStack);
};
function evaluate(firstOpn, opr, secondOpn) {
    console.log("eval called ", firstOpn, opr, secondOpn);
    switch (opr) {
        case "+":
            return firstOpn + secondOpn;
        case "-":
            return firstOpn - secondOpn;
        case "*":
            return firstOpn * secondOpn;
        case "/":
            if (secondOpn === 0)
                throw new Error("Division By Zero Error");
            return firstOpn / secondOpn;
        case "^":
            return firstOpn ** secondOpn;
        default:
            throw new Error(`Operation ${opr} not supported yet.`);
    }
}
function addAll(nums) {
    let res = 0;
    if (nums.length === 0)
        return 0;
    for (const num of nums) {
        res += num;
    }
    return res;
}
// calcEngine("4$.2 * 68 -67 + 1");
// calcEngine("2.6 - 4 * 7 / 2 ^ 10");
calcEngine("2.5 * (3 + 4) / 2");
// console.log(
//   "input",
//   parseInput("2.5 * (3 + 4) / 2"),
//   parseInput("2.5 * (3 + 4) / 2").length
// );
export default calcEngine;
//# sourceMappingURL=index.js.map