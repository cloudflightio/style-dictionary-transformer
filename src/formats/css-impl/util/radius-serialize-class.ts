import { RadiusTokenGroup } from '../models/token-category';
import { classFrom } from './classes';

export function radiusClassFrom(groupName: string, tokens: Partial<RadiusTokenGroup>): string {
    return classFrom(groupName, [
        tokens.topLeft?.name != null ? `border-top-left-radius: var(--${tokens.topLeft.name});` : '',
        tokens.topRight?.name != null ? `border-top-right-radius: var(--${tokens.topRight.name});` : '',
        tokens.bottomLeft?.name != null ? `border-bottom-left-radius: var(--${tokens.bottomLeft.name});` : '',
        tokens.bottomRight?.name != null ? `border-bottom-right-radius: var(--${tokens.bottomRight.name});` : '',
    ]);
}
