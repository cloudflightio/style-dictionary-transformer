import { Named, Transform } from 'style-dictionary';

// todo: spread not supported
export const dropShadowTransform: Named<Transform> = {
    name: 'cloudflight/drop-shadow',
    type: 'value',
    matcher: (token) => {
        return token['type'] === 'custom-shadow' && token.value['shadowType'] === 'dropShadow';
    },
    transformer: (token) => {
        return [
            optionalUnit(token.value['offsetX']),
            optionalUnit(token.value['offsetY']),
            optionalUnit(token.value['radius']),
            token.value['color'],
        ].join(' ');
    },
};

function optionalUnit<T>(value: T): T | string {
    if (typeof value === 'number' && value !== 0) {
        return value + 'px';
    } else {
        return value;
    }
}
