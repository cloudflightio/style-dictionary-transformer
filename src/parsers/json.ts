import { DesignTokens, Parser } from 'style-dictionary';
import { BorderProperty, flattenBorder } from './util/border';
import { flattenRadius, RadiusProperty } from './util/radius';

interface Structure extends DesignTokens {
    radius?: Record<string, RadiusProperty>;
    borders?: Record<string, BorderProperty>;
}

export const jsonParser: Parser = {
    pattern: /\.json$/,
    parse({ contents }) {
        const parsedContent: Structure = JSON.parse(contents);

        const result: DesignTokens = { ...parsedContent };

        if (parsedContent.radius != null) {
            result['radius'] = flattenRadius(parsedContent.radius);
        }

        if (parsedContent.borders != null) {
            result['borders'] = flattenBorder(parsedContent.borders);
        }

        return result;
    },
};
