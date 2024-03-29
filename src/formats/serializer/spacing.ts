import {spacingTokenEndings} from '../../models/token-endings';
import {CategorizedTokens} from '../models/categorized-tokens';
import {classFrom, itemsFrom, propertiesFrom} from '../util/serializer';

export function spacingToCustomProperties(tokens: CategorizedTokens['spacing']): string {
    return itemsFrom(tokens, (token) => propertiesFrom([
        `--${token.name}${spacingTokenEndings.top}: ${token.value.top};`,
        `--${token.name}${spacingTokenEndings.right}: ${token.value.right};`,
        `--${token.name}${spacingTokenEndings.left}: ${token.value.left};`,
        `--${token.name}${spacingTokenEndings.bottom}: ${token.value.bottom};`,
    ]));
}

export function spacingToCssClassesReferencingCustomProperties(tokens: CategorizedTokens['spacing']): string {
    return itemsFrom(tokens, (token) => classFrom(token.name, [
        `padding-top: var(--${token.name}${spacingTokenEndings.top});`,
        `padding-right: var(--${token.name}${spacingTokenEndings.right});`,
        `padding-left: var(--${token.name}${spacingTokenEndings.left});`,
        `padding-bottom: var(--${token.name}${spacingTokenEndings.bottom});`,
    ]));
}

export function spacingToScssVariablesReferencingCustomProperties(tokens: CategorizedTokens['spacing']): string {
    return itemsFrom(tokens, (token) => [
        `$${token.name}${spacingTokenEndings.top}: var(--${token.name}${spacingTokenEndings.top});`,
        `$${token.name}${spacingTokenEndings.right}: var(--${token.name}${spacingTokenEndings.right});`,
        `$${token.name}${spacingTokenEndings.left}: var(--${token.name}${spacingTokenEndings.left});`,
        `$${token.name}${spacingTokenEndings.bottom}: var(--${token.name}${spacingTokenEndings.bottom});`,
    ]);
}

export function spacingToCssClasses(tokens: CategorizedTokens['spacing']): string {
    return itemsFrom(tokens, (token) => classFrom(token.name, [
        `padding-top: $${token.name}${spacingTokenEndings.top};`,
        `padding-right: $${token.name}${spacingTokenEndings.right};`,
        `padding-left: $${token.name}${spacingTokenEndings.left};`,
        `padding-bottom: $${token.name}${spacingTokenEndings.bottom};`,
    ]));
}

export function spacingToScssVariables(tokens: CategorizedTokens['spacing']): string {
    return itemsFrom(tokens, (token) => [
        `$${token.name}${spacingTokenEndings.top}: ${token.value.top} !default;`,
        `$${token.name}${spacingTokenEndings.right}: ${token.value.right} !default;`,
        `$${token.name}${spacingTokenEndings.left}: ${token.value.left} !default;`,
        `$${token.name}${spacingTokenEndings.bottom}: ${token.value.bottom} !default;`,
    ]);
}
