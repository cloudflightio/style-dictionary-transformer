import { Named, TransformGroup } from 'style-dictionary';
import { colorTransform } from '../transforms/color-hex';
import { fontStyleTransform } from '../transforms/font-style';
import { dropShadowTransform } from '../transforms/drop-shadow';
import { percentTransform } from '../transforms/size-percent';
import { pxTransform } from '../transforms/size-px';
import { secondsTransform } from '../transforms/time-s';

export const customPropertiesTransformGroup: Named<TransformGroup> = {
    name: 'cloudflight/css-custom-properties',
    transforms: [
        'attribute/cti',
        'name/cti/kebab',
        'time/seconds',
        'content/icon',
        colorTransform.name,
        pxTransform.name,
        secondsTransform.name,
        percentTransform.name,
        fontStyleTransform.name,
        dropShadowTransform.name,
    ],
};
