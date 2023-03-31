import { DesignToken } from 'style-dictionary';
import { spacingTokenEndings } from '../../models/token-endings';
import { dimensionTokenFrom } from './token';

interface SpacingProperty {
    description?: string;
    type: 'custom-spacing';
    value: {
        top: number;
        bottom: number;
        left: number;
        right: number;
    };
}

export function flattenSpacing(property: SpacingProperty): Record<string, DesignToken> {
    return [
        { key: spacingTokenEndings.top, value: dimensionTokenFrom(property.value.top) },
        { key: spacingTokenEndings.right, value: dimensionTokenFrom(property.value.right) },
        { key: spacingTokenEndings.left, value: dimensionTokenFrom(property.value.left) },
        { key: spacingTokenEndings.bottom, value: dimensionTokenFrom(property.value.bottom) },
    ].reduce<Record<string, DesignToken>>((acc, entry) => {
        acc[entry.key] = entry.value;

        return acc;
    }, {});
}
