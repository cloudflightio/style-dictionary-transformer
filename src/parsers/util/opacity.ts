import { DesignToken } from 'style-dictionary';
import { numberTokenFrom } from './token';

interface OpacityProperty {
    description?: string;
    type: 'custom-opacity';
    value: number;
}

export function flattenOpacity(property: OpacityProperty): DesignToken {
    return numberTokenFrom(property.value);
}
