import { DesignToken } from 'style-dictionary';
import { tokenTypes } from '../../models/token-types';

export interface OpacityProperty {
    description?: string;
    type: 'custom-opacity';
    value: number;
}

export function flattenOpacity(properties: Record<string, OpacityProperty>): Record<string, DesignToken> {
    return Object.entries(properties)
        .flatMap(([key, value]) => [{ key, value: tokenFrom(value.value) }])
        .reduce<Record<string, DesignToken>>((acc, entry) => {
            acc[entry.key] = entry.value;

            return acc;
        }, {});
}

function tokenFrom(value: number): DesignToken {
    return {
        value,
        type: tokenTypes.number,
    };
}
