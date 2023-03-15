import { describe, expect, test } from '@jest/globals';
import StyleDictionary from 'style-dictionary';
import { cloudflightPlatformConfigWith, registerItems } from '../index';
import { readFileMinified } from '../test-util/read-file-minified';

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

        const expectedImpl = readFileMinified('test-data/color-transform/expected/variables_impl.css');
        const expectedDecl = readFileMinified('test-data/color-transform/expected/variables.scss');

        const actualImpl = readFileMinified('test-data/color-transform/actual/variables_impl.css');
        const actualDecl = readFileMinified('test-data/color-transform/actual/variables.scss');

        expect(actualImpl).toEqual(expectedImpl);
        expect(actualDecl).toEqual(expectedDecl);
    });
});
