import { Dictionary, Format, TransformedToken } from 'style-dictionary';
import { allowedTokenTypes } from '../../models/allowed-token-types';
import { CategorizedTokens, TokenCategory } from './models/token-category';
import { borderCategoryOf } from './util/border-category';
import { borderClassesFrom } from './util/border-serialize-class';
import { customPropertySectionFrom } from './util/custom-properties-serialize';
import { radiusCategoryOf } from './util/radius-category';
import { radiusClassesFrom } from './util/radius-serialize-class';
import { spacingCategoryOf } from './util/spacing-category';
import { spacingClassesFrom } from './util/spacing-serialize-class';

type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[]
    ? ElementType
    : never;

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
    const tokenType: ArrayElement<typeof allowedTokenTypes> = token['type'];

    switch (tokenType) {
        case 'cloudflight-radius':
            return (
                radiusCategoryOf(token.name) ?? {
                    type: 'other-category',
                }
            );
        case 'cloudflight-border-width': // fall through
        case 'cloudflight-border-color':
            return (
                borderCategoryOf(token.name) ?? {
                    type: 'other-category',
                }
            );
        case 'cloudflight-spacing':
            return (
                spacingCategoryOf(token.name) ?? {
                    type: 'other-category',
                }
            );
        case 'custom-opacity': // fall through
        case 'dimension': // fall through
        case 'color': // fall through
        case 'number': // fall through
        case 'string':
            return {
                type: 'other-category',
            };
    }
}
