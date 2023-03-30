import { spacingTokenEndings } from '../../../models/spacing';
import { SpacingCategory } from '../models/token-category';

export function spacingCategoryOf(name: string): SpacingCategory | undefined {
    const property = spacingPropertyOf(name);

    const endIndex = Object.values(spacingTokenEndings)
        .map((ending) => name.indexOf(ending))
        .find((index) => index !== -1);

    if (property == null || endIndex == null) {
        return undefined;
    }

    return {
        type: 'spacing-category',
        groupName: name.slice(0, endIndex),
        property,
    };
}

function spacingPropertyOf(name: string): SpacingCategory['property'] | undefined {
    const foundEnding = Object.values(spacingTokenEndings).find((ending) => name.includes(ending));

    switch (foundEnding) {
        case '-top':
            return 'top';
        case '-right':
            return 'right';
        case '-left':
            return 'left';
        case '-bottom':
            return 'bottom';
        case undefined:
            return undefined;
    }
}
