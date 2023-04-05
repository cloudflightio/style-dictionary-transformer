export function classesFrom<T>(
    tokens: Map<string, Partial<T>>,
    classFn: (groupName: string, tokens: Partial<T>) => string,
): string {
    return Array.from(tokens.entries())
        .map(([groupName, group]) => classFn(groupName, group))
        .filter((value) => value !== '')
        .join('\n');
}

export function classFrom(groupName: string, properties: string[]): string {
    const filteredProperties = properties.filter((value) => value !== '');
    const formattedProperties = filteredProperties.map((value) => `    ${value}\n`);

    return `.${groupName} {\n${formattedProperties.join('')}}`;
}
