import { CategorizedTokens, RadiusTokenGroup } from '../models/token-category';

export function radiusClassesFrom(tokens: CategorizedTokens['radius']): string {
    return Array.from(tokens.entries())
        .map(([groupName, group]) => radiusClassFrom(groupName, group))
        .join('\n');
}

function radiusClassFrom(groupName: string, tokens: Partial<RadiusTokenGroup>): string {
    const properties = [
        tokens.topLeft?.name != null ? `border-top-left-radius: var(--${tokens.topLeft.name});` : '',
        tokens.topRight?.name != null ? `border-top-right-radius: var(--${tokens.topRight.name});` : '',
        tokens.bottomLeft?.name != null ? `border-bottom-left-radius: var(--${tokens.bottomLeft.name});` : '',
        tokens.bottomRight?.name != null ? `border-bottom-right-radius: var(--${tokens.bottomRight.name});` : '',
    ];
    const filteredProperties = properties.filter((value) => value !== '');
    const formattedProperties = filteredProperties.map((value) => `    ${value}\n`);

    return `.${groupName} {\n${formattedProperties.join('')}}`;
}
