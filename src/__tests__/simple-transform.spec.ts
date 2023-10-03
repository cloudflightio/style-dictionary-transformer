import {beforeAll, describe, expect, test} from '@jest/globals';
import StyleDictionary from 'style-dictionary';

import {cloudflightPlatformConfigWith, registerItems} from '../index';
import {readFileMinified} from '../test-util/read-file-minified';

const kinds = ['color', 'size', 'radius', 'opacity', 'border', 'spacing', 'font', 'motion', 'gradient', 'shadow'];

describe('when transforming', () => {
    beforeAll(() => {
        registerItems(StyleDictionary);
    });

    test.each(kinds)('given %s and custom properties as format then transforms properly', (kind) => {
        const StyleDictionaryExtended = StyleDictionary.extend({
            source: [`test-data/${kind}-transform/design-tokens.json`],
            platforms: {
                ...cloudflightPlatformConfigWith({
                    web: {
                        format: 'with-custom-properties',
                        declaration: {
                            outputDirectory: `test-data/${kind}-transform/custom-properties/actual`,
                        },
                    },
                }),
            },
        });

        StyleDictionaryExtended.buildAllPlatforms();

        const expectedImpl = readFileMinified(`test-data/${kind}-transform/custom-properties/expected/variables_impl.scss`);
        const expectedDecl = readFileMinified(`test-data/${kind}-transform/custom-properties/expected/variables.scss`);

        const actualImpl = readFileMinified(`test-data/${kind}-transform/custom-properties/actual/variables_impl.scss`);
        const actualDecl = readFileMinified(`test-data/${kind}-transform/custom-properties/actual/variables.scss`);

        expect(actualImpl).toEqual(expectedImpl);
        expect(actualDecl).toEqual(expectedDecl);
    });

    test.each(kinds)('given %s and scss variables as format then transforms properly', (kind) => {
        const StyleDictionaryExtended = StyleDictionary.extend({
            source: [`test-data/${kind}-transform/design-tokens.json`],
            platforms: {
                ...cloudflightPlatformConfigWith({
                    web: {
                        format: 'with-scss-variables',
                        declaration: {
                            outputDirectory: `test-data/${kind}-transform/scss-variables/actual`,
                        },
                    },
                }),
            },
        });

        StyleDictionaryExtended.buildAllPlatforms();

        const expectedImpl = readFileMinified(`test-data/${kind}-transform/scss-variables/expected/variables_impl.scss`);
        const expectedDecl = readFileMinified(`test-data/${kind}-transform/scss-variables/expected/variables.scss`);

        const actualImpl = readFileMinified(`test-data/${kind}-transform/scss-variables/actual/variables_impl.scss`);
        const actualDecl = readFileMinified(`test-data/${kind}-transform/scss-variables/actual/variables.scss`);

        expect(actualImpl).toEqual(expectedImpl);
        expect(actualDecl).toEqual(expectedDecl);
    });
});
