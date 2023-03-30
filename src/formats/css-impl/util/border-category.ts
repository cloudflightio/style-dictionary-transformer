import { BorderCategory } from '../models/token-category';

const endings = ['-width', '-color'] as const;

export function borderCategoryOf(name: string): BorderCategory | undefined {
    const property = borderPropertyOf(name);

    const endIndex = endings.map((ending) => name.indexOf(ending)).find((index) => index !== -1);

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
    const foundEnding = endings.find((ending) => name.includes(ending));

    switch (foundEnding) {
        case '-width':
            return 'width';
        case '-color':
            return 'color';
        case undefined:
            return undefined;
    }
}
