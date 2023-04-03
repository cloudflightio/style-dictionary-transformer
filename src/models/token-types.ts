export const tokenTypes = {
    dimension: 'dimension',
    string: 'string',
    number: 'number',
    time: 'time',
    color: 'color',
    object: 'object',
} as const;

export const allowedTokenTypes = Object.values(tokenTypes);
