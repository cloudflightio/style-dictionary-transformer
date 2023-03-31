import { typographyTokenEndings } from '../../../models/token-endings';
import { TypographyCategory } from '../models/token-category';

export function typographyCategoryOf(name: string): TypographyCategory | undefined {
    const property = typographyPropertyOf(name);

    const endIndex = Object.values(typographyTokenEndings)
        .map((ending) => name.indexOf(ending))
        .find((index) => index !== -1);

    if (property == null || endIndex == null) {
        return undefined;
    }

    return {
        type: 'typography',
        groupName: name.slice(0, endIndex),
        property,
    };
}

function typographyPropertyOf(name: string): TypographyCategory['property'] | undefined {
    const foundEnding = Object.values(typographyTokenEndings).find((ending) => name.includes(ending));

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
        case '-paragraph-spacing':
            return 'paragraphSpacing';
        case '-text-case':
            return 'textCase';
        case '-text-decoration':
            return 'textDecoration';
        case undefined:
            return undefined;
    }
}
