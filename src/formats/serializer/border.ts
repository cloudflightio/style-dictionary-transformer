import { borderTokenEndings } from '../../models/token-endings';
import { CategorizedTokens } from '../models/categorized-tokens';
import { itemsFrom, classFrom, propertiesFrom } from '../util/serializer';

export function borderToCustomProperties(tokens: CategorizedTokens['border']): string {
    return itemsFrom(tokens, (token) => {
        return propertiesFrom([
            `--${token.name}${borderTokenEndings.width}: ${token.value.width};`,
            `--${token.name}${borderTokenEndings.color}: ${token.value.color};`,
        ]);
    });
}

export function borderToCssClasses(tokens: CategorizedTokens['border']): string {
    return itemsFrom(tokens, (token) => {
        return classFrom(token.name, [
            `border-width: var(--${token.name}${borderTokenEndings.width});`,
            `border-color: var(--${token.name}${borderTokenEndings.color});`,
        ]);
    });
}

export function borderToScssVariables(tokens: CategorizedTokens['border']): string {
    return itemsFrom(tokens, (token) => [
        `$${token.name}${borderTokenEndings.width}: var(--${token.name}${borderTokenEndings.width});`,
        `$${token.name}${borderTokenEndings.color}: var(--${token.name}${borderTokenEndings.color});`,
    ]);
}
