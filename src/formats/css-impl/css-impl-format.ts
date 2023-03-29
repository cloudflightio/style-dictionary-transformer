import { Dictionary, Format, TransformedToken } from 'style-dictionary';
import { radiusType } from '../../models/radius';
import { CategorizedTokens, TokenCategory } from './models/token-category';
import { radiusCategoryOf } from './util/radius-category';
import { radiusClassesFrom } from './util/radius-serialize-class';

export const cloudflightCssImplFormat: Format = {
    name: 'cloudflight/css-impl-format',
    formatter({ dictionary }) {
        const customProperties = dictionary.allTokens.map((token) => `--${token.name}: ${token.value};`);
        const formattedCustomProperties = customProperties.map((property) => `    ${property}\n`);

        const customPropertiesSection = `:root {\n${formattedCustomProperties.join('')}}`;

        const category = categoryFrom(dictionary);

        return customPropertiesSection + '\n\n' + radiusClassesFrom(category.radius);
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
                case 'other-category':
                    break;
            }

            return acc;
        },
        { radius: new Map() },
    );
}

function tokenCategorizationFrom(token: TransformedToken): TokenCategory {
    if (token['type'] === radiusType) {
        return (
            radiusCategoryOf(token.name) ?? {
                type: 'other-category',
            }
        );
    } else {
        return {
            type: 'other-category',
        };
    }
}
