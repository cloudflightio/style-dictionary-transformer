import { CategorizedTokens } from '../models/token-category';
import { classesFrom, classFrom } from './classes';

export function borderClassesFrom(category: CategorizedTokens['border']): string {
    return classesFrom(category, (groupName, tokens) => {
        return classFrom(groupName, [
            tokens.width?.name != null ? `border-width: var(--${tokens.width.name});` : '',
            tokens.color?.name != null ? `border-color: var(--${tokens.color.name});` : '',
        ]);
    });
}
