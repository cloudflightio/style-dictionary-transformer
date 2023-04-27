import StyleDictionary from 'style-dictionary';
import {cloudflightFilter} from '../filters';
import {cssImplementationReferencingCustomPropertiesFormat} from '../formats/css-implementation-referencing-custom-properties-format';
import {cssImplementationReferencingScssVariablesFormat} from '../formats/css-implementation-referencing-scss-variables-format';
import {scssDeclarationReferencingCustomPropertiesFormat} from '../formats/scss-declaration-referencing-custom-properties-format';
import {scssDeclarationReferencingScssVariablesFormat} from '../formats/scss-declaration-referencing-scss-variables-format';
import {tokenTransformGroup} from '../transform-groups/token';
import {simpleNamingTransformGroup} from '../transform-groups/simple-naming';
import {NormalizedWebPlatformConfig} from './model';

export function webConfigFrom(config: NormalizedWebPlatformConfig): Record<string, StyleDictionary.Platform> {
    switch (config.format) {
        case 'with-custom-properties':
            return customPropertyBasedConfigFrom(config);
        case 'with-scss-variables':
            return scssVariableBasedConfigFrom(config);
    }
}

function customPropertyBasedConfigFrom(config: NormalizedWebPlatformConfig): Record<string, StyleDictionary.Platform> {
    return {
        css: {
            transformGroup: tokenTransformGroup.name,
            buildPath: config.implementation.outputDirectory,
            options: {
                showFileHeader: false,
            },
            files: [
                {
                    destination: config.implementation.outputFilename,
                    format: cssImplementationReferencingCustomPropertiesFormat.name,
                    filter: cloudflightFilter.name,
                },
            ],
        },
        scss: {
            transformGroup: simpleNamingTransformGroup.name,
            buildPath: config.declaration.outputDirectory,
            options: {
                showFileHeader: false,
            },
            files: [
                {
                    destination: config.declaration.outputFilename,
                    format: scssDeclarationReferencingCustomPropertiesFormat.name,
                    filter: cloudflightFilter.name,
                },
            ],
        },
    };
}

function scssVariableBasedConfigFrom(config: NormalizedWebPlatformConfig): Record<string, StyleDictionary.Platform> {
    return {
        css: {
            transformGroup: tokenTransformGroup.name,
            buildPath: config.implementation.outputDirectory,
            options: {
                showFileHeader: false,
            },
            files: [
                {
                    destination: config.implementation.outputFilename,
                    format: cssImplementationReferencingScssVariablesFormat.name,
                    filter: cloudflightFilter.name,
                },
            ],
        },
        scss: {
            transformGroup: tokenTransformGroup.name,
            buildPath: config.declaration.outputDirectory,
            options: {
                showFileHeader: false,
            },
            files: [
                {
                    destination: config.declaration.outputFilename,
                    format: scssDeclarationReferencingScssVariablesFormat.name,
                    filter: cloudflightFilter.name,
                },
            ],
        },
    };
}
