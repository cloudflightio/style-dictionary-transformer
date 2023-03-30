import { DesignToken } from 'style-dictionary';
import { radiusTokenEndings, radiusType } from '../../models/radius';

export interface RadiusProperty {
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

export function flattenRadius(properties: Record<string, RadiusProperty>): Record<string, DesignToken> {
    return Object.entries(properties)
        .flatMap(([key, value]) => [
            { key: key + radiusTokenEndings.topLeft, value: tokenFrom(value.value.topLeft) },
            { key: key + radiusTokenEndings.topRight, value: tokenFrom(value.value.topRight) },
            { key: key + radiusTokenEndings.bottomLeft, value: tokenFrom(value.value.bottomLeft) },
            { key: key + radiusTokenEndings.bottomRight, value: tokenFrom(value.value.bottomRight) },
        ])
        .reduce<Record<string, DesignToken>>((acc, entry) => {
            acc[entry.key] = entry.value;

            return acc;
        }, {});
}

function tokenFrom(value: number): DesignToken {
    return {
        value,
        type: radiusType,
    };
}
