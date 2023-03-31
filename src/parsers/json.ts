import { DesignTokens, Parser } from 'style-dictionary';
import { BorderProperty, flattenBorder } from './util/border';
import { flattenOpacity, OpacityProperty } from './util/opcaity';
import { flattenRadius, RadiusProperty } from './util/radius';
import { flattenSpacing, SpacingProperty } from './util/spacing';

interface Structure extends DesignTokens {
    radius?: Record<string, RadiusProperty>;
    radii?: Record<string, RadiusProperty>;
    borders?: Record<string, BorderProperty>;
    spacing?: Record<string, SpacingProperty>;
    opacity?: Record<string, OpacityProperty>;
    opacities?: Record<string, OpacityProperty>;
}

export const jsonParser: Parser = {
    pattern: /\.json$/,
    parse({ contents }) {
        const parsedContent: Structure = JSON.parse(contents);

        const result: DesignTokens = { ...parsedContent };

        if (parsedContent.radius != null || parsedContent.radii != null) {
            result['radius'] = {
                ...flattenRadius(parsedContent.radii ?? {}),
                ...flattenRadius(parsedContent.radius ?? {}),
            };
        }

        if (parsedContent.borders != null) {
            result['borders'] = flattenBorder(parsedContent.borders);
        }

        if (parsedContent.opacity != null || parsedContent.opacities != null) {
            result['opacity'] = {
                ...flattenOpacity(parsedContent.opacities ?? {}),
                ...flattenOpacity(parsedContent.opacity ?? {}),
            };
        }

        if (parsedContent.spacing != null) {
            result['spacing'] = flattenSpacing(parsedContent.spacing);
        }

        return result;
    },
};
