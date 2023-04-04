export function groupNameOf(name: string, endings: string[]): string | undefined {
    const endIndex = Object.values(endings)
        .map((ending) => name.indexOf(ending))
        .find((index) => index !== -1);

    if (endIndex == null) {
        return undefined;
    }

    return name.slice(0, endIndex);
}

export function propertyOf<T extends Record<string, string>>(name: string, endings: T): keyof T | undefined {
    const foundEnding = Object.values(endings).find((ending) => name.includes(ending));
    const x = swapKeysAndValues(endings);

    return foundEnding != null ? x[foundEnding] : undefined;
}

function swapKeysAndValues(record: Record<string, string>): Record<string, string> {
    return Object.entries(record)
        .map(([key, value]) => [value, key] as const)
        .reduce<Record<string, string>>((acc, [key, value]) => {
            acc[key] = value;

            return acc;
        }, {});
}
