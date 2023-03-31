import { DesignToken } from 'style-dictionary';
import { radiusTokenEndings } from '../../models/token-endings';
import { dimensionTokenFrom } from './token';

interface RadiusProperty {
    description?: string;
    type: 'custom-radius';
    value: {
        smoothing: number;
        topLeft: number;
        topRight: number;
        bottomLeft: number;
        bottomRight: number;
    };
}

export function flattenRadius(property: RadiusProperty): Record<string, DesignToken> {
    return [
        { key: radiusTokenEndings.topLeft, value: dimensionTokenFrom(property.value.topLeft) },
        { key: radiusTokenEndings.topRight, value: dimensionTokenFrom(property.value.topRight) },
        { key: radiusTokenEndings.bottomLeft, value: dimensionTokenFrom(property.value.bottomLeft) },
        { key: radiusTokenEndings.bottomRight, value: dimensionTokenFrom(property.value.bottomRight) },
    ].reduce<Record<string, DesignToken>>((acc, entry) => {
        acc[entry.key] = entry.value;

        return acc;
    }, {});
}
