import { DesignToken } from 'style-dictionary';
import { transitionTokenEndings } from '../../models/token-endings';
import { TransitionTimingFunction } from '../../models/transition';
import { objectTokenFrom, timeTokenFrom } from './token';

type TransitionProperty = CubicBezierTransition | SpringTransition;

interface CubicBezierTransition {
    description?: string;
    type: 'custom-transition';
    value: {
        transitionType: string;
        duration: number;
        direction: string;
        easingType: 'cubicBezier';
        easingFunction: {
            x1: number;
            x2: number;
            y1: number;
            y2: number;
        };
    };
}

interface SpringTransition {
    description?: string;
    type: 'custom-transition';
    value: {
        transitionType: string;
        duration: number;
        direction: string;
        easingType: 'spring';
        easingFunction: {
            mass: number;
            stiffness: number;
            damping: number;
        };
    };
}

export function flattenTransition(property: TransitionProperty): Record<string, DesignToken> {
    switch (property.value.easingType) {
        case 'spring':
            return {};
        case 'cubicBezier':
            break;
    }

    return [
        { key: transitionTokenEndings.duration, value: timeTokenFrom(property.value.duration) },
        {
            key: transitionTokenEndings.timingFunction,
            value: objectTokenFrom<TransitionTimingFunction>({
                type: property.value.easingType,
                easingFunction: property.value.easingFunction,
            }),
        },
    ].reduce<Record<string, DesignToken>>((acc, entry) => {
        acc[entry.key] = entry.value;

        return acc;
    }, {});
}
