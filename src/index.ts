import StyleDictionary from 'style-dictionary';
import { cloudflightFilter } from './filters';
import { cloudflightCssImplFormat } from './formats/css-impl/css-impl-format';
import { jsonParser } from './parsers/json';
import { customPropertiesTransformGroup } from './transform-groups/custom-properties';
import { scssUsingCustomPropertiesTransformGroup } from './transform-groups/scss-using-custom-properties';
import { asCustomPropertyTransform } from './transforms/as-custom-property';
import { colorTransform } from './transforms/color-hex';
import { fontStyleTransform } from './transforms/font-style';
import { dropShadowTransform } from './transforms/drop-shadow';
import { percentTransform } from './transforms/size-percent';
import { pxTransform } from './transforms/size-px';
import { secondsTransform } from './transforms/time-s';

export interface CloudflightPlatformConfig {
    styleDeclarationOutputDirectory: string;
    styleImplOutputDirectory?: string;
}

export function registerItems(dictionary: StyleDictionary.Core): void {
    dictionary.registerTransform(colorTransform);
    dictionary.registerTransform(pxTransform);
    dictionary.registerTransform(secondsTransform);
    dictionary.registerTransform(percentTransform);
    dictionary.registerTransform(fontStyleTransform);
    dictionary.registerTransform(dropShadowTransform);
    dictionary.registerTransform(asCustomPropertyTransform);

    dictionary.registerTransformGroup(customPropertiesTransformGroup);
    dictionary.registerTransformGroup(scssUsingCustomPropertiesTransformGroup);

    dictionary.registerFilter(cloudflightFilter);

    dictionary.registerFormat(cloudflightCssImplFormat);

    dictionary.registerParser(jsonParser);
}

export function cloudflightPlatformConfigWith(
    config: CloudflightPlatformConfig,
): Record<string, StyleDictionary.Platform> {
    const declarationOutputDir = normalizeOutputDirectory(config.styleDeclarationOutputDirectory);
    const implOutputDir = normalizeOutputDirectory(config.styleImplOutputDirectory ?? declarationOutputDir);

    return {
        css: {
            transformGroup: customPropertiesTransformGroup.name,
            buildPath: implOutputDir,
            options: {
                showFileHeader: false,
            },
            files: [
                {
                    destination: 'variables_impl.css',
                    format: cloudflightCssImplFormat.name,
                    filter: cloudflightFilter.name,
                },
            ],
        },
        scss: {
            transformGroup: scssUsingCustomPropertiesTransformGroup.name,
            buildPath: declarationOutputDir,
            options: {
                showFileHeader: false,
            },
            files: [
                {
                    destination: 'variables.scss',
                    format: 'scss/variables',
                    filter: cloudflightFilter.name,
                },
            ],
        },
    };
}

function normalizeOutputDirectory(path: string): string {
    return path.endsWith('/') ? path : path + '/';
}
