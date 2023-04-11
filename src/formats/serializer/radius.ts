import { radiusTokenEndings } from '../../models/token-endings';
import { CategorizedTokens } from '../models/categorized-tokens';
import { classFrom, itemsFrom, propertiesFrom } from '../util/serializer';

export function radiusToCustomProperties(tokens: CategorizedTokens['radius']): string {
    return itemsFrom(tokens, (token) => {
        return propertiesFrom([
            `--${token.name}${radiusTokenEndings.topLeft}: ${token.value.topLeft};`,
            `--${token.name}${radiusTokenEndings.topRight}: ${token.value.topRight};`,
            `--${token.name}${radiusTokenEndings.bottomLeft}: ${token.value.bottomLeft};`,
            `--${token.name}${radiusTokenEndings.bottomRight}: ${token.value.bottomRight};`,
        ]);
    });
}

export function radiusToCssClasses(tokens: CategorizedTokens['radius']): string {
    return itemsFrom(tokens, (token) => {
        return classFrom(token.name, [
            `border-top-left-radius: var(--${token.name}${radiusTokenEndings.topLeft});`,
            `border-top-right-radius: var(--${token.name}${radiusTokenEndings.topRight});`,
            `border-bottom-left-radius: var(--${token.name}${radiusTokenEndings.bottomLeft});`,
            `border-bottom-right-radius: var(--${token.name}${radiusTokenEndings.bottomRight});`,
        ]);
    });
}

export function radiusToScssVariables(tokens: CategorizedTokens['radius']): string {
    return itemsFrom(tokens, (token) => [
        `$${token.name}${radiusTokenEndings.topLeft}: var(--${token.name}${radiusTokenEndings.topLeft});`,
        `$${token.name}${radiusTokenEndings.topRight}: var(--${token.name}${radiusTokenEndings.topRight});`,
        `$${token.name}${radiusTokenEndings.bottomLeft}: var(--${token.name}${radiusTokenEndings.bottomLeft});`,
        `$${token.name}${radiusTokenEndings.bottomRight}: var(--${token.name}${radiusTokenEndings.bottomRight});`,
    ]);
}
