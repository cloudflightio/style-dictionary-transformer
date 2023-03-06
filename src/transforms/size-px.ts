import { Named, Transform } from 'style-dictionary';

export const pxTransform: Named<Transform> = {
    name: 'cloudflight/size-px',
    type: 'value',
    matcher: (token) => {
        return (token['unit'] === 'pixel' || token['type'] === 'dimension') && token.value !== 0;
    },
    transformer: (token) => `${token.value}px`,
};
