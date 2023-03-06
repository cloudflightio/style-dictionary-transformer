import { describe, expect, test } from '@jest/globals';
import StyleDictionary from 'style-dictionary';
import { cloudflightPlatformConfigWith, registerItems } from './index';

describe('todo', () => {
    test('todo', () => {
        registerItems(StyleDictionary);

        const StyleDictionaryExtended = StyleDictionary.extend({
            source: ['test-data/design-tokens.json'],
            platforms: {
                ...cloudflightPlatformConfigWith({
                    styleDeclarationOutputDirectory: 'test-data/output',
                }),
            },
        });

        StyleDictionaryExtended.buildAllPlatforms();
        expect(true).toBe(true);
    });
});
