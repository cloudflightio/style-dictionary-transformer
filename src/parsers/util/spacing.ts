import { DesignToken } from 'style-dictionary';
import { spacingTokenEndings } from '../../models/token-endings';
import { tokenTypes } from '../../models/token-types';

export interface SpacingProperty {
    description?: string;
    type: 'custom-spacing';
    value: {
        top: number;
        bottom: number;
        left: number;
        right: number;
    };
}

export function flattenSpacing(properties: Record<string, SpacingProperty>): Record<string, DesignToken> {
    return Object.entries(properties)
        .flatMap(([key, value]) => [
            { key: key + spacingTokenEndings.top, value: tokenFrom(value.value.top) },
            { key: key + spacingTokenEndings.right, value: tokenFrom(value.value.right) },
            { key: key + spacingTokenEndings.left, value: tokenFrom(value.value.left) },
            { key: key + spacingTokenEndings.bottom, value: tokenFrom(value.value.bottom) },
        ])
        .reduce<Record<string, DesignToken>>((acc, entry) => {
            acc[entry.key] = entry.value;

            return acc;
        }, {});
}

function tokenFrom(value: number): DesignToken {
    return {
        value,
        type: tokenTypes.dimension,
    };
}
