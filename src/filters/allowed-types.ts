import { TransformedToken } from 'style-dictionary';
import { borderColorType, borderWidthType } from '../models/border';
import { radiusType } from '../models/radius';
import { spacingType } from '../models/spacing';

const allowedTypes = [
    'dimension',
    'string',
    'number',
    'color',
    radiusType,
    'custom-opacity',
    borderWidthType,
    borderColorType,
    spacingType,
];

export function filterForAllowedTypes(token: TransformedToken): boolean {
    return allowedTypes.includes(token['type']);
}
