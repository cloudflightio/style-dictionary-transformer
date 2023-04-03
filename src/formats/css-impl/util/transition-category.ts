import { transitionTokenEndings } from '../../../models/token-endings';
import { TransitionCategory } from '../models/token-category';

export function transitionCategoryOf(name: string): TransitionCategory | undefined {
    const property = radiusPropertyOf(name);

    const endIndex = Object.values(transitionTokenEndings)
        .map((ending) => name.indexOf(ending))
        .find((index) => index !== -1);

    if (property == null || endIndex == null) {
        return undefined;
    }

    return {
        type: 'transition',
        groupName: name.slice(0, endIndex),
        property,
    };
}

function radiusPropertyOf(name: string): TransitionCategory['property'] | undefined {
    const foundEnding = Object.values(transitionTokenEndings).find((ending) => name.includes(ending));

    switch (foundEnding) {
        case '-duration':
            return 'duration';
        case '-timing-function':
            return 'timingFunction';
        case undefined:
            return undefined;
    }
}
