import { Dictionary, Format } from 'style-dictionary';
import { CategorizedTokens } from './models/token-category';
import {
    borderClassesFrom,
    fontClassesFrom,
    radiusClassesFrom,
    shadowClassesFrom,
    spacingClassesFrom,
    transitionClassesFrom,
} from './util/serialize-class';
import { gradientClassesFrom } from './util/serialize-class-gradient';
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
            gradientClassesFrom(category.gradient),
            shadowClassesFrom(category.shadow),
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
        gradient: new Map(),
        shadow: new Map(),
    };

    return dictionary.allTokens.reduce<CategorizedTokens>((acc, token) => {
        const category = tokenCategorizationFrom(token);

        if (category == null) {
            return acc;
        }

        const existingGroup = acc[category.type].get(category.groupName) ?? {};

        acc[category.type].set(category.groupName, category.applyFn(existingGroup));

        return acc;
    }, accumulator);
}
