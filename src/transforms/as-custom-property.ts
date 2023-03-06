import { Named, Transform } from 'style-dictionary';

export const asCustomPropertyTransform: Named<Transform> = {
    name: 'cloudflight/as-custom-property',
    type: 'value',
    transformer: (token) => `var(--${token.name})`,
};
