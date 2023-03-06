import { describe, expect, test } from '@jest/globals';
import StyleDictionary from 'style-dictionary';
import { cloudflightPlatformConfigWith, registerItems } from '../index';
import fs from 'node:fs';

describe('color transform', () => {
    test('given colors when transforming then transforms properly', () => {
        registerItems(StyleDictionary);

        const StyleDictionaryExtended = StyleDictionary.extend({
            source: ['test-data/color-transform/design-tokens.json'],
            platforms: {
                ...cloudflightPlatformConfigWith({
                    styleDeclarationOutputDirectory: 'test-data/color-transform/actual',
                }),
            },
        });

        StyleDictionaryExtended.buildAllPlatforms();

        const expectedImpl = fs.readFileSync('test-data/color-transform/expected/variables_impl.css', 'utf8');
        const expectedDecl = fs.readFileSync('test-data/color-transform/expected/variables.scss', 'utf8');

        const actualImpl = fs.readFileSync('test-data/color-transform/actual/variables_impl.css', 'utf8');
        const actualDecl = fs.readFileSync('test-data/color-transform/actual/variables.scss', 'utf8');

        expect(actualImpl).toEqual(expectedImpl);
        expect(actualDecl).toEqual(expectedDecl);
    });
});
