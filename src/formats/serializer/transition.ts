import {transitionTokenEndings} from '../../models/token-endings';
import {TransformedTransitionToken} from '../../models/transformed-token';
import {CategorizedTokens} from '../models/categorized-tokens';
import {classFrom, itemsFrom, propertiesFrom} from '../util/serializer';

export function transitionToCustomProperties(tokens: CategorizedTokens['transition']): string {
    return itemsFrom(tokens, (token) => propertiesFrom([
        `--${token.name}${transitionTokenEndings.duration}: ${token.value.duration};`,
        `--${token.name}${transitionTokenEndings.timingFunction}: ${timingFunctionFrom(token)};`,
    ]));
}

export function transitionToCssClassesReferencingCustomProperties(tokens: CategorizedTokens['transition']): string {
    return itemsFrom(tokens, (token) => classFrom(token.name, [
        `transition-duration: var(--${token.name}${transitionTokenEndings.duration});`,
        `transition-timing-function: var(--${token.name}${transitionTokenEndings.timingFunction});`,
    ]));
}

export function transitionToScssVariablesReferencingCustomProperties(tokens: CategorizedTokens['transition']): string {
    return itemsFrom(tokens, (token) => [
        `$${token.name}${transitionTokenEndings.duration}: var(--${token.name}${transitionTokenEndings.duration});`,
        `$${token.name}${transitionTokenEndings.timingFunction}: var(--${token.name}${transitionTokenEndings.timingFunction});`,
    ]);
}

export function transitionToCssClasses(tokens: CategorizedTokens['transition']): string {
    return itemsFrom(tokens, (token) => classFrom(token.name, [
        `transition-duration: $${token.name}${transitionTokenEndings.duration};`,
        `transition-timing-function: $${token.name}${transitionTokenEndings.timingFunction};`,
    ]));
}

export function transitionToScssVariables(tokens: CategorizedTokens['transition']): string {
    return itemsFrom(tokens, (token) => [
        `$${token.name}${transitionTokenEndings.duration}: ${token.value.duration} !default;`,
        `$${token.name}${transitionTokenEndings.timingFunction}: ${timingFunctionFrom(token)} !default;`,
    ]);
}

function timingFunctionFrom(token: TransformedTransitionToken): string {
    const values = [
        token.value.easingFunction.x1,
        token.value.easingFunction.x2,
        token.value.easingFunction.y1,
        token.value.easingFunction.y2,
    ];

    return `cubic-bezier(${values.join(', ')})`;
}
