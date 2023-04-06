import { DesignToken } from 'style-dictionary';
import { shadowTokenEndings } from '../../models/token-endings';
import { colorTokenFrom, dimensionTokenFrom } from './token';

interface ShadowProperty {
    description?: string;
    type: 'custom-shadow';
    value: {
        shadowType: string;
        radius: number;
        color: string;
        offsetX: number;
        offsetY: number;
        spread: number;
    };
}

export function flattenShadow(property: ShadowProperty): Record<string, DesignToken> {
    // too complex to implement
    if (property.value.shadowType === 'innerShadow') {
        return {};
    }

    return [
        { key: shadowTokenEndings.radius, value: dimensionTokenFrom(property.value.radius) },
        { key: shadowTokenEndings.color, value: colorTokenFrom(property.value.color) },
        { key: shadowTokenEndings.offsetX, value: dimensionTokenFrom(property.value.offsetX) },
        { key: shadowTokenEndings.offsetY, value: dimensionTokenFrom(property.value.offsetY) },
    ].reduce<Record<string, DesignToken>>((acc, entry) => {
        acc[entry.key] = entry.value;

        return acc;
    }, {});
}
