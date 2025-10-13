const priorityMap = {
  "(": 4,
  "^": 3,
  "/": 2,
  "*": 2,
  "+": 1,
  "-": 1,
} as const;

type Operators = [keyof typeof priorityMap][number];

type ValidOperators = Exclude<Operators, "(">;

const isOperator = (s: any): s is Operators => {
  if (typeof s === "string" && priorityMap?.[s as Operators]) return true;
  return false;
};

function assertValidExpression(
  firstOpn: number | undefined,
  secondOpn: number | undefined,
  operator: Operators | undefined
): [number, number, ValidOperators] {
  if (firstOpn == null || secondOpn == null || !operator || operator === "(") {
    throw new Error("Syntax error (invalid expression)");
  }

  return [firstOpn, secondOpn, operator];
}

const calcEngine = (input: string) => {
  // TODO: create function to parse input string to array
  const test1 = [2, "+", 3, "*", 8, "/", 4, "^", 1, "-", 5, "^", 2]; // expected answer: -17

  const test2 = [4, "+", 18, "/", "(", 9, "-", 3, ")"]; // expected answer: 7

  const test3 = [0, "-", "(", 100, "-", 16, ")", "/", 2]; // expected answer: -42 TODO: doesn't work yet

  const test4 = [3, "+", 2, "-", 5, "+", 7]; // expected answer: 7

  const test5 = [3, "+", 2, "-", 5, "-", 7]; // expected answer: -7

  const test = ["(", 3, ")"];

  //   const test = []; // ex

  const operandStack: number[] = [];
  const operatorStack: Operators[] = [];

  for (const op of test) {
    if (typeof op === "number") {
      operandStack.push(op);
    } else if (isOperator(op)) {
      let lastOperator = operatorStack.at(-1);
      console.log("current operator", op);
      if (operatorStack.length === 0) {
        operatorStack.push(op);
      } else if (lastOperator && priorityMap[lastOperator] < priorityMap[op]) {
        operatorStack.push(op);
      } else {
        while (
          lastOperator &&
          lastOperator !== "(" &&
          priorityMap[lastOperator] >= priorityMap[op]
        ) {
          const $secondOpn = operandStack.pop();
          const $firstOpn = operandStack.pop();
          const $curOpr = operatorStack.pop();

          const [firstOpn, secondOpn, curOpr] = assertValidExpression(
            $firstOpn,
            $secondOpn,
            $curOpr
          );

          operandStack.push(evaluate(firstOpn, curOpr, secondOpn));
          lastOperator = operatorStack.at(-1);
        }
        operatorStack.push(op);
      }
    } else if (op === ")" && operatorStack.includes("(")) {
      let lastOperator = operatorStack.at(-1);
      while (lastOperator && lastOperator !== "(") {
        const $secondOpn = operandStack.pop();
        const $firstOpn = operandStack.pop();
        const $curOpr = operatorStack.pop();

        const [firstOpn, secondOpn, curOpr] = assertValidExpression(
          $firstOpn,
          $secondOpn,
          $curOpr
        );

        operandStack.push(evaluate(firstOpn, curOpr, secondOpn));
        lastOperator = operatorStack.at(-1);
      }
      operatorStack.pop();
    } else {
      throw new Error(`Syntax error (invalid input ${op})`);
    }
  }

  console.log("operand stack", operandStack);
  console.log("operator stack", operatorStack);

  for (let i = operatorStack.length - 1; i >= 0; i--) {
    const $secondOpn = operandStack.pop();
    const $firstOpn = operandStack.pop();
    const $operator = operatorStack[i];

    const [firstOpn, secondOpn, operator] = assertValidExpression(
      $firstOpn,
      $secondOpn,
      $operator
    );

    operandStack.push(evaluate(firstOpn, operator, secondOpn));
  }

  console.log("operand stack", operandStack);
  console.log("operator stack", operatorStack);

  console.log("result", operandStack[0]);

  return operandStack[0];
};

function evaluate(
  firstOpn: number,
  opr: Exclude<Operators, "(">,
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

calcEngine("");

export default calcEngine;
