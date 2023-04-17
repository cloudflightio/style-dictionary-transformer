import {Named, TransformGroup} from 'style-dictionary';

export const scssUsingCustomPropertiesTransformGroup: Named<TransformGroup> = {
    name: 'cloudflight/scss-using-custom-properties',
    transforms: ['attribute/cti', 'name/cti/kebab'],
};
