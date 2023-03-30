import { Dictionary, Format, TransformedToken } from 'style-dictionary';
import { borderColorType, borderWidthType } from '../../models/border';
import { radiusType } from '../../models/radius';
import { CategorizedTokens, TokenCategory } from './models/token-category';
import { borderCategoryOf } from './util/border-category';
import { borderClassFrom } from './util/border-serialize-class';
import { classesFrom } from './util/classes';
import { radiusCategoryOf } from './util/radius-category';
import { radiusClassFrom } from './util/radius-serialize-class';

export const cloudflightCssImplFormat: Format = {
    name: 'cloudflight/css-impl-format',
    formatter({ dictionary }) {
        const customProperties = dictionary.allTokens.map((token) => `--${token.name}: ${token.value};`);
        const formattedCustomProperties = customProperties.map((property) => `    ${property}\n`);

        const customPropertiesSection = `:root {\n${formattedCustomProperties.join('')}}`;

        const category = categoryFrom(dictionary);

        return [
            customPropertiesSection,
            classesFrom(category.radius, radiusClassFrom),
            classesFrom(category.border, borderClassFrom),
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
                case 'other-category':
                    break;
            }

            return acc;
        },
        { radius: new Map(), border: new Map() },
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
    } else {
        return {
            type: 'other-category',
        };
    }
}
