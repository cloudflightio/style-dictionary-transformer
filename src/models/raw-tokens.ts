export interface ColorProperty {
    description?: string;
    type: 'color';
    value: string;
}

export interface SizeProperty {
    description?: string;
    type: 'dimension';
    value: number;
}

export interface RadiusProperty {
    description?: string;
    type: 'custom-radius';
    value: {
        smoothing: number;
        topLeft: number;
        topRight: number;
        bottomLeft: number;
        bottomRight: number;
    };
}

export interface BorderProperty {
    description?: string;
    type: 'custom-stroke';
    value: {
        align: 'inside' | 'center' | 'outside';
        dashPattern: number[];
        lineCap: string;
        lineJoin: string;
        miterLimit: number;
        weight: number;
        color: string;
    };
}

export interface SpacingProperty {
    description?: string;
    type: 'custom-spacing';
    value: {
        top: number;
        bottom: number;
        left: number;
        right: number;
    };
}

export interface FontProperty {
    description?: string;
    type: 'custom-fontStyle';
    value: {
        fontSize: number;
        textDecoration: string;
        fontFamily: string;
        fontWeight: number;
        fontStyle: string;
        fontStretch: string;
        letterSpacing: number;
        lineHeight: number;
        paragraphIndent: number;
        paragraphSpacing: number;
        textCase: string;
    };
}

export interface GradientProperty {
    description?: string;
    type: 'custom-gradient';
    value: {
        gradientType: string;
        rotation: number;
        stops: {position: number; color: string}[];
    };
}

export interface OpacityProperty {
    description?: string;
    type: 'custom-opacity';
    value: number;
}

export interface ShadowProperty {
    description?: string;
    type: 'custom-shadow';
    value: {
        shadowType: string;
        radius: number;
        color: string;
        offsetX: number;
        offsetY: number;
        spread: number;
    };
}

export interface TransitionProperty {
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
