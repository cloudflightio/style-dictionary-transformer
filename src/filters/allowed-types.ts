import { TransformedToken } from 'style-dictionary';
import { radiusType } from '../models/radius';

const allowedTypes = ['dimension', 'string', 'number', 'color', radiusType];

export function filterForAllowedTypes(token: TransformedToken): boolean {
    return allowedTypes.includes(token['type']);
}
