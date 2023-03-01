import { Named, TransformGroup } from 'style-dictionary';
import { asCustomPropertyTransform } from '../transforms/as-custom-property';

export const scssUsingCustomPropertiesTransformGroup: Named<TransformGroup> = {
    name: 'cloudflight/scss-using-custom-properties',
    transforms: ['attribute/cti', 'name/cti/kebab', asCustomPropertyTransform.name],
};
