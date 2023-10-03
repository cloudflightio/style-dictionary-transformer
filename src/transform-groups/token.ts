import {Named, TransformGroup} from 'style-dictionary';

import {tokenTransform} from '../transforms/token';

export const tokenTransformGroup: Named<TransformGroup> = {
    name: 'cloudflight/token-transform-group',
    transforms: ['attribute/cti', 'name/cti/kebab', 'time/seconds', 'content/icon', tokenTransform.name],
};
