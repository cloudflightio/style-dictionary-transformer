import {DesignToken, DesignTokens, Parser} from 'style-dictionary';

import {tokenTypes} from '../models/token-types';
import {ArrayElement} from '../util/array';

export const jsonParser: Parser = {
    pattern: /\.json$/,
    parse({contents}) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const parsedContent: DesignTokens = JSON.parse(contents, (_key, value: unknown) => {
            if (!isPotentialDesignToken(value)) {
                return value;
            }

            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            switch (value['type'] as ArrayElement<typeof tokenTypes>) {
                case 'custom-shadow':
                    return shadowFilter(value);
                case 'custom-gradient':
                    return gradientFilter(value);
                case 'custom-transition':
                    return transitionFilter(value);
                default:
                    return value;
            }
        });

        return {
            ...parsedContent,
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            radii: undefined as unknown as DesignToken,
            radius: {
                ...parsedContent['radii'],
                ...parsedContent['radius'],
            },
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            opacities: undefined as unknown as DesignToken,
            opacity: {
                ...parsedContent['opacities'],
                ...parsedContent['opacity'],
            },
            // use the font property instead
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            typography: undefined as unknown as DesignToken,
        };
    },
};

function shadowFilter(token: DesignToken): DesignToken | undefined {
    const value: unknown = token.value;

    if (typeof value !== 'object' || value == null || !('shadowType' in value)) {
        return undefined;
    }

    return value.shadowType === 'dropShadow' ? token : undefined;
}

function transitionFilter(token: DesignToken): DesignToken | undefined {
    const value: unknown = token.value;

    if (typeof value !== 'object' || value == null || !('easingType' in value)) {
        return undefined;
    }

    return value.easingType === 'cubicBezier' ? token : undefined;
}

function gradientFilter(token: DesignToken): DesignToken | undefined {
    const value: unknown = token.value;

    if (typeof value !== 'object' || value == null || !('gradientType' in value)) {
        return undefined;
    }

    return value.gradientType === 'linear' || value.gradientType === 'radial' ? token : undefined;
}

function isPotentialDesignToken(value: unknown): value is DesignToken {
    return typeof value === 'object' && value != null;
}
