const StyleDictionary = require('style-dictionary');
const { cloudflightPlatformConfigWith, registerItems } = require('@cloudflight/dictionary-transformer-scss');

registerItems(StyleDictionary);

const StyleDictionaryExtended = StyleDictionary.extend({
    source: ['assets/design-tokens/*.json'],
    platforms: {
        ...cloudflightPlatformConfigWith({
            styleDeclarationOutputDirectory: 'stories/assets/styling',
        }),
    },
});

StyleDictionaryExtended.buildAllPlatforms();
