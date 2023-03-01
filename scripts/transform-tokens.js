const StyleDictionary = require('style-dictionary');
const { cloudflightPlatformConfigWith } = require('@cloudflight/dictionary-transformer-scss');

const StyleDictionaryExtended = StyleDictionary.extend({
    source: ['assets/design-tokens/*.json'],
    platforms: {
        ...cloudflightPlatformConfigWith({
            styleDeclarationOutputDirectory: 'stories/assets/styling',
        }),
    },
});

StyleDictionaryExtended.buildAllPlatforms();
