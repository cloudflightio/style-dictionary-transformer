import {gradientTokenEndings} from '../../models/token-endings';
import {TransformedGradientToken} from '../../models/transformed-token';
import {CategorizedTokens} from '../models/categorized-tokens';
import {classFrom, itemsFrom, propertiesFrom} from '../util/serializer';

export function gradientToCustomProperties(tokens: CategorizedTokens['gradient']): string {
    return itemsFrom(tokens, (token) => propertiesFrom([
        `--${token.name}${gradientTokenEndings.rotation}: ${token.value.rotation};`,
        ...token.value.stops.flatMap((step, index) => [
            `--${token.name}-${index}${gradientTokenEndings.stepPosition}: ${step.position};`,
            `--${token.name}-${index}${gradientTokenEndings.stepColor}: ${step.color};`,
        ]),
    ]));
}

export function gradientToCssClassesReferencingCustomProperties(tokens: CategorizedTokens['gradient']): string {
    return itemsFrom(tokens, (token) => {
        switch (token.value.gradientType) {
            case 'linear':
                return classFrom(token.name, [linearGradientPropertyReferencingCustomPropertiesFrom(token)]);
            case 'radial':
                return classFrom(token.name, [radialGradientPropertyReferencingCustomPropertiesFrom(token)]);
            default:
                return [];
        }
    });
}

export function gradientToScssVariablesReferencingCustomProperties(tokens: CategorizedTokens['gradient']): string {
    return itemsFrom(tokens, (token) => [
        `$${token.name}${gradientTokenEndings.rotation}: var(--${token.name}${gradientTokenEndings.rotation});`,
        ...token.value.stops.flatMap((_step, index) => [
            `$${token.name}-${index}${gradientTokenEndings.stepPosition}: var(--${token.name}-${index}${gradientTokenEndings.stepPosition});`,
            `$${token.name}-${index}${gradientTokenEndings.stepColor}: var(--${token.name}-${index}${gradientTokenEndings.stepColor});`,
        ]),
    ]);
}

export function gradientToCssClasses(tokens: CategorizedTokens['gradient']): string {
    return itemsFrom(tokens, (token) => {
        switch (token.value.gradientType) {
            case 'linear':
                return classFrom(token.name, [linearGradientPropertyFrom(token)]);
            case 'radial':
                return classFrom(token.name, [radialGradientPropertyFrom(token)]);
            default:
                return [];
        }
    });
}

export function gradientToScssVariables(tokens: CategorizedTokens['gradient']): string {
    return itemsFrom(tokens, (token) => [
        `$${token.name}${gradientTokenEndings.rotation}: ${token.value.rotation} !default;`,
        ...token.value.stops.flatMap((step, index) => [
            `$${token.name}-${index}${gradientTokenEndings.stepPosition}: ${step.position} !default;`,
            `$${token.name}-${index}${gradientTokenEndings.stepColor}: ${step.color} !default;`,
        ]),
    ]);
}

function linearGradientPropertyReferencingCustomPropertiesFrom(token: TransformedGradientToken): string {
    const rotationValue = `var(--${token.name}${gradientTokenEndings.rotation})`;

    const serializedSteps = token.value.stops.flatMap((_step, index) => `var(--${token.name}-${index}${gradientTokenEndings.stepColor}) var(--${token.name}-${index}${gradientTokenEndings.stepPosition})`);

    const content = [rotationValue, ...serializedSteps].join(', ');

    return `background: linear-gradient(${content});`;
}

function radialGradientPropertyReferencingCustomPropertiesFrom(token: TransformedGradientToken): string {
    const serializedSteps = token.value.stops.flatMap((_step, index) => `var(--${token.name}-${index}${gradientTokenEndings.stepColor}) var(--${token.name}-${index}${gradientTokenEndings.stepPosition})`);

    const content = serializedSteps.join(', ');

    return `background: radial-gradient(${content});`;
}
function linearGradientPropertyFrom(token: TransformedGradientToken): string {
    const rotationValue = `$${token.name}${gradientTokenEndings.rotation}`;

    const serializedSteps = token.value.stops.flatMap((_step, index) => `$${token.name}-${index}${gradientTokenEndings.stepColor} $${token.name}-${index}${gradientTokenEndings.stepPosition}`);

    const content = [rotationValue, ...serializedSteps].join(', ');

    return `background: linear-gradient(${content});`;
}

function radialGradientPropertyFrom(token: TransformedGradientToken): string {
    const serializedSteps = token.value.stops.flatMap((_step, index) => `$${token.name}-${index}${gradientTokenEndings.stepColor} $${token.name}-${index}${gradientTokenEndings.stepPosition}`);

    const content = serializedSteps.join(', ');

    return `background: radial-gradient(${content});`;
}
