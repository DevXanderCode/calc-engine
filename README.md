# Calc Engine

A robust and efficient calculator engine built with TypeScript, leveraging the Shunting-Yard algorithm for precise operation precedence parsing. Designed for integration into various applications requiring mathematical expression evaluation.

## Features

- Supports basic arithmetic operations: addition (`+`), subtraction (`-`), multiplication (`*`), and division (`/`).
- Handles operator precedence and parentheses using the classic Shunting-Yard algorithm.
- Type-safe and well-structured with TypeScript for maintainability and scalability.
- Easy to integrate into existing JavaScript/TypeScript projects.

## Installation

To add `calc-engine` to your project, use npm or yarn:

```bash
npm install calc-engine
# or
yarn add calc-engine
```

## Usage

Here's how to use the `calc-engine` to evaluate mathematical expressions:

```typescript
import { calcEngine } from "calc-engine";

// Example 1: Basic arithmetic with precedence
const result1 = calcEngine("2 + 3 * 4"); // Expected: 14
console.log("2 + 3 * 4 =", result1);

// Example 2: Using parentheses to alter precedence
const result2 = calcEngine("(2 + 3) * 4"); // Expected: 20
console.log("(2 + 3) * 4 =", result2);

// Example 3: More complex expression
const result3 = calcEngine("10 / 2 - 1 + (5 * 3)"); // Expected: 19
console.log("10 / 2 - 1 + (5 * 3) =", result3);
```

## API Reference

### `calcEngine(expression: string): number`

Evaluates a mathematical expression string and returns the numerical result.

- `expression`: A string representing the mathematical expression to be evaluated.
- Returns: A `number` representing the result of the evaluation.

## Development

To set up the project for development:

1.  Clone the repository:
    ```bash
    git clone https://github.com/DevXanderCode/calc-engine.git
    cd calc-engine
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Compile the TypeScript code:
    ```bash
    tsc
    ```
4.  Run the development script (if available, or execute compiled `index.js`):
    ```bash
    npm run dev
    # or
    node dist/index.js
    ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details. # TODO: Create a LICENSE file
