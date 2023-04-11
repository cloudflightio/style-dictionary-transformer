import { CategorizedTokens } from '../models/categorized-tokens';
import { itemsFrom } from '../util/serializer';

export function colorToCustomProperties(tokens: CategorizedTokens['color']): string {
    return itemsFrom(tokens, (token) => `    --${token.name}: ${token.value};`);
}

export function colorToScssVariables(tokens: CategorizedTokens['color']): string {
    return itemsFrom(tokens, (token) => `$${token.name}: var(--${token.name});`);
}
