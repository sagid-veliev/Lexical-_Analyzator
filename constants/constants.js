export const types = [
    { "int": "32-bit integer" },
    { "uint": "32-bit unsigned integer" },
    { "long": "64-bit integer" },
    { "ulong": "64-bit unsigned integer" },
    { "string": "string of chars" },
]

export const operators = [
    { "=": "assign_operation" },
    {"+": "sum_operation"},
    {"-": "subtract_operation"},
    {"*": "multiply_operation"},
    {"/": "divide_operation"},
    {"+=": "add_amount_operation"},
    {"-=": "subtract_amount_operation"},
    {"==": "are_equal_operation"},
    {">": "more_operation"},
    {"<": "less_operation"},
    {"++": "increment_operation"},
    {"--": "decrement_operation"},
    {"%": "modulo_operation"},
]

export const keywords = [ "class", "public", "private", "for", "return", "if", "else", "while" ];