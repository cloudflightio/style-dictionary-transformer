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

export function timeTokenFrom(value: number): DesignToken {
    return {
        value,
        type: tokenTypes.time,
    };
}

export function stringTokenFrom(value: string): DesignToken {
    return {
        value,
        type: tokenTypes.string,
    };
}

export function objectTokenFrom<T extends object>(value: T): DesignToken {
    return {
        value,
        type: tokenTypes.object,
    };
}
