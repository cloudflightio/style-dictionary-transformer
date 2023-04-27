import {Format} from 'style-dictionary';
import {borderToScssVariablesReferencingCustomProperties} from './serializer/border';
import {colorToScssVariablesReferencingCustomProperties} from './serializer/color';
import {fontToScssVariablesReferencingCustomProperties} from './serializer/font';
import {gradientToScssVariablesReferencingCustomProperties} from './serializer/gradient';
import {opacityToScssVariablesReferencingCustomProperties} from './serializer/opacity';
import {radiusToScssVariablesReferencingCustomProperties} from './serializer/radius';
import {shadowToScssVariablesReferencingCustomProperties} from './serializer/shadow';
import {sizeToScssVariablesReferencingCustomProperties} from './serializer/size';
import {spacingToScssVariablesReferencingCustomProperties} from './serializer/spacing';
import {transitionToScssVariablesReferencingCustomProperties} from './serializer/transition';
import {categoryFrom} from './util/category';

export const scssDeclarationReferencingCustomPropertiesFormat: Format = {
    name: 'cloudflight/scss-declaration-referencing-custom-properties-format',
    formatter({dictionary}) {
        const category = categoryFrom(dictionary);

        return [
            colorToScssVariablesReferencingCustomProperties(category.color),
            radiusToScssVariablesReferencingCustomProperties(category.radius),
            borderToScssVariablesReferencingCustomProperties(category.border),
            spacingToScssVariablesReferencingCustomProperties(category.spacing),
            opacityToScssVariablesReferencingCustomProperties(category.opacity),
            sizeToScssVariablesReferencingCustomProperties(category.size),
            fontToScssVariablesReferencingCustomProperties(category.font),
            shadowToScssVariablesReferencingCustomProperties(category.shadow),
            transitionToScssVariablesReferencingCustomProperties(category.transition),
            gradientToScssVariablesReferencingCustomProperties(category.gradient),
        ]
            .filter((item) => item !== '')
            .join('\n\n');
    },
};
