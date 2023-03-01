import { TransformedToken } from 'style-dictionary';

const allowedTypes = ['dimension', 'string', 'number', 'color', 'custom-fontStyle', 'custom-shadow'];

export function filterForAllowedTypes(token: TransformedToken): boolean {
    return allowedTypes.includes(token['type']);
}
