import StyleDictionary from 'style-dictionary';

import {CloudflightPlatformConfig} from './config/model';
import {normalizedConfigOf} from './config/normalize';
import {webConfigFrom} from './config/web';
import {cssImplementationReferencingCustomPropertiesFormat} from './formats/css-implementation-referencing-custom-properties-format';
import {cssImplementationReferencingScssVariablesFormat} from './formats/css-implementation-referencing-scss-variables-format';
import {scssDeclarationReferencingCustomPropertiesFormat} from './formats/scss-declaration-referencing-custom-properties-format';
import {scssDeclarationReferencingScssVariablesFormat} from './formats/scss-declaration-referencing-scss-variables-format';
import {jsonParser} from './parsers/json';
import {simpleNamingTransformGroup} from './transform-groups/simple-naming';
import {tokenTransformGroup} from './transform-groups/token';
import {tokenTransform} from './transforms/token';
import {cloudflightFilter} from './filters';

export {type CloudflightPlatformConfig} from './config/model';

export function registerItems(dictionary: StyleDictionary.Core): void {
    dictionary.registerTransform(tokenTransform);

    dictionary.registerTransformGroup(tokenTransformGroup);
    dictionary.registerTransformGroup(simpleNamingTransformGroup);

    dictionary.registerFilter(cloudflightFilter);

    dictionary.registerFormat(cssImplementationReferencingCustomPropertiesFormat);
    dictionary.registerFormat(scssDeclarationReferencingCustomPropertiesFormat);
    dictionary.registerFormat(cssImplementationReferencingScssVariablesFormat);
    dictionary.registerFormat(scssDeclarationReferencingScssVariablesFormat);

    dictionary.registerParser(jsonParser);
}

export function cloudflightPlatformConfigWith(config: CloudflightPlatformConfig): Record<string, StyleDictionary.Platform> {
    const normalizedConfig = normalizedConfigOf(config);

    return {
        ...webConfigFrom(normalizedConfig.web),
    };
}
