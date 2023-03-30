import { BorderTokenGroup } from '../models/token-category';
import { classFrom } from './classes';

export function borderClassFrom(groupName: string, tokens: Partial<BorderTokenGroup>): string {
    return classFrom(groupName, [
        tokens.width?.name != null ? `border-width: var(--${tokens.width.name});` : '',
        tokens.color?.name != null ? `border-color: var(--${tokens.color.name});` : '',
    ]);
}
