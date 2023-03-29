import { DesignTokens, Parser } from 'style-dictionary';
import { flattenRadius, RadiusProperty } from './util/radius';

interface Structure extends DesignTokens {
    radius?: Record<string, RadiusProperty>;
}

export const jsonParser: Parser = {
    pattern: /\.json$/,
    parse({ contents }) {
        const parsedContent: Structure = JSON.parse(contents);

        if (parsedContent.radius != null) {
            return {
                ...parsedContent,
                radius: flattenRadius(parsedContent.radius),
            };
        }

        return parsedContent;
    },
};
