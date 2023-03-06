import { TransformedToken } from 'style-dictionary';

const allowedTypes = ['dimension', 'string', 'number', 'color'];

export function filterForAllowedTypes(token: TransformedToken): boolean {
    return allowedTypes.includes(token['type']);
}
