import { Named, Transform } from 'style-dictionary';
import { tokenTypes } from '../models/token-types';

export const pxTransform: Named<Transform> = {
    name: 'cloudflight/size-px',
    type: 'value',
    matcher: (token) => {
        return (token['unit'] === 'pixel' || token['type'] === tokenTypes.dimension) && token.value !== 0;
    },
    transformer: (token) => `${token.value}px`,
};
