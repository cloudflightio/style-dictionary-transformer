import { Named, Transform } from 'style-dictionary';
import { borderWidthType } from '../models/border';
import { radiusType } from '../models/radius';

export const pxTransform: Named<Transform> = {
    name: 'cloudflight/size-px',
    type: 'value',
    matcher: (token) => {
        return (
            (token['unit'] === 'pixel' ||
                token['type'] === 'dimension' ||
                token['type'] === radiusType ||
                token['type'] === borderWidthType) &&
            token.value !== 0
        );
    },
    transformer: (token) => `${token.value}px`,
};
