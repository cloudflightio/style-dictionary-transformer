import produce from 'immer';
import { TransformedToken } from 'style-dictionary';
import {
    borderTokenEndings,
    fontTokenEndings,
    gradientTokenEndings,
    radiusTokenEndings,
    shadowTokenEndings,
    spacingTokenEndings,
    transitionTokenEndings,
} from '../../../models/token-endings';
import {
    BorderCategory,
    FontCategory,
    GradientCategory,
    RadiusCategory,
    ShadowCategory,
    SpacingCategory,
    TokenCategory,
    TransitionCategory,
} from '../models/token-category';
import { groupNameOf, propertyOf } from './token-category-util';

export function tokenCategorizationFrom(token: TransformedToken): TokenCategory | undefined {
    switch (token.attributes?.category) {
        case 'radius':
            return radiusCategoryOf(token);
        case 'borders':
            return borderCategoryOf(token);
        case 'spacing':
            return spacingCategoryOf(token);
        case 'font':
            return fontCategoryOf(token);
        case 'motion':
            return transitionCategoryOf(token);
        case 'gradient':
            return gradientCategoryOf(token);
        case 'effect':
            return shadowCategoryOf(token);
        default:
            return undefined;
    }
}

function borderCategoryOf(token: TransformedToken): BorderCategory | undefined {
    const property = propertyOf(token.name, borderTokenEndings);
    const groupName = groupNameOf(token.name, Object.values(borderTokenEndings));

    if (property == null || groupName == null) {
        return undefined;
    }

    return {
        type: 'border',
        groupName,
        applyFn(group) {
            return produce(group, (draft) => {
                draft[property] = token;
            });
        },
    };
}

function fontCategoryOf(token: TransformedToken): FontCategory | undefined {
    const property = propertyOf(token.name, fontTokenEndings);
    const groupName = groupNameOf(token.name, Object.values(fontTokenEndings));

    if (property == null || groupName == null) {
        return undefined;
    }

    return {
        type: 'font',
        groupName,
        applyFn(group) {
            return produce(group, (draft) => {
                draft[property] = token;
            });
        },
    };
}

function radiusCategoryOf(token: TransformedToken): RadiusCategory | undefined {
    const property = propertyOf(token.name, radiusTokenEndings);
    const groupName = groupNameOf(token.name, Object.values(radiusTokenEndings));

    if (property == null || groupName == null) {
        return undefined;
    }

    return {
        type: 'radius',
        groupName,
        applyFn(group) {
            return produce(group, (draft) => {
                draft[property] = token;
            });
        },
    };
}

function spacingCategoryOf(token: TransformedToken): SpacingCategory | undefined {
    const property = propertyOf(token.name, spacingTokenEndings);
    const groupName = groupNameOf(token.name, Object.values(spacingTokenEndings));

    if (property == null || groupName == null) {
        return undefined;
    }

    return {
        type: 'spacing',
        groupName,
        applyFn(group) {
            return produce(group, (draft) => {
                draft[property] = token;
            });
        },
    };
}

function transitionCategoryOf(token: TransformedToken): TransitionCategory | undefined {
    const property = propertyOf(token.name, transitionTokenEndings);
    const groupName = groupNameOf(token.name, Object.values(transitionTokenEndings));

    if (property == null || groupName == null) {
        return undefined;
    }

    return {
        type: 'transition',
        groupName,
        applyFn(group) {
            return produce(group, (draft) => {
                draft[property] = token;
            });
        },
    };
}

function gradientCategoryOf(token: TransformedToken): GradientCategory | undefined {
    const property = propertyOf(token.name, gradientTokenEndings);
    const groupName = groupNameOf(token.name, Object.values(gradientTokenEndings));

    if (property == null || groupName == null) {
        return undefined;
    }

    const stepIndex = gradientStepIndexOf(groupName);
    let properGroupName: string;

    switch (property) {
        case 'rotation': // fall through
        case 'kind':
            properGroupName = groupName;
            break;
        case 'stepColor': // fall through
        case 'stepPosition':
            properGroupName = groupName.slice(0, groupName.length - 2);
            break;
    }

    return {
        type: 'gradient',
        groupName: properGroupName,
        applyFn(group) {
            switch (property) {
                case 'rotation': // fall through
                case 'kind':
                    return produce(group, (draft) => {
                        draft[property] = token;
                    });
                case 'stepColor': // fall through
                case 'stepPosition':
                    return produce(group, (draft) => {
                        if (draft.steps == null) {
                            draft.steps = [];
                        }

                        const step = draft.steps[stepIndex] ?? {};

                        step[property] = token;

                        draft.steps[stepIndex] = step;
                    });
            }
        },
    };
}

function gradientStepIndexOf(groupName: string): number {
    const lastChar = groupName[groupName.length - 1];

    if (lastChar == null) {
        return 0;
    }

    return parseInt(lastChar, 10);
}

function shadowCategoryOf(token: TransformedToken): ShadowCategory | undefined {
    const property = propertyOf(token.name, shadowTokenEndings);
    const groupName = groupNameOf(token.name, Object.values(shadowTokenEndings));

    if (property == null || groupName == null) {
        return undefined;
    }

    return {
        type: 'shadow',
        groupName,
        applyFn(group) {
            return produce(group, (draft) => {
                draft[property] = token;
            });
        },
    };
}
