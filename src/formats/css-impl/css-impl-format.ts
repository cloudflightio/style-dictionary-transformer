import { Dictionary, Format, TransformedToken } from 'style-dictionary';
import { CategorizedTokens, TokenCategory } from './models/token-category';
import { borderCategoryOf } from './util/border-category';
import { borderClassesFrom } from './util/border-serialize-class';
import { customPropertySectionFrom } from './util/custom-properties-serialize';
import { radiusCategoryOf } from './util/radius-category';
import { radiusClassesFrom } from './util/radius-serialize-class';
import { spacingCategoryOf } from './util/spacing-category';
import { spacingClassesFrom } from './util/spacing-serialize-class';

export const cloudflightCssImplFormat: Format = {
    name: 'cloudflight/css-impl-format',
    formatter({ dictionary }) {
        const customPropertiesSection = customPropertySectionFrom(dictionary.allTokens);
        const category = categoryFrom(dictionary);

        return [
            customPropertiesSection,
            radiusClassesFrom(category.radius),
            borderClassesFrom(category.border),
            spacingClassesFrom(category.spacing),
        ]
            .filter((item) => item !== '')
            .join('\n\n');
    },
};

function categoryFrom(dictionary: Dictionary): CategorizedTokens {
    return dictionary.allTokens.reduce<CategorizedTokens>(
        (acc, token) => {
            const category = tokenCategorizationFrom(token);

            switch (category.type) {
                case 'radius': // fall through
                case 'border': // fall through
                case 'spacing': {
                    const existingGroup = acc[category.type].get(category.groupName) ?? {};

                    acc[category.type].set(category.groupName, {
                        ...existingGroup,
                        [category.property]: token,
                    });
                    break;
                }
                case 'other':
                    break;
            }

            return acc;
        },
        { radius: new Map(), border: new Map(), spacing: new Map() },
    );
}

function tokenCategorizationFrom(token: TransformedToken): TokenCategory {
    switch (token.attributes?.category) {
        case 'radius':
            return (
                radiusCategoryOf(token.name) ?? {
                    type: 'other',
                }
            );
        case 'borders':
            return (
                borderCategoryOf(token.name) ?? {
                    type: 'other',
                }
            );
        case 'spacing':
            return (
                spacingCategoryOf(token.name) ?? {
                    type: 'other',
                }
            );
        default:
            return {
                type: 'other',
            };
    }
}
