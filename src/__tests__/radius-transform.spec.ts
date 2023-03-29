import { describe, expect, test } from '@jest/globals';
import StyleDictionary from 'style-dictionary';
import { cloudflightPlatformConfigWith, registerItems } from '../index';
import { readFileMinified } from '../test-util/read-file-minified';

describe('radius transform', () => {
    test('given radius when transforming then transforms properly', () => {
        registerItems(StyleDictionary);

        const StyleDictionaryExtended = StyleDictionary.extend({
            source: ['test-data/radius-transform/design-tokens.json'],
            platforms: {
                ...cloudflightPlatformConfigWith({
                    styleDeclarationOutputDirectory: 'test-data/radius-transform/actual',
                }),
            },
        });

        StyleDictionaryExtended.buildAllPlatforms();

        const expectedImpl = readFileMinified('test-data/radius-transform/expected/variables_impl.css');
        const expectedDecl = readFileMinified('test-data/radius-transform/expected/variables.scss');

        const actualImpl = readFileMinified('test-data/radius-transform/actual/variables_impl.css');
        const actualDecl = readFileMinified('test-data/radius-transform/actual/variables.scss');

        expect(actualImpl).toEqual(expectedImpl);
        expect(actualDecl).toEqual(expectedDecl);
    });
});
