import { TransformedToken } from 'style-dictionary';
import { isTransitionTimingFunction } from '../../../models/transition';

export function customPropertySectionFrom(tokens: TransformedToken[]): string {
    const customProperties = tokens.map((token) => {
        if (typeof token.value === 'object' && token.value != null) {
            return `--${token.name}: ${transformObject(token.value)};`;
        } else {
            return `--${token.name}: ${token.value};`;
        }
    });
    const formattedCustomProperties = customProperties.map((property) => `    ${property}\n`);

    return `:root {\n${formattedCustomProperties.join('')}}`;
}

function transformObject(value: object): string {
    if (isTransitionTimingFunction(value)) {
        return `cubic-bezier(${value.easingFunction.x1}, ${value.easingFunction.x2}, ${value.easingFunction.y1}, ${value.easingFunction.y2})`;
    } else {
        return String(value);
    }
}
