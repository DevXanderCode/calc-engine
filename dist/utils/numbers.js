/**
 * Check if character is a digit
 */
export function isDigit(char) {
    //   return char >= "0" && char <= "9";
    return !isNaN(parseFloat(char)) && isFinite(Number(char));
}
export function evaluate(firstOpn, opr, secondOpn) {
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
export function addAll(nums) {
    let res = 0;
    if (nums.length === 0)
        return 0;
    for (const num of nums) {
        res += num;
    }
    return res;
}
//# sourceMappingURL=numbers.js.map