import {Named, Transform} from 'style-dictionary';
import tinycolor from 'tinycolor2';
import {
    BorderProperty,
    ColorProperty,
    FontProperty,
    GradientProperty,
    isRelevantProperty,
    OpacityProperty,
    RadiusProperty,
    ShadowProperty,
    SizeProperty,
    SpacingProperty,
    TransitionProperty,
} from '../models/raw-tokens';
import {tokenTypes} from '../models/token-types';
import {
    TransformedBorderToken,
    TransformedColorToken,
    TransformedFontToken,
    TransformedGradientToken,
    TransformedOpacityToken,
    TransformedRadiusToken,
    TransformedShadowToken,
    TransformedSizeToken,
    TransformedSpacingToken,
    TransformedTransitionToken,
} from '../models/transformed-token';

const percentMultiplicator = 100;

export const tokenTransform: Named<Transform> = {
    name: 'cloudflight/radius',
    type: 'value',
    matcher: (token) => tokenTypes.includes(token['type']),
    transformer(token) {
        if (!isRelevantProperty(token)) {
            throw new Error('Unsupported token has been passed.');
        }

        switch (token.type) {
            case 'color':
                return transformColor(token);
            case 'dimension':
                return transformSize(token);
            case 'custom-radius':
                return transformRadius(token);
            case 'custom-stroke':
                return transformBorder(token);
            case 'custom-spacing':
                return transformSpacing(token);
            case 'custom-opacity':
                return transformOpacity(token);
            case 'custom-fontStyle':
                return transformFont(token);
            case 'custom-gradient':
                return transformGradient(token);
            case 'custom-transition':
                return transformTransition(token);
            case 'custom-shadow':
                return transformShadow(token);
        }
    },
};

function transformColor(token: ColorProperty): TransformedColorToken['value'] {
    return hex(token.value);
}

function transformSize(token: SizeProperty): TransformedSizeToken['value'] {
    return px(token.value);
}

function transformRadius(token: RadiusProperty): TransformedRadiusToken['value'] {
    return {
        topLeft: px(token.value.topLeft),
        topRight: px(token.value.topRight),
        bottomLeft: px(token.value.bottomLeft),
        bottomRight: px(token.value.bottomRight),
    };
}

function transformBorder(token: BorderProperty): TransformedBorderToken['value'] {
    return {
        width: px(token.value.weight),
        color: hex(token.value.color),
    };
}

function transformSpacing(token: SpacingProperty): TransformedSpacingToken['value'] {
    return {
        top: px(token.value.top),
        right: px(token.value.right),
        left: px(token.value.left),
        bottom: px(token.value.bottom),
    };
}

function transformOpacity(token: OpacityProperty): TransformedOpacityToken['value'] {
    return token.value;
}

function transformFont(token: FontProperty): TransformedFontToken['value'] {
    return {
        fontSize: px(token.value.fontSize),
        textDecoration: token.value.textDecoration,
        fontFamily: token.value.fontFamily,
        fontWeight: token.value.fontWeight,
        fontStyle: token.value.fontStyle,
        fontStretch: token.value.fontStretch,
        letterSpacing: px(token.value.letterSpacing),
        lineHeight: token.value.lineHeight,
        paragraphIndent: px(token.value.paragraphIndent),
        textCase: token.value.textCase,
    };
}

function transformGradient(token: GradientProperty): TransformedGradientToken['value'] {
    return {
        gradientType: token.value.gradientType,
        rotation: degree(token.value.rotation),
        stops: token.value.stops.map((stop) => ({
            position: percent(stop.position * percentMultiplicator),
            color: hex(stop.color),
        })),
    };
}

function transformTransition(token: TransitionProperty): TransformedTransitionToken['value'] {
    return {
        duration: seconds(token.value.duration),
        easingFunction: token.value.easingFunction,
        easingType: token.value.easingType,
    };
}

function transformShadow(token: ShadowProperty): TransformedShadowToken['value'] {
    return {
        radius: px(token.value.radius),
        color: hex(token.value.color),
        offsetX: px(token.value.offsetX),
        offsetY: px(token.value.offsetY),
    };
}

function px(value: number): string {
    return value !== 0 ? `${value}px` : '0';
}

function degree(value: number): string {
    return value !== 0 ? `${value}deg` : '0';
}

function percent(value: number): string {
    return value !== 0 ? `${value}%` : '0';
}

function seconds(value: number): string {
    return value !== 0 ? `${value}s` : '0';
}

function hex(value: string): string {
    return tinycolor(value).toHexString();
}
