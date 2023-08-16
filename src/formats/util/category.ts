import {Dictionary} from 'style-dictionary';
import {isExtendedTransformedToken} from '../../models/transformed-token';
import {CategorizedTokens} from '../models/categorized-tokens';

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
        if (!isExtendedTransformedToken(token)) {
            return acc;
        }

        switch (token.type) {
            case 'color':
                acc.color = [...acc.color, token];
                break;
            case 'dimension':
                acc.size = [...acc.size, token];
                break;
            case 'custom-radius':
                acc.radius = [...acc.radius, token];
                break;
            case 'custom-stroke':
                acc.border = [...acc.border, token];
                break;
            case 'custom-spacing':
                acc.spacing = [...acc.spacing, token];
                break;
            case 'custom-opacity':
                acc.opacity = [...acc.opacity, token];
                break;
            case 'custom-fontStyle':
                acc.font = [...acc.font, token];
                break;
            case 'custom-gradient':
                acc.gradient = [...acc.gradient, token];
                break;
            case 'custom-transition':
                acc.transition = [...acc.transition, token];
                break;
            case 'custom-shadow':
                acc.shadow = [...acc.shadow, token];
                break;
        }

        return acc;
    }, accumulator);
}
