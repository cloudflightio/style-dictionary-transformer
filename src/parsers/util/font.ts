import { DesignToken } from 'style-dictionary';
import { fontTokenEndings } from '../../models/token-endings';
import { dimensionTokenFrom, numberTokenFrom, stringTokenFrom } from './token';

interface FontProperty {
    description?: string;
    type: 'custom-fontStyle';
    value: {
        fontSize: number;
        textDecoration: string;
        fontFamily: string;
        fontWeight: number;
        fontStyle: string;
        fontStretch: string;
        letterSpacing: number;
        lineHeight: number;
        paragraphIndent: number;
        paragraphSpacing: number;
        textCase: string;
    };
}

export function flattenFont(property: FontProperty): Record<string, DesignToken> {
    return [
        { key: fontTokenEndings.fontSize, value: dimensionTokenFrom(property.value.fontSize) },
        { key: fontTokenEndings.textDecoration, value: stringTokenFrom(property.value.textDecoration) },
        { key: fontTokenEndings.fontFamily, value: stringTokenFrom(property.value.fontFamily) },
        { key: fontTokenEndings.fontWeight, value: numberTokenFrom(property.value.fontWeight) },
        { key: fontTokenEndings.fontStyle, value: stringTokenFrom(property.value.fontStyle) },
        { key: fontTokenEndings.fontStretch, value: stringTokenFrom(property.value.fontStretch) },
        { key: fontTokenEndings.letterSpacing, value: dimensionTokenFrom(property.value.letterSpacing) },
        { key: fontTokenEndings.lineHeight, value: numberTokenFrom(property.value.lineHeight) },
        { key: fontTokenEndings.paragraphIndent, value: dimensionTokenFrom(property.value.paragraphIndent) },
        { key: fontTokenEndings.textCase, value: stringTokenFrom(property.value.textCase) },
    ].reduce<Record<string, DesignToken>>((acc, entry) => {
        acc[entry.key] = entry.value;

        return acc;
    }, {});
}
