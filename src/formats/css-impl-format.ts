import {Format} from 'style-dictionary';
import {borderToCssClasses, borderToCustomProperties} from './serializer/border';
import {colorToCustomProperties} from './serializer/color';
import {fontToCssClasses, fontToCustomProperties} from './serializer/font';
import {gradientToCssClasses, gradientToCustomProperties} from './serializer/gradient';
import {opacityToCustomProperties} from './serializer/opacity';
import {radiusToCssClasses, radiusToCustomProperties} from './serializer/radius';
import {shadowToCssClasses, shadowToCustomProperties} from './serializer/shadow';
import {sizeToCustomProperties} from './serializer/size';
import {spacingToCssClasses, spacingToCustomProperties} from './serializer/spacing';
import {transitionToCssClasses, transitionToCustomProperties} from './serializer/transition';
import {categoryFrom} from './util/category';

export const cloudflightCssImplFormat: Format = {
    name: 'cloudflight/css-impl-format',
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

function customPropertiesFrom(properties: string[]): string {
    return `:root {\n${properties.filter((property) => property !== '').join('\n')}\n}\n`;
}
