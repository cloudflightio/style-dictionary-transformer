import { DesignToken } from 'style-dictionary';
import { borderColorType, borderWidthType } from '../../models/border';

export interface BorderProperty {
    description?: string;
    type: 'custom-stroke';
    value: {
        align: 'inside' | 'center' | 'outised';
        dashPattern: number[];
        lineCap: string;
        lineJoin: string;
        miterLimit: number;
        weight: number;
        color: string;
    };
}

export function flattenBorder(properties: Record<string, BorderProperty>): Record<string, DesignToken> {
    return Object.entries(properties)
        .flatMap(([key, value]) => [
            { key: `${key}-width`, value: widthFrom(value.value.weight) },
            { key: `${key}-color`, value: colorFrom(value.value.color) },
        ])
        .reduce<Record<string, DesignToken>>((acc, entry) => {
            acc[entry.key] = entry.value;

            return acc;
        }, {});
}

function widthFrom(value: number): DesignToken {
    return {
        value,
        type: borderWidthType,
    };
}

function colorFrom(value: string): DesignToken {
    return {
        value,
        type: borderColorType,
    };
}
