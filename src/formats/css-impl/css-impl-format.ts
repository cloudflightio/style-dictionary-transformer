import { Dictionary, Format, TransformedToken } from 'style-dictionary';
import { borderColorType, borderWidthType } from '../../models/border';
import { radiusType } from '../../models/radius';
import { spacingType } from '../../models/spacing';
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
                case 'radius-category': {
                    const existingGroup = acc.radius.get(category.groupName) ?? {};

                    acc.radius.set(category.groupName, {
                        ...existingGroup,
                        [category.property]: token,
                    });
                    break;
                }
                case 'border-category': {
                    const existingGroup = acc.border.get(category.groupName) ?? {};

                    acc.border.set(category.groupName, {
                        ...existingGroup,
                        [category.property]: token,
                    });
                    break;
                }
                case 'spacing-category': {
                    const existingGroup = acc.spacing.get(category.groupName) ?? {};

                    acc.spacing.set(category.groupName, {
                        ...existingGroup,
                        [category.property]: token,
                    });
                    break;
                }
                case 'other-category':
                    break;
            }

            return acc;
        },
        { radius: new Map(), border: new Map(), spacing: new Map() },
    );
}

function tokenCategorizationFrom(token: TransformedToken): TokenCategory {
    if (token['type'] === radiusType) {
        return (
            radiusCategoryOf(token.name) ?? {
                type: 'other-category',
            }
        );
    } else if (token['type'] === borderWidthType || token['type'] === borderColorType) {
        return (
            borderCategoryOf(token.name) ?? {
                type: 'other-category',
            }
        );
    } else if (token['type'] === spacingType) {
        return (
            spacingCategoryOf(token.name) ?? {
                type: 'other-category',
            }
        );
    } else {
        return {
            type: 'other-category',
        };
    }
}
