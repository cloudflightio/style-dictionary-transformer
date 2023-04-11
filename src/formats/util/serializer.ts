export function itemsFrom<T>(tokens: T[], mapFn: (token: T) => string | string[]): string {
    return tokens.flatMap(mapFn).join('\n');
}

export function classFrom(groupName: string, properties: string[]): string {
    return `.${groupName} {\n${propertiesFrom(properties)}}`;
}

export function propertiesFrom(properties: string[]): string {
    return properties
        .filter((value) => value !== '')
        .map((value) => `    ${value}\n`)
        .join('');
}
