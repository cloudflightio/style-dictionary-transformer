import { fontTokenEndings } from '../../../models/token-endings';
import { FontCategory } from '../models/token-category';

export function fontCategoryOf(name: string): FontCategory | undefined {
    const property = fontPropertyOf(name);

    const endIndex = Object.values(fontTokenEndings)
        .map((ending) => name.indexOf(ending))
        .find((index) => index !== -1);

    if (property == null || endIndex == null) {
        return undefined;
    }

    return {
        type: 'font',
        groupName: name.slice(0, endIndex),
        property,
    };
}

function fontPropertyOf(name: string): FontCategory['property'] | undefined {
    const foundEnding = Object.values(fontTokenEndings).find((ending) => name.includes(ending));

    switch (foundEnding) {
        case '-font-family':
            return 'fontFamily';
        case '-font-size':
            return 'fontSize';
        case '-font-stretch':
            return 'fontStretch';
        case '-font-style':
            return 'fontStyle';
        case '-font-weight':
            return 'fontWeight';
        case '-letter-spacing':
            return 'letterSpacing';
        case '-line-height':
            return 'lineHeight';
        case '-paragraph-indent':
            return 'paragraphIndent';
        case '-text-case':
            return 'textCase';
        case '-text-decoration':
            return 'textDecoration';
        case undefined:
            return undefined;
    }
}
