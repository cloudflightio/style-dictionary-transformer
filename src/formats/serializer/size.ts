import {CategorizedTokens} from '../models/categorized-tokens';
import {itemsFrom} from '../util/serializer';

export function sizeToCustomProperties(tokens: CategorizedTokens['size']): string {
    return itemsFrom(tokens, (token) => `    --${token.name}: ${token.value};`);
}

export function sizeToScssVariablesReferencingCustomProperties(tokens: CategorizedTokens['size']): string {
    return itemsFrom(tokens, (token) => `$${token.name}: var(--${token.name});`);
}

export function sizeToScssVariables(tokens: CategorizedTokens['size']): string {
    return itemsFrom(tokens, (token) => `$${token.name}: ${token.value} !default;`);
}
