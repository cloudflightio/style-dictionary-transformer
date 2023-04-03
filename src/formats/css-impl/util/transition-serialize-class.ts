import { CategorizedTokens } from '../models/token-category';
import { classesFrom, classFrom } from './classes';

export function transitionClassesFrom(category: CategorizedTokens['transition']): string {
    return classesFrom(category, (groupName, tokens) => {
        return classFrom(groupName, [
            tokens.duration?.name != null ? `transition-duration: var(--${tokens.duration.name});` : '',
            tokens.timingFunction?.name != null
                ? `transition-timing-function: var(--${tokens.timingFunction.name});`
                : '',
        ]);
    });
}
