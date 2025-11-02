import { assertValidExpression, isOperator } from "./type-guards.js";
import { priorityMap } from "./utils/constants.js";
import { evaluate, addAll } from "./utils/numbers.js";
import { parseInput } from "./utils/parser.js";
const calcEngine = (input) => {
    const parsedInput = parseInput(input);
    console.log("parsed input", parsedInput);
    const test1 = [2, "+", 3, "*", 8, "/", 4, "^", 1, "-", 5, "^", 2]; // expected answer: -17
    const test2 = [4, "+", 18, "/", "(", 9, "-", 3, ")"]; // expected answer: 7
    const test3 = [0, "-", "(", 100, "-", 16, ")", "/", 2]; // expected answer: -42
    const test4 = [3, "+", 2, "-", 5, "+", 7]; // expected answer: 7
    const test = [3, "+", 2, "-", 5, "-", 7]; // expected answer: -7
    const test6 = ["(", 2, -3, ")"]; // expected answer: -1
    const operandStack = [];
    const operatorStack = [];
    for (const op of parsedInput) {
        if (typeof op === "number") {
            operandStack.push(op);
        }
        else if (isOperator(op)) {
            let lastOperator = operatorStack.at(-1);
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
    for (let i = operatorStack.length - 1; i >= 0; i--) {
        const $operator = operatorStack[i];
        const $secondOpn = operandStack.pop();
        const $firstOpn = ["-", "+"].includes(`${$operator}`)
            ? operandStack.pop() || 0
            : operandStack.pop();
        const [firstOpn, secondOpn, operator] = assertValidExpression($firstOpn, $secondOpn, $operator);
        operatorStack.pop(); // clean up operator stack.
        operandStack.push(evaluate(firstOpn, operator, secondOpn));
    }
    console.log("result", addAll(operandStack));
    return addAll(operandStack);
};
// calcEngine("4$.2 * 68 -67 + 1");
// calcEngine("-27 -++90 / 3");
// calcEngine("2.6 - 4 * 7 / 2 ^ 10");
// calcEngine("2.5 * (3 + 4) / 2");
// calcEngine("- ( 100 -, 16, ), /, 2");
// calcEngine("1$+2#+3$-5");
calcEngine("2*(8-3)");
export default calcEngine;
//# sourceMappingURL=index.js.map