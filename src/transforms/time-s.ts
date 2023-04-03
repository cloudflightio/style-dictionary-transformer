import { Named, Transform } from 'style-dictionary';
import { tokenTypes } from '../models/token-types';

export const secondsTransform: Named<Transform> = {
    name: 'cloudflight/time-s',
    type: 'value',
    matcher: (token) => {
        return token['type'] === tokenTypes.time && token.value !== 0;
    },
    transformer: (token) => `${token.value}s`,
};
