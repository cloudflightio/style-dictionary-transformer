import {CloudflightPlatformConfig, NormalizedCloudflightPlatformConfig} from './model';

export function normalizedConfigOf(config: CloudflightPlatformConfig): NormalizedCloudflightPlatformConfig {
    const declarationOutputDir = normalizeOutputDirectory(config.web.declaration.outputDirectory);
    const implOutputDir = normalizeOutputDirectory(config.web.implementation?.outputDirectory ?? declarationOutputDir);

    const format = config.web.format ?? 'with-custom-properties';

    return {
        web: {
            format,
            declaration: {
                outputDirectory: declarationOutputDir,
                outputFilename: config.web.declaration.outputFilename ?? 'variables.scss',
            },
            implementation: {
                outputDirectory: implOutputDir,
                outputFilename: config.web.implementation?.outputFilename ?? 'variables_impl.scss',
            },
        },
    };
}

function normalizeOutputDirectory(path: string): string {
    return path.endsWith('/') ? path : path + '/';
}
