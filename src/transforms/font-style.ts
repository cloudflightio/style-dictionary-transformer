import { Named, Transform } from 'style-dictionary';

// todo: some properties cannot be incuded in this shorthand
export const fontStyleTransform: Named<Transform> = {
    name: 'cloudflight/font-style',
    type: 'value',
    matcher: (token) => {
        return token['type'] === 'custom-fontStyle';
    },
    transformer: (token) => {
        return [
            token.value['fontSize'] + 'px',
            `"${token.value['fontFamily']}"`,
            token.value['fontStyle'],
            token.value['fontWeight'],
            token.value['fontStretch'],
            token.value['lineHeight'],
        ].join(' ');
    },
};
