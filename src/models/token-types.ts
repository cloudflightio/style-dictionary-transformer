export const tokenTypes = {
    dimension: 'dimension',
    string: 'string',
    number: 'number',
    color: 'color',
} as const;

export const allowedTokenTypes = Object.values(tokenTypes);
