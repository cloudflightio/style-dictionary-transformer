import { DesignToken } from 'style-dictionary';
import { radiusType } from '../../models/radius';

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
            { key: `${key}-top-left`, value: tokenFrom(value.value.topLeft) },
            { key: `${key}-top-right`, value: tokenFrom(value.value.topRight) },
            { key: `${key}-bottom-left`, value: tokenFrom(value.value.bottomLeft) },
            { key: `${key}-bottom-right`, value: tokenFrom(value.value.bottomRight) },
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
