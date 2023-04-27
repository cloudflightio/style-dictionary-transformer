import {Named, TransformGroup} from 'style-dictionary';

export const simpleNamingTransformGroup: Named<TransformGroup> = {
    name: 'cloudflight/simple-naming-transform-group',
    transforms: ['attribute/cti', 'name/cti/kebab'],
};
