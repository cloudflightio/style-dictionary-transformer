import { gradientTokenEndings } from '../../models/token-endings';
import { TransformedGradientToken } from '../../models/transformed-token';
import { CategorizedTokens } from '../models/categorized-tokens';
import { classFrom, itemsFrom, propertiesFrom } from '../util/serializer';

export function gradientToCustomProperties(tokens: CategorizedTokens['gradient']): string {
    return itemsFrom(tokens, (token) => {
        return propertiesFrom([
            `--${token.name}${gradientTokenEndings.rotation}: ${token.value.rotation};`,
            ...token.value.stops.flatMap((step, index) => {
                return [
                    `--${token.name}-${index}${gradientTokenEndings.stepPosition}: ${step.position};`,
                    `--${token.name}-${index}${gradientTokenEndings.stepColor}: ${step.color};`,
                ];
            }),
        ]);
    });
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
    return itemsFrom(tokens, (token) => {
        return [
            `$${token.name}${gradientTokenEndings.rotation}: var(--${token.name}${gradientTokenEndings.rotation});`,
            ...token.value.stops.flatMap((_step, index) => {
                return [
                    `$${token.name}-${index}${gradientTokenEndings.stepPosition}: var(--${token.name}-${index}${gradientTokenEndings.stepPosition});`,
                    `$${token.name}-${index}${gradientTokenEndings.stepColor}: var(--${token.name}-${index}${gradientTokenEndings.stepColor});`,
                ];
            }),
        ];
    });
}

function linearGradientPropertyFrom(token: TransformedGradientToken): string {
    const rotationValue = `var(--${token.name}${gradientTokenEndings.rotation})`;

    const serializedSteps = token.value.stops.flatMap((_step, index) => {
        return `var(--${token.name}-${index}${gradientTokenEndings.stepColor}) var(--${token.name}-${index}${gradientTokenEndings.stepPosition})`;
    });

    const content = [rotationValue, ...serializedSteps].join(', ');

    return `background: linear-gradient(${content});`;
}

function radialGradientPropertyFrom(token: TransformedGradientToken): string {
    const serializedSteps = token.value.stops.flatMap((_step, index) => {
        return `var(--${token.name}-${index}${gradientTokenEndings.stepColor}) var(--${token.name}-${index}${gradientTokenEndings.stepPosition})`;
    });

    const content = serializedSteps.join(', ');

    return `background: radial-gradient(${content});`;
}
