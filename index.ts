const priorityMap = {
  "(": 4,
  "^": 3,
  "/": 2,
  "*": 2,
  "+": 1,
  "-": 1,
} as const;

type Operators = [keyof typeof priorityMap][number];

const isOperator = (s: any): s is Operators => {
  if (typeof s === "string" && priorityMap?.[s as Operators]) return true;
  return false;
};

const calcEngine = (input: string) => {
  // TODO: create function to parse input string to array
  const test = [2, "+", 3, "*", 8, "/", 4, "^", 1, "-", 5, "^", 2]; // expected answer: -17

  const operandStack: number[] = [];
  const operatorStack: Operators[] = [];

  for (const op of test) {
    if (typeof op === "number") {
      operandStack.push(op);
    } else if (isOperator(op)) {
      let lastOperator = operatorStack.at(-1);
      if (operatorStack.length === 0) {
        operatorStack.push(op);
      } else if (lastOperator && priorityMap[lastOperator] < priorityMap[op]) {
        operatorStack.push(op);
      } else {
        while (lastOperator && priorityMap[lastOperator] >= priorityMap[op]) {
          const secondOpn = operandStack.pop();
          const firstOpn = operandStack.pop();
          const curOpr = operatorStack.pop();

          //   console.log(firstOpn, secondOpn, curOpr);

          if (!firstOpn || !secondOpn || !curOpr) {
            throw new Error("Syntax error (invalid expression)");
          }

          operandStack.push(evaluate(firstOpn, curOpr, secondOpn));
          lastOperator = operatorStack.at(-1);
        }
        operatorStack.push(op);
      }
    } else {
      throw new Error(`Syntax error (invalid input ${op})`);
    }
  }

  for (let i = operatorStack.length - 1; i >= 0; i--) {
    const secondOpn = operandStack.pop();
    const firstOpn = operandStack.pop();
    const operator = operatorStack[i];

    if (!firstOpn || !secondOpn || !operator) {
      throw new Error("Syntax error (invalid expression)");
    }

    operandStack.push(evaluate(firstOpn, operator, secondOpn));
  }

  console.log("operand stack", operandStack);
  console.log("operator stack", operatorStack);

  console.log("result", operandStack[0]);

  return operandStack[0];
};

function evaluate(
  firstOpn: number,
  opr: Omit<Operators, "(">,
  secondOpn: number
) {
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

calcEngine("");

export default calcEngine;
