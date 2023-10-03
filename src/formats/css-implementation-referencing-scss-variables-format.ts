import {Format} from 'style-dictionary';

import {borderToCssClasses} from './serializer/border';
import {fontToCssClasses} from './serializer/font';
import {gradientToCssClasses} from './serializer/gradient';
import {radiusToCssClasses} from './serializer/radius';
import {shadowToCssClasses} from './serializer/shadow';
import {spacingToCssClasses} from './serializer/spacing';
import {transitionToCssClasses} from './serializer/transition';
import {categoryFrom} from './util/category';

export const cssImplementationReferencingScssVariablesFormat: Format = {
    name: 'cloudflight/css-implementation-referencing-scss-variables-format',
    formatter({dictionary}) {
        const category = categoryFrom(dictionary);

        return [
            radiusToCssClasses(category.radius),
            borderToCssClasses(category.border),
            spacingToCssClasses(category.spacing),
            fontToCssClasses(category.font),
            shadowToCssClasses(category.shadow),
            transitionToCssClasses(category.transition),
            gradientToCssClasses(category.gradient),
        ]
            .filter((item) => item !== '')
            .join('\n\n');
    },
};
