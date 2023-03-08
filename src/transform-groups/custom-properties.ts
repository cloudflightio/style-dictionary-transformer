import { Named, TransformGroup } from 'style-dictionary';
import { fontStyleTransform } from '../transforms/font-style';
import { dropShadowTransform } from '../transforms/drop-shadow';
import { percentTransform } from '../transforms/size-percent';
import { pxTransform } from '../transforms/size-px';

export const customPropertiesTransformGroup: Named<TransformGroup> = {
    name: 'cloudflight/css-custom-properties',
    transforms: [
        'attribute/cti',
        'name/cti/kebab',
        'time/seconds',
        'content/icon',
        'color/hex',
        pxTransform.name,
        percentTransform.name,
        fontStyleTransform.name,
        dropShadowTransform.name,
    ],
};
