import StyleDictionary from 'style-dictionary';
import {cloudflightFilter} from './filters';
import {cloudflightCssImplFormat} from './formats/css-impl-format';
import {cloudflightScssVarFormat} from './formats/scss-var-format';
import {jsonParser} from './parsers/json';
import {customPropertiesTransformGroup} from './transform-groups/custom-properties';
import {scssUsingCustomPropertiesTransformGroup} from './transform-groups/scss-using-custom-properties';
import {tokenTransform} from './transforms/token';

export interface CloudflightPlatformConfig {
    styleDeclarationOutputDirectory: string;
    styleImplOutputDirectory?: string;
}

export function registerItems(dictionary: StyleDictionary.Core): void {
    dictionary.registerTransform(tokenTransform);

    dictionary.registerTransformGroup(customPropertiesTransformGroup);
    dictionary.registerTransformGroup(scssUsingCustomPropertiesTransformGroup);

    dictionary.registerFilter(cloudflightFilter);

    dictionary.registerFormat(cloudflightCssImplFormat);
    dictionary.registerFormat(cloudflightScssVarFormat);

    dictionary.registerParser(jsonParser);
}

export function cloudflightPlatformConfigWith(config: CloudflightPlatformConfig): Record<string, StyleDictionary.Platform> {
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
                    format: cloudflightScssVarFormat.name,
                    filter: cloudflightFilter.name,
                },
            ],
        },
    };
}

function normalizeOutputDirectory(path: string): string {
    return path.endsWith('/') ? path : path + '/';
}
