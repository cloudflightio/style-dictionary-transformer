import { TransformedToken } from 'style-dictionary';
import { CategorizedTokens, GradientTokenGroup } from '../models/token-category';
import { classesFrom, classFrom } from './serialize-class-util';

type GradientKind = 'linear' | 'radial';

export function gradientClassesFrom(category: CategorizedTokens['gradient']): string {
    return classesFrom(category, (groupName, tokens) => {
        const kind = tokens.kind != null ? gradientKindFrom(tokens.kind.value) : undefined;

        if (kind == null || tokens.steps == null) {
            return '';
        }

        switch (kind) {
            case 'linear':
                return classFrom(groupName, [linearGradientPropertyFrom(tokens.rotation, tokens.steps)]);
            case 'radial':
                return classFrom(groupName, [radialGradientPropertyFrom(tokens.steps)]);
        }
    });
}

function gradientKindFrom(kind: string): GradientKind | undefined {
    switch (kind) {
        case 'linear':
            return 'linear';
        case 'radial':
            return 'radial';
        case 'angular':
        case 'diamond':
        default:
            return undefined;
    }
}

function linearGradientPropertyFrom(
    rotation: TransformedToken | undefined,
    steps: GradientTokenGroup['steps'],
): string {
    const rotationValue = rotation != null ? `var(--${rotation.name})` : '0deg';

    const serializedSteps = steps.flatMap((step) => {
        if (step.stepColor == null || step.stepPosition == null) {
            return [];
        } else {
            return `var(--${step.stepColor.name}) var(--${step.stepPosition.name})`;
        }
    });

    const content = [rotationValue, ...serializedSteps].join(', ');

    return `background: linear-gradient(${content});`;
}

function radialGradientPropertyFrom(steps: GradientTokenGroup['steps']): string {
    const serializedSteps = steps.flatMap((step) => {
        if (step.stepColor == null || step.stepPosition == null) {
            return [];
        } else {
            return `var(--${step.stepColor.name}) var(--${step.stepPosition.name})`;
        }
    });

    const content = serializedSteps.join(', ');

    return `background: radial-gradient(${content});`;
}
