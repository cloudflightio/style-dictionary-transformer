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

export interface CategorizedTokens {
    radius: TransformedRadiusToken[];
    border: TransformedBorderToken[];
    spacing: TransformedSpacingToken[];
    color: TransformedColorToken[];
    opacity: TransformedOpacityToken[];
    size: TransformedSizeToken[];
    font: TransformedFontToken[];
    shadow: TransformedShadowToken[];
    transition: TransformedTransitionToken[];
    gradient: TransformedGradientToken[];
}
