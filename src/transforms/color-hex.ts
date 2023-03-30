import { Named, Transform } from 'style-dictionary';
import { borderColorType } from '../models/border';
import tinycolor from 'tinycolor2';

export const colorTransform: Named<Transform> = {
    name: 'cloudflight/color-hex',
    type: 'value',
    matcher: (token) => {
        return token.attributes?.category === 'color' || token['type'] === borderColorType;
    },
    transformer: (token) => tinycolor(token.value).toHexString(),
};
