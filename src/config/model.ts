export interface CloudflightPlatformConfig {
    web: WebPlatformConfig;
}

export interface WebPlatformConfig {
    format?: 'with-custom-properties' | 'with-scss-variables';
    declaration: {
        outputDirectory: string;
        outputFilename?: string;
    };
    implementation?: {
        outputDirectory?: string;
        outputFilename?: string;
    };
}

export interface NormalizedCloudflightPlatformConfig {
    web: NormalizedWebPlatformConfig;
}

export interface NormalizedWebPlatformConfig {
    format: 'with-custom-properties' | 'with-scss-variables';
    declaration: {
        outputDirectory: string;
        outputFilename: string;
    };
    implementation: {
        outputDirectory: string;
        outputFilename: string;
    };
}
