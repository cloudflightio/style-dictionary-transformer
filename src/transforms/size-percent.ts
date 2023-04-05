import { Named, Transform } from 'style-dictionary';
import { tokenTypes } from '../models/token-types';

export const percentTransform: Named<Transform> = {
    name: 'cloudflight/size-percent',
    type: 'value',
    matcher: (token) => {
        return (token['unit'] === 'percent' || token['type'] === tokenTypes.percent) && token.value !== 0;
    },
    transformer: (token) => `${token.value}%`,
};
