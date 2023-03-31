import { Parser } from 'style-dictionary';
import { flattenBorder } from './util/border';
import { flattenFont } from './util/font';
import { flattenOpacity } from './util/opacity';
import { flattenRadius } from './util/radius';
import { flattenSpacing } from './util/spacing';

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
