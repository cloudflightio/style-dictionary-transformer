import { DesignToken } from 'style-dictionary';
import { gradientTokenEndings } from '../../models/token-endings';
import { colorTokenFrom, degreeTokenFrom, percentTokenFrom, stringTokenFrom } from './token';

interface GradientProperty {
    description?: string;
    type: 'custom-gradient';
    value: {
        gradientType: string;
        rotation: number;
        stops: { position: number; color: string }[];
    };
}

const percentMultiplicator = 100;

export function flattenGradient(property: GradientProperty): Record<string, DesignToken> {
    return [
        { key: gradientTokenEndings.kind, value: stringTokenFrom(property.value.gradientType) },
        { key: gradientTokenEndings.rotation, value: degreeTokenFrom(property.value.rotation) },
        ...property.value.stops.flatMap((stop, index) => [
            {
                key: `-${index}-${gradientTokenEndings.stepPosition}`,
                value: percentTokenFrom(stop.position * percentMultiplicator),
            },
            {
                key: `-${index}-${gradientTokenEndings.stepColor}`,
                value: colorTokenFrom(stop.color),
            },
        ]),
    ].reduce<Record<string, DesignToken>>((acc, entry) => {
        acc[entry.key] = entry.value;

        return acc;
    }, {});
}
