import { beforeAll, describe, expect, test } from '@jest/globals';
import StyleDictionary from 'style-dictionary';
import { cloudflightPlatformConfigWith, registerItems } from '../index';
import { readFileMinified } from '../test-util/read-file-minified';

const kinds = ['color', 'size', 'radius', 'opacity', 'border', 'spacing', 'typography'];

describe('transformations', () => {
    beforeAll(() => {
        registerItems(StyleDictionary);
    });

    test.each(kinds)('given %s when transforming then transforms properly', (kind) => {
        const StyleDictionaryExtended = StyleDictionary.extend({
            source: [`test-data/${kind}-transform/design-tokens.json`],
            platforms: {
                ...cloudflightPlatformConfigWith({
                    styleDeclarationOutputDirectory: `test-data/${kind}-transform/actual`,
                }),
            },
        });

        StyleDictionaryExtended.buildAllPlatforms();

        const expectedImpl = readFileMinified(`test-data/${kind}-transform/expected/variables_impl.css`);
        const expectedDecl = readFileMinified(`test-data/${kind}-transform/expected/variables.scss`);

        const actualImpl = readFileMinified(`test-data/${kind}-transform/actual/variables_impl.css`);
        const actualDecl = readFileMinified(`test-data/${kind}-transform/actual/variables.scss`);

        expect(actualImpl).toEqual(expectedImpl);
        expect(actualDecl).toEqual(expectedDecl);
    });
});
