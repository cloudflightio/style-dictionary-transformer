import {cloudflightPlatformConfigWith, registerItems} from '../dist/index.js';
import StyleDictionary from 'style-dictionary';

registerItems(StyleDictionary);

const StyleDictionaryExtended = StyleDictionary.extend({
    source: ['assets/design-tokens/*.json'],
    platforms: {
        ...cloudflightPlatformConfigWith({
            web: {
                declaration: {
                    outputDirectory: 'stories/assets/styling',
                },
            },
        }),
    },
});

StyleDictionaryExtended.buildAllPlatforms();
