import { DesignToken } from 'style-dictionary';
import { borderTokenEndings } from '../../models/token-endings';
import { colorTokenFrom, dimensionTokenFrom } from './token';

interface BorderProperty {
    description?: string;
    type: 'custom-stroke';
    value: {
        align: 'inside' | 'center' | 'outside';
        dashPattern: number[];
        lineCap: string;
        lineJoin: string;
        miterLimit: number;
        weight: number;
        color: string;
    };
}

export function flattenBorder(property: BorderProperty): Record<string, DesignToken> {
    return [
        { key: borderTokenEndings.width, value: dimensionTokenFrom(property.value.weight) },
        { key: borderTokenEndings.color, value: colorTokenFrom(property.value.color) },
    ].reduce<Record<string, DesignToken>>((acc, entry) => {
        acc[entry.key] = entry.value;

        return acc;
    }, {});
}
