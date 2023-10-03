import {Format} from 'style-dictionary';

import {borderToScssVariables} from './serializer/border';
import {colorToScssVariables} from './serializer/color';
import {fontToScssVariables} from './serializer/font';
import {gradientToScssVariables} from './serializer/gradient';
import {opacityToScssVariables} from './serializer/opacity';
import {radiusToScssVariables} from './serializer/radius';
import {shadowToScssVariables} from './serializer/shadow';
import {sizeToScssVariables} from './serializer/size';
import {spacingToScssVariables} from './serializer/spacing';
import {transitionToScssVariables} from './serializer/transition';
import {categoryFrom} from './util/category';

export const scssDeclarationReferencingScssVariablesFormat: Format = {
    name: 'cloudflight/scss-declaration-referencing-scss-variables-format',
    formatter({dictionary}) {
        const category = categoryFrom(dictionary);

        return [
            colorToScssVariables(category.color),
            radiusToScssVariables(category.radius),
            borderToScssVariables(category.border),
            spacingToScssVariables(category.spacing),
            opacityToScssVariables(category.opacity),
            sizeToScssVariables(category.size),
            fontToScssVariables(category.font),
            shadowToScssVariables(category.shadow),
            transitionToScssVariables(category.transition),
            gradientToScssVariables(category.gradient),
        ]
            .filter((item) => item !== '')
            .join('\n\n');
    },
};
