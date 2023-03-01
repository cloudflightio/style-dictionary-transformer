import StyleDictionary from 'style-dictionary';
import { Platform } from 'style-dictionary/types/Platform';
import { cloudflightFilter } from './filters';
import { customPropertiesTransformGroup } from './transform-groups/custom-properties';
import { scssUsingCustomPropertiesTransformGroup } from './transform-groups/scss-using-custom-properties';
import { asCustomPropertyTransform } from './transforms/as-custom-property';
import { fontStyleTransform } from './transforms/font-style';
import { dropShadowTransform } from './transforms/drop-shadow';
import { percentTransform } from './transforms/size-percent';
import { pxTransform } from './transforms/size-px';

StyleDictionary.registerTransform(pxTransform);
StyleDictionary.registerTransform(percentTransform);
StyleDictionary.registerTransform(fontStyleTransform);
StyleDictionary.registerTransform(dropShadowTransform);
StyleDictionary.registerTransform(asCustomPropertyTransform);

StyleDictionary.registerTransformGroup(customPropertiesTransformGroup);
StyleDictionary.registerTransformGroup(scssUsingCustomPropertiesTransformGroup);

StyleDictionary.registerFilter(cloudflightFilter);

export interface CloudflightPlatformConfig {
    styleDeclarationOutputDirectory: string;
    styleImplOutputDirectory?: string;
}

export function cloudflightPlatformConfigWith(config: CloudflightPlatformConfig): Record<string, Platform> {
    const declarationOutputDir = normalizeOutputDirectory(config.styleDeclarationOutputDirectory);
    const implOutputDir = normalizeOutputDirectory(config.styleImplOutputDirectory ?? declarationOutputDir);

    return {
        css: {
            transformGroup: customPropertiesTransformGroup.name,
            buildPath: implOutputDir,
            files: [
                {
                    destination: 'variables_impl.css',
                    format: 'css/variables',
                    filter: cloudflightFilter.name,
                },
            ],
        },
        scss: {
            transformGroup: scssUsingCustomPropertiesTransformGroup.name,
            buildPath: declarationOutputDir,
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
