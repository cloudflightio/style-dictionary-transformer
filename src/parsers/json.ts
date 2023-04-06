import { Parser } from 'style-dictionary';
import { flattenBorder } from './util/border';
import { flattenFont } from './util/font';
import { flattenGradient } from './util/gradient';
import { flattenOpacity } from './util/opacity';
import { flattenRadius } from './util/radius';
import { flattenShadow } from './util/shadow';
import { flattenSpacing } from './util/spacing';
import { flattenTransition } from './util/transition';

export const jsonParser: Parser = {
    pattern: /\.json$/,
    parse({ contents }) {
        const parsedContent = JSON.parse(contents, (_key, value) => {
            switch (value?.type) {
                case 'custom-radius':
                    return flattenRadius(value);
                case 'custom-stroke':
                    return flattenBorder(value);
                case 'custom-opacity':
                    return flattenOpacity(value);
                case 'custom-spacing':
                    return flattenSpacing(value);
                case 'custom-fontStyle':
                    return flattenFont(value);
                case 'custom-transition':
                    return flattenTransition(value);
                case 'custom-gradient':
                    return flattenGradient(value);
                case 'custom-shadow':
                    return flattenShadow(value);
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
