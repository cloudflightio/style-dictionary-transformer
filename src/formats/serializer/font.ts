import {fontTokenEndings} from '../../models/token-endings';
import {CategorizedTokens} from '../models/categorized-tokens';
import {classFrom, itemsFrom, propertiesFrom} from '../util/serializer';

export function fontToCustomProperties(tokens: CategorizedTokens['font']): string {
    return itemsFrom(tokens, (token) => propertiesFrom([
        `--${token.name}${fontTokenEndings.fontSize}: ${token.value.fontSize};`,
        `--${token.name}${fontTokenEndings.textDecoration}: ${token.value.textDecoration};`,
        `--${token.name}${fontTokenEndings.fontFamily}: ${token.value.fontFamily};`,
        `--${token.name}${fontTokenEndings.fontWeight}: ${token.value.fontWeight};`,
        `--${token.name}${fontTokenEndings.fontStyle}: ${token.value.fontStyle};`,
        `--${token.name}${fontTokenEndings.fontStretch}: ${token.value.fontStretch};`,
        `--${token.name}${fontTokenEndings.letterSpacing}: ${token.value.letterSpacing};`,
        `--${token.name}${fontTokenEndings.lineHeight}: ${token.value.lineHeight};`,
        `--${token.name}${fontTokenEndings.paragraphIndent}: ${token.value.paragraphIndent};`,
        `--${token.name}${fontTokenEndings.textCase}: ${token.value.textCase};`,
    ]));
}

export function fontToCssClassesReferencingCustomProperties(tokens: CategorizedTokens['font']): string {
    return itemsFrom(tokens, (token) => classFrom(token.name, [
        `font-family: var(--${token.name}${fontTokenEndings.fontFamily});`,
        `font-size: var(--${token.name}${fontTokenEndings.fontSize});`,
        `font-stretch: var(--${token.name}${fontTokenEndings.fontStretch});`,
        `font-style: var(--${token.name}${fontTokenEndings.fontStyle});`,
        `font-weight: var(--${token.name}${fontTokenEndings.fontWeight});`,
        `letter-spacing: var(--${token.name}${fontTokenEndings.letterSpacing});`,
        `line-height: var(--${token.name}${fontTokenEndings.lineHeight});`,
        `text-indent: var(--${token.name}${fontTokenEndings.paragraphIndent});`,
        `text-transform: var(--${token.name}${fontTokenEndings.textCase});`,
        `text-decoration: var(--${token.name}${fontTokenEndings.textDecoration});`,
    ]));
}

export function fontToScssVariablesReferencingCustomProperties(tokens: CategorizedTokens['font']): string {
    return itemsFrom(tokens, (token) => [
        `$${token.name}${fontTokenEndings.fontSize}: var(--${token.name}${fontTokenEndings.fontSize});`,
        `$${token.name}${fontTokenEndings.textDecoration}: var(--${token.name}${fontTokenEndings.textDecoration});`,
        `$${token.name}${fontTokenEndings.fontFamily}: var(--${token.name}${fontTokenEndings.fontFamily});`,
        `$${token.name}${fontTokenEndings.fontWeight}: var(--${token.name}${fontTokenEndings.fontWeight});`,
        `$${token.name}${fontTokenEndings.fontStyle}: var(--${token.name}${fontTokenEndings.fontStyle});`,
        `$${token.name}${fontTokenEndings.fontStretch}: var(--${token.name}${fontTokenEndings.fontStretch});`,
        `$${token.name}${fontTokenEndings.letterSpacing}: var(--${token.name}${fontTokenEndings.letterSpacing});`,
        `$${token.name}${fontTokenEndings.lineHeight}: var(--${token.name}${fontTokenEndings.lineHeight});`,
        `$${token.name}${fontTokenEndings.paragraphIndent}: var(--${token.name}${fontTokenEndings.paragraphIndent});`,
        `$${token.name}${fontTokenEndings.textCase}: var(--${token.name}${fontTokenEndings.textCase});`,
    ]);
}

export function fontToCssClasses(tokens: CategorizedTokens['font']): string {
    return itemsFrom(tokens, (token) => classFrom(token.name, [
        `font-family: $${token.name}${fontTokenEndings.fontFamily};`,
        `font-size: $${token.name}${fontTokenEndings.fontSize};`,
        `font-stretch: $${token.name}${fontTokenEndings.fontStretch};`,
        `font-style: $${token.name}${fontTokenEndings.fontStyle};`,
        `font-weight: $${token.name}${fontTokenEndings.fontWeight};`,
        `letter-spacing: $${token.name}${fontTokenEndings.letterSpacing};`,
        `line-height: $${token.name}${fontTokenEndings.lineHeight};`,
        `text-indent: $${token.name}${fontTokenEndings.paragraphIndent};`,
        `text-transform: $${token.name}${fontTokenEndings.textCase};`,
        `text-decoration: $${token.name}${fontTokenEndings.textDecoration};`,
    ]));
}

export function fontToScssVariables(tokens: CategorizedTokens['font']): string {
    return itemsFrom(tokens, (token) => [
        `$${token.name}${fontTokenEndings.fontSize}: ${token.value.fontSize} !default;`,
        `$${token.name}${fontTokenEndings.textDecoration}: ${token.value.textDecoration} !default;`,
        `$${token.name}${fontTokenEndings.fontFamily}: ${token.value.fontFamily} !default;`,
        `$${token.name}${fontTokenEndings.fontWeight}: ${token.value.fontWeight} !default;`,
        `$${token.name}${fontTokenEndings.fontStyle}: ${token.value.fontStyle} !default;`,
        `$${token.name}${fontTokenEndings.fontStretch}: ${token.value.fontStretch} !default;`,
        `$${token.name}${fontTokenEndings.letterSpacing}: ${token.value.letterSpacing} !default;`,
        `$${token.name}${fontTokenEndings.lineHeight}: ${token.value.lineHeight} !default;`,
        `$${token.name}${fontTokenEndings.paragraphIndent}: ${token.value.paragraphIndent} !default;`,
        `$${token.name}${fontTokenEndings.textCase}: ${token.value.textCase} !default;`,
    ]);
}
