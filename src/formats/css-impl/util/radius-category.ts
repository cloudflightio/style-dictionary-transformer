import { RadiusCategory } from '../models/token-category';

const endings = ['-top-left', '-top-right', '-bottom-left', '-bottom-right'] as const;

export function radiusCategoryOf(name: string): RadiusCategory | undefined {
    const property = radiusPropertyOf(name);

    const endIndex = endings.map((ending) => name.indexOf(ending)).find((index) => index !== -1);

    if (property == null || endIndex == null) {
        return undefined;
    }

    return {
        type: 'radius-category',
        groupName: name.slice(0, endIndex),
        property,
    };
}

function radiusPropertyOf(name: string): RadiusCategory['property'] | undefined {
    const foundEnding = endings.find((ending) => name.indexOf(ending) !== -1);

    switch (foundEnding) {
        case '-top-left':
            return 'topLeft';
        case '-top-right':
            return 'topRight';
        case '-bottom-left':
            return 'bottomLeft';
        case '-bottom-right':
            return 'bottomRight';
        case undefined:
            return undefined;
    }
}