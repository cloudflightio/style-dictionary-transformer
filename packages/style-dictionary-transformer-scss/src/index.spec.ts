import { describe, expect, test } from '@jest/globals';
import StyleDictionary from 'style-dictionary';
import { cloudflightPlatformConfigWith } from './index';

describe('todo', () => {
    test('todo', () => {
        const StyleDictionaryExtended = StyleDictionary.extend({
            source: ['test-data/design-tokens.json'],
            platforms: {
                ...cloudflightPlatformConfigWith({
                    styleOutputDirectory: 'test-data/output',
                }),
            },
        });

        StyleDictionaryExtended.buildAllPlatforms();
        expect(true).toBe(true);
    });
});
