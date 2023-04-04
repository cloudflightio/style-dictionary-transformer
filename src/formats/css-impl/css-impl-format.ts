import { Dictionary, Format } from 'style-dictionary';
import { CategorizedTokens } from './models/token-category';
import {
    borderClassesFrom,
    fontClassesFrom,
    radiusClassesFrom,
    spacingClassesFrom,
    transitionClassesFrom,
} from './util/serialize-class';
import { customPropertySectionFrom } from './util/serialize-custom-properties';
import { tokenCategorizationFrom } from './util/token-category';

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
    const accumulator: CategorizedTokens = {
        radius: new Map(),
        border: new Map(),
        spacing: new Map(),
        font: new Map(),
        transition: new Map(),
    };

    return dictionary.allTokens.reduce<CategorizedTokens>((acc, token) => {
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
    }, accumulator);
}
