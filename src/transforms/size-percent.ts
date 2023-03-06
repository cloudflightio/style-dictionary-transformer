import { Named, Transform } from 'style-dictionary';

export const percentTransform: Named<Transform> = {
    name: 'cloudflight/size-percent',
    type: 'value',
    matcher: (token) => {
        return token['unit'] === 'percent' && token.value !== 0;
    },
    transformer: (token) => `${token.value}%`,
};
