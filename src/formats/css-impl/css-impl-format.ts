import { Dictionary, Format, TransformedToken } from 'style-dictionary';
import { CategorizedTokens, TokenCategory } from './models/token-category';
import { borderCategoryOf } from './util/border-category';
import { borderClassesFrom } from './util/border-serialize-class';
import { customPropertySectionFrom } from './util/custom-properties-serialize';
import { fontCategoryOf } from './util/font-category';
import { fontClassesFrom } from './util/font-serialize-class';
import { radiusCategoryOf } from './util/radius-category';
import { radiusClassesFrom } from './util/radius-serialize-class';
import { spacingCategoryOf } from './util/spacing-category';
import { spacingClassesFrom } from './util/spacing-serialize-class';
import { transitionCategoryOf } from './util/transition-category';
import { transitionClassesFrom } from './util/transition-serialize-class';

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
            fontClassesFrom(category.font),
            transitionClassesFrom(category.transition),
        ]
            .filter((item) => item !== '')
            .join('\n\n');
    },
};

function categoryFrom(dictionary: Dictionary): CategorizedTokens {
    return dictionary.allTokens.reduce<CategorizedTokens>(
        (acc, token) => {
            const category = tokenCategorizationFrom(token);

            switch (category?.type) {
                case 'radius': // fall through
                case 'border': // fall through
                case 'font': // fall through
                case 'transition': // fall through
                case 'spacing': {
                    const existingGroup = acc[category.type].get(category.groupName) ?? {};

                    acc[category.type].set(category.groupName, {
                        ...existingGroup,
                        [category.property]: token,
                    });
                    break;
                }
                case undefined:
                    break;
            }

            return acc;
        },
        { radius: new Map(), border: new Map(), spacing: new Map(), font: new Map(), transition: new Map() },
    );
}

function tokenCategorizationFrom(token: TransformedToken): TokenCategory | undefined {
    switch (token.attributes?.category) {
        case 'radius':
            return radiusCategoryOf(token.name);
        case 'borders':
            return borderCategoryOf(token.name);
        case 'spacing':
            return spacingCategoryOf(token.name);
        case 'font':
            return fontCategoryOf(token.name);
        case 'motion':
            return transitionCategoryOf(token.name);
        default:
            return undefined;
    }
}
