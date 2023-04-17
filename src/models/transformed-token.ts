import {TransformedToken} from 'style-dictionary';

export interface TransformedColorToken extends TransformedToken {
    description?: string;
    type: 'color';
    value: string;
}

export interface TransformedSizeToken extends TransformedToken {
    description?: string;
    type: 'dimension';
    value: string;
}

export interface TransformedRadiusToken extends TransformedToken {
    description?: string;
    type: 'custom-radius';
    value: {
        topLeft: string;
        topRight: string;
        bottomLeft: string;
        bottomRight: string;
    };
}

export interface TransformedBorderToken extends TransformedToken {
    description?: string;
    type: 'custom-stroke';
    value: {
        width: string;
        color: string;
    };
}

export interface TransformedSpacingToken extends TransformedToken {
    description?: string;
    type: 'custom-spacing';
    value: {
        top: string;
        bottom: string;
        left: string;
        right: string;
    };
}

export interface TransformedFontToken extends TransformedToken {
    description?: string;
    type: 'custom-fontStyle';
    value: {
        fontSize: string;
        textDecoration: string;
        fontFamily: string;
        fontWeight: number;
        fontStyle: string;
        fontStretch: string;
        letterSpacing: string;
        lineHeight: number;
        paragraphIndent: string;
        textCase: string;
    };
}

export interface TransformedGradientToken extends TransformedToken {
    description?: string;
    type: 'custom-gradient';
    value: {
        gradientType: string;
        rotation: string;
        stops: {position: string; color: string}[];
    };
}

export interface TransformedOpacityToken extends TransformedToken {
    description?: string;
    type: 'custom-opacity';
    value: number;
}

export interface TransformedShadowToken extends TransformedToken {
    description?: string;
    type: 'custom-shadow';
    value: {
        radius: string;
        color: string;
        offsetX: string;
        offsetY: string;
    };
}

export interface TransformedTransitionToken extends TransformedToken {
    description?: string;
    type: 'custom-transition';
    value: {
        duration: string;
        easingType: 'cubicBezier';
        easingFunction: {
            x1: number;
            x2: number;
            y1: number;
            y2: number;
        };
    };
}
