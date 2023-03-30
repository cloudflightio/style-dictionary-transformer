import { CategorizedTokens } from '../models/token-category';
import { classesFrom, classFrom } from './classes';

export function spacingClassesFrom(category: CategorizedTokens['spacing']): string {
    return classesFrom(category, (groupName, tokens) => {
        return classFrom(groupName, [
            tokens.top?.name != null ? `padding-top: var(--${tokens.top.name});` : '',
            tokens.right?.name != null ? `padding-right: var(--${tokens.right.name});` : '',
            tokens.left?.name != null ? `padding-left: var(--${tokens.left.name});` : '',
            tokens.bottom?.name != null ? `padding-bottom: var(--${tokens.bottom.name});` : '',
        ]);
    });
}
