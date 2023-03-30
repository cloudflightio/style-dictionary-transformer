import { borderColorType, borderWidthType } from './border';
import { radiusType } from './radius';
import { spacingType } from './spacing';

export const allowedTokenTypes = [
    'dimension',
    'string',
    'number',
    'color',
    radiusType,
    'custom-opacity',
    borderWidthType,
    borderColorType,
    spacingType,
] as const;
