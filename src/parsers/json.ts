import { DesignTokens, Parser } from 'style-dictionary';
import { BorderProperty, flattenBorder } from './util/border';
import { flattenRadius, RadiusProperty } from './util/radius';
import { flattenSpacing, SpacingProperty } from './util/spacing';

interface Structure extends DesignTokens {
    radius?: Record<string, RadiusProperty>;
    borders?: Record<string, BorderProperty>;
    spacing?: Record<string, SpacingProperty>;
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

        if (parsedContent.spacing != null) {
            result['spacing'] = flattenSpacing(parsedContent.spacing);
        }

        return result;
    },
};
