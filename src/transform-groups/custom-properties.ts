import {Named, TransformGroup} from 'style-dictionary';
import {tokenTransform} from '../transforms/token';

export const customPropertiesTransformGroup: Named<TransformGroup> = {
    name: 'cloudflight/css-custom-properties',
    transforms: ['attribute/cti', 'name/cti/kebab', 'time/seconds', 'content/icon', tokenTransform.name],
};
