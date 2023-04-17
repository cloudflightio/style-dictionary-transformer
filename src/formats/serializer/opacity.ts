import {CategorizedTokens} from '../models/categorized-tokens';
import {itemsFrom} from '../util/serializer';

export function opacityToCustomProperties(tokens: CategorizedTokens['opacity']): string {
    return itemsFrom(tokens, (token) => `    --${token.name}: ${token.value};`);
}

export function opacityToScssVariables(tokens: CategorizedTokens['opacity']): string {
    return itemsFrom(tokens, (token) => `$${token.name}: var(--${token.name});`);
}
