import { TransformedToken } from 'style-dictionary';

export function customPropertySectionFrom(tokens: TransformedToken[]): string {
    const customProperties = tokens.map((token) => `--${token.name}: ${token.value};`);
    const formattedCustomProperties = customProperties.map((property) => `    ${property}\n`);

    return `:root {\n${formattedCustomProperties.join('')}}`;
}
