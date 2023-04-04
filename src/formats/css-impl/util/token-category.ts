import { TransformedToken } from 'style-dictionary';
import {
    borderTokenEndings,
    fontTokenEndings,
    radiusTokenEndings,
    spacingTokenEndings,
    transitionTokenEndings,
} from '../../../models/token-endings';
import {
    BorderCategory,
    FontCategory,
    RadiusCategory,
    SpacingCategory,
    TokenCategory,
    TransitionCategory,
} from '../models/token-category';
import { groupNameOf, propertyOf } from './token-category-util';

export function tokenCategorizationFrom(token: TransformedToken): TokenCategory | undefined {
    switch (token.attributes?.category) {
        case 'radius':
            return radiusCategoryOf(token.name);
        case 'borders':
            return borderCategoryOf(token.name);
        case 'spacing':
            return spacingCategoryOf(token.name);
        case 'font':
            return fontCategoryOf(token.name);
        case 'motion':
            return transitionCategoryOf(token.name);
        default:
            return undefined;
    }
}

function borderCategoryOf(name: string): BorderCategory | undefined {
    const property = propertyOf(name, borderTokenEndings);
    const groupName = groupNameOf(name, Object.values(borderTokenEndings));

    if (property == null || groupName == null) {
        return undefined;
    }

    return {
        type: 'border',
        groupName,
        property,
    };
}

function fontCategoryOf(name: string): FontCategory | undefined {
    const property = propertyOf(name, fontTokenEndings);
    const groupName = groupNameOf(name, Object.values(fontTokenEndings));

    if (property == null || groupName == null) {
        return undefined;
    }

    return {
        type: 'font',
        groupName,
        property,
    };
}

function radiusCategoryOf(name: string): RadiusCategory | undefined {
    const property = propertyOf(name, radiusTokenEndings);
    const groupName = groupNameOf(name, Object.values(radiusTokenEndings));

    if (property == null || groupName == null) {
        return undefined;
    }

    return {
        type: 'radius',
        groupName,
        property,
    };
}

function spacingCategoryOf(name: string): SpacingCategory | undefined {
    const property = propertyOf(name, spacingTokenEndings);
    const groupName = groupNameOf(name, Object.values(spacingTokenEndings));

    if (property == null || groupName == null) {
        return undefined;
    }

    return {
        type: 'spacing',
        groupName,
        property,
    };
}

function transitionCategoryOf(name: string): TransitionCategory | undefined {
    const property = propertyOf(name, transitionTokenEndings);
    const groupName = groupNameOf(name, Object.values(transitionTokenEndings));

    if (property == null || groupName == null) {
        return undefined;
    }

    return {
        type: 'transition',
        groupName,
        property,
    };
}
