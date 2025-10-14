export const priorityMap = {
    "(": 4,
    "^": 3,
    "/": 2,
    "*": 2,
    "+": 1,
    "-": 1,
};
export const OPERATORS = new Set([...Object.keys(priorityMap), ")"]);
export const BLANKSPACE = [" ", "\r", "\t", "\n"];
//# sourceMappingURL=constants.js.map