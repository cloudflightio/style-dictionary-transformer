import {DesignToken, Parser} from 'style-dictionary';
import {tokenTypes} from '../models/token-types';
import {ArrayElement} from '../util/array';

export const jsonParser: Parser = {
    pattern: /\.json$/,
    parse({contents}) {
        const parsedContent = JSON.parse(contents, (_key, value) => {
            switch (value?.type as ArrayElement<typeof tokenTypes>) {
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
            radii: undefined,
            radius: {
                ...parsedContent.radii,
                ...parsedContent.radius,
            },
            opacities: undefined,
            opacity: {
                ...parsedContent.opacities,
                ...parsedContent.opacity,
            },
        };
    },
};

function shadowFilter(token: DesignToken): DesignToken | undefined {
    return token.value.shadowType === 'dropShadow' ? token : undefined;
}

function transitionFilter(token: DesignToken): DesignToken | undefined {
    return token.value.easingType === 'cubicBezier' ? token : undefined;
}

function gradientFilter(token: DesignToken): DesignToken | undefined {
    return token.value.gradientType === 'linear' || token.value.gradientType === 'radial' ? token : undefined;
}
