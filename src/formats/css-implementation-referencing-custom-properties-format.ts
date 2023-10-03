import {Format} from 'style-dictionary';

import {borderToCssClassesReferencingCustomProperties, borderToCustomProperties} from './serializer/border';
import {colorToCustomProperties} from './serializer/color';
import {fontToCssClassesReferencingCustomProperties, fontToCustomProperties} from './serializer/font';
import {gradientToCssClassesReferencingCustomProperties, gradientToCustomProperties} from './serializer/gradient';
import {opacityToCustomProperties} from './serializer/opacity';
import {radiusToCssClassesReferencingCustomProperties, radiusToCustomProperties} from './serializer/radius';
import {shadowToCssClassesReferencingCustomProperties, shadowToCustomProperties} from './serializer/shadow';
import {sizeToCustomProperties} from './serializer/size';
import {spacingToCssClassesReferencingCustomProperties, spacingToCustomProperties} from './serializer/spacing';
import {transitionToCssClassesReferencingCustomProperties, transitionToCustomProperties} from './serializer/transition';
import {categoryFrom} from './util/category';

export const cssImplementationReferencingCustomPropertiesFormat: Format = {
    name: 'cloudflight/css-implementation-referencing-custom-properties-format',
    formatter({dictionary}) {
        const category = categoryFrom(dictionary);

        return [
            customPropertiesFrom([
                colorToCustomProperties(category.color),
                radiusToCustomProperties(category.radius),
                borderToCustomProperties(category.border),
                spacingToCustomProperties(category.spacing),
                opacityToCustomProperties(category.opacity),
                sizeToCustomProperties(category.size),
                fontToCustomProperties(category.font),
                shadowToCustomProperties(category.shadow),
                transitionToCustomProperties(category.transition),
                gradientToCustomProperties(category.gradient),
            ]),
            radiusToCssClassesReferencingCustomProperties(category.radius),
            borderToCssClassesReferencingCustomProperties(category.border),
            spacingToCssClassesReferencingCustomProperties(category.spacing),
            fontToCssClassesReferencingCustomProperties(category.font),
            shadowToCssClassesReferencingCustomProperties(category.shadow),
            transitionToCssClassesReferencingCustomProperties(category.transition),
            gradientToCssClassesReferencingCustomProperties(category.gradient),
        ]
            .filter((item) => item !== '')
            .join('\n\n');
    },
};

function customPropertiesFrom(properties: string[]): string {
    return `:root {\n${properties.filter((property) => property !== '').join('\n')}\n}\n`;
}
