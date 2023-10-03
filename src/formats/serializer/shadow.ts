import {shadowTokenEndings} from '../../models/token-endings';
import {CategorizedTokens} from '../models/categorized-tokens';
import {classFrom, itemsFrom, propertiesFrom} from '../util/serializer';

export function shadowToCustomProperties(tokens: CategorizedTokens['shadow']): string {
    return itemsFrom(tokens, (token) => propertiesFrom([
        `--${token.name}${shadowTokenEndings.radius}: ${token.value.radius};`,
        `--${token.name}${shadowTokenEndings.color}: ${token.value.color};`,
        `--${token.name}${shadowTokenEndings.offsetX}: ${token.value.offsetX};`,
        `--${token.name}${shadowTokenEndings.offsetY}: ${token.value.offsetY};`,
    ]));
}

export function shadowToCssClassesReferencingCustomProperties(tokens: CategorizedTokens['shadow']): string {
    return itemsFrom(tokens, (token) => {
        const values = [
            `var(--${token.name}${shadowTokenEndings.offsetX})`,
            `var(--${token.name}${shadowTokenEndings.offsetY})`,
            `var(--${token.name}${shadowTokenEndings.radius})`,
            `var(--${token.name}${shadowTokenEndings.color})`,
        ];

        return classFrom(token.name, [`filter: drop-shadow(${values.join(' ')});`]);
    });
}

export function shadowToScssVariablesReferencingCustomProperties(tokens: CategorizedTokens['shadow']): string {
    return itemsFrom(tokens, (token) => [
        `$${token.name}${shadowTokenEndings.radius}: var(--${token.name}${shadowTokenEndings.radius});`,
        `$${token.name}${shadowTokenEndings.color}: var(--${token.name}${shadowTokenEndings.color});`,
        `$${token.name}${shadowTokenEndings.offsetX}: var(--${token.name}${shadowTokenEndings.offsetX});`,
        `$${token.name}${shadowTokenEndings.offsetY}: var(--${token.name}${shadowTokenEndings.offsetY});`,
    ]);
}

export function shadowToCssClasses(tokens: CategorizedTokens['shadow']): string {
    return itemsFrom(tokens, (token) => {
        const values = [
            `$${token.name}${shadowTokenEndings.offsetX}`,
            `$${token.name}${shadowTokenEndings.offsetY}`,
            `$${token.name}${shadowTokenEndings.radius}`,
            `$${token.name}${shadowTokenEndings.color}`,
        ];

        return classFrom(token.name, [`filter: drop-shadow(${values.join(' ')});`]);
    });
}

export function shadowToScssVariables(tokens: CategorizedTokens['shadow']): string {
    return itemsFrom(tokens, (token) => [
        `$${token.name}${shadowTokenEndings.radius}: ${token.value.radius} !default;`,
        `$${token.name}${shadowTokenEndings.color}: ${token.value.color} !default;`,
        `$${token.name}${shadowTokenEndings.offsetX}: ${token.value.offsetX} !default;`,
        `$${token.name}${shadowTokenEndings.offsetY}: ${token.value.offsetY} !default;`,
    ]);
}
