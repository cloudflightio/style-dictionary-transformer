import { describe, expect, test } from '@jest/globals';
import StyleDictionary from 'style-dictionary';
import { cloudflightPlatformConfigWith, registerItems } from '../index';
import { readFileMinified } from '../test-util/read-file-minified';

describe('sizes transform', () => {
    test('given sizes when transforming then transforms properly', () => {
        registerItems(StyleDictionary);

        const StyleDictionaryExtended = StyleDictionary.extend({
            source: ['test-data/sizes-transform/design-tokens.json'],
            platforms: {
                ...cloudflightPlatformConfigWith({
                    styleDeclarationOutputDirectory: 'test-data/sizes-transform/actual',
                }),
            },
        });

        StyleDictionaryExtended.buildAllPlatforms();

        const expectedImpl = readFileMinified('test-data/sizes-transform/expected/variables_impl.css');
        const expectedDecl = readFileMinified('test-data/sizes-transform/expected/variables.scss');

        const actualImpl = readFileMinified('test-data/sizes-transform/actual/variables_impl.css');
        const actualDecl = readFileMinified('test-data/sizes-transform/actual/variables.scss');

        expect(actualImpl).toEqual(expectedImpl);
        expect(actualDecl).toEqual(expectedDecl);
    });
});
