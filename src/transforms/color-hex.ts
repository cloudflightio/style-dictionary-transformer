import { Named, Transform } from 'style-dictionary';
import tinycolor from 'tinycolor2';
import { tokenTypes } from '../models/token-types';

export const colorTransform: Named<Transform> = {
    name: 'cloudflight/color-hex',
    type: 'value',
    matcher: (token) => {
        return token.attributes?.category === 'color' || token['type'] === tokenTypes.color;
    },
    transformer: (token) => tinycolor(token.value).toHexString(),
};
