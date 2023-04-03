export interface TransitionTimingFunction {
    type: 'cubicBezier';
    easingFunction: {
        x1: number;
        x2: number;
        y1: number;
        y2: number;
    };
}

export function isTransitionTimingFunction(value: unknown): value is TransitionTimingFunction {
    return typeof value === 'object' && value != null && 'type' in value && value['type'] === 'cubicBezier';
}
