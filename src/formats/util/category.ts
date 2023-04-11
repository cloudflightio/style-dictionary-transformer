import { Dictionary } from 'style-dictionary';
import { tokenTypes } from '../../models/token-types';
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
} from '../../models/transformed-token';
import { ArrayElement } from '../../util/array';
import { CategorizedTokens } from '../models/categorized-tokens';

export function categoryFrom(dictionary: Dictionary): CategorizedTokens {
    const accumulator: CategorizedTokens = {
        radius: [],
        border: [],
        spacing: [],
        color: [],
        opacity: [],
        size: [],
        font: [],
        shadow: [],
        transition: [],
        gradient: [],
    };

    return dictionary.allTokens.reduce<CategorizedTokens>((acc, token) => {
        switch (token['type'] as ArrayElement<typeof tokenTypes>) {
            case 'color':
                acc.color = [...acc.color, token as TransformedColorToken];
                break;
            case 'dimension':
                acc.size = [...acc.size, token as TransformedSizeToken];
                break;
            case 'custom-radius':
                acc.radius = [...acc.radius, token as TransformedRadiusToken];
                break;
            case 'custom-stroke':
                acc.border = [...acc.border, token as TransformedBorderToken];
                break;
            case 'custom-spacing':
                acc.spacing = [...acc.spacing, token as TransformedSpacingToken];
                break;
            case 'custom-opacity':
                acc.opacity = [...acc.opacity, token as TransformedOpacityToken];
                break;
            case 'custom-fontStyle':
                acc.font = [...acc.font, token as TransformedFontToken];
                break;
            case 'custom-gradient':
                acc.gradient = [...acc.gradient, token as TransformedGradientToken];
                break;
            case 'custom-transition':
                acc.transition = [...acc.transition, token as TransformedTransitionToken];
                break;
            case 'custom-shadow':
                acc.shadow = [...acc.shadow, token as TransformedShadowToken];
                break;
            default:
                break;
        }

        return acc;
    }, accumulator);
}
