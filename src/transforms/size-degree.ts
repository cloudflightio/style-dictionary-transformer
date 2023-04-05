import { Named, Transform } from 'style-dictionary';
import { tokenTypes } from '../models/token-types';

export const degreeTransform: Named<Transform> = {
    name: 'cloudflight/size-degree',
    type: 'value',
    matcher: (token) => {
        return token['type'] === tokenTypes.degree && token.value !== 0;
    },
    transformer: (token) => `${token.value}deg`,
};
