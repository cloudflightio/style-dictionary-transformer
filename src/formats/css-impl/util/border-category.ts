import { borderTokenEndings } from '../../../models/border';
import { BorderCategory } from '../models/token-category';

export function borderCategoryOf(name: string): BorderCategory | undefined {
    const property = borderPropertyOf(name);

    const endIndex = Object.values(borderTokenEndings)
        .map((ending) => name.indexOf(ending))
        .find((index) => index !== -1);

    if (property == null || endIndex == null) {
        return undefined;
    }

    return {
        type: 'border-category',
        groupName: name.slice(0, endIndex),
        property,
    };
}

function borderPropertyOf(name: string): BorderCategory['property'] | undefined {
    const foundEnding = Object.values(borderTokenEndings).find((ending) => name.includes(ending));

    switch (foundEnding) {
        case '-width':
            return 'width';
        case '-color':
            return 'color';
        case undefined:
            return undefined;
    }
}
