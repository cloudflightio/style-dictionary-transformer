export const radiusTokenEndings = {
    topLeft: '-top-left',
    topRight: '-top-right',
    bottomLeft: '-bottom-left',
    bottomRight: '-bottom-right',
} as const;

export const borderTokenEndings = {
    width: '-width',
    color: '-color',
} as const;

export const spacingTokenEndings = {
    top: '-top',
    right: '-right',
    left: '-left',
    bottom: '-bottom',
} as const;

export const fontTokenEndings = {
    fontSize: '-font-size',
    textDecoration: '-text-decoration',
    fontFamily: '-font-family',
    fontWeight: '-font-weight',
    fontStyle: '-font-style',
    fontStretch: '-font-stretch',
    letterSpacing: '-letter-spacing',
    lineHeight: '-line-height',
    paragraphIndent: '-paragraph-indent',
    textCase: '-text-case',
} as const;

export const transitionTokenEndings = {
    duration: '-duration',
    timingFunction: '-timing-function',
} as const;

export const gradientTokenEndings = {
    kind: '-kind',
    rotation: '-rotation',
    stepPosition: '-step-position',
    stepColor: '-step-color',
} as const;

export const shadowTokenEndings = {
    radius: '-radius',
    color: '-color',
    offsetX: '-offset-x',
    offsetY: '-offset-y',
} as const;
