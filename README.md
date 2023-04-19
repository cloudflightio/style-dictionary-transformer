# Cloudflight Style Dictionary

[![License](https://img.shields.io/badge/License-Apache_2.0-green.svg)](https://opensource.org/licenses/Apache-2.0)
![master](https://github.com/cloudflightio/cloudflight-style-dictionary-transformer/actions/workflows/build.yml/badge.svg?branch=master)
[![@cloudflight/style-dictionary-transformer](https://img.shields.io/npm/v/@cloudflight/style-dictionary-transformer?label=@cloudflight/style-dictionary-transformer)](https://www.npmjs.com/package/@cloudflight/style-dictionary-transformer)

Amazon style dictionary configured with Cloudflight best practices in mind.

## Installation

The following dependencies are required:

```
"style-dictionary": "*"
```

## Usage

Create a javascript file with the following content:

```javascript
import {cloudflightPlatformConfigWith, registerItems} from '@cloudflight/style-dictionary-transformer';
import StyleDictionary from 'style-dictionary';

registerItems(StyleDictionary);

const StyleDictionaryExtended = StyleDictionary.extend({
    source: ['assets/design-tokens/*.json'],
    platforms: {
        ...cloudflightPlatformConfigWith({
            declaration: {
                outputDirectory: '<your-output-directory>',
            },
        }),
    },
});

StyleDictionaryExtended.buildAllPlatforms();
```

Execute this script as part of your build. It will generate styles into you output directory for further use.

## Contributing

-   [Contributing to the project](CONTRIBUTING.md)
