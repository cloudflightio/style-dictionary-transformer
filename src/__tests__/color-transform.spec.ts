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

        const expectedImpl = readFile('test-data/color-transform/expected/variables_impl.css');
        const expectedDecl = readFile('test-data/color-transform/expected/variables.scss');

        const actualImpl = readFile('test-data/color-transform/actual/variables_impl.css');
        const actualDecl = readFile('test-data/color-transform/actual/variables.scss');

        expect(actualImpl).toEqual(expectedImpl);
        expect(actualDecl).toEqual(expectedDecl);
    });
});

function readFile(path: string): string {
    return fs.readFileSync(path, 'utf8').replaceAll(' ', '').replaceAll('\r', '').replaceAll('\n', '');
}
