import { DesignToken } from 'style-dictionary';
import { tokenTypes } from '../../models/token-types';

export function dimensionTokenFrom(value: number): DesignToken {
    return {
        value,
        type: tokenTypes.dimension,
    };
}

export function colorTokenFrom(value: string): DesignToken {
    return {
        value,
        type: tokenTypes.color,
    };
}

export function numberTokenFrom(value: number): DesignToken {
    return {
        value,
        type: tokenTypes.number,
    };
}

export function stringTokenFrom(value: string): DesignToken {
    return {
        value,
        type: tokenTypes.string,
    };
}
