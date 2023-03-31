import { CategorizedTokens } from '../models/token-category';
import { classesFrom, classFrom } from './classes';

export function fontClassesFrom(category: CategorizedTokens['font']): string {
    return classesFrom(category, (groupName, tokens) => {
        return classFrom(groupName, [
            tokens.fontFamily?.name != null ? `font-family: var(--${tokens.fontFamily.name});` : '',
            tokens.fontSize?.name != null ? `font-size: var(--${tokens.fontSize.name});` : '',
            tokens.fontStretch?.name != null ? `font-stretch: var(--${tokens.fontStretch.name});` : '',
            tokens.fontStyle?.name != null ? `font-style: var(--${tokens.fontStyle.name});` : '',
            tokens.fontWeight?.name != null ? `font-weight: var(--${tokens.fontWeight.name});` : '',
            tokens.letterSpacing?.name != null ? `letter-spacing: var(--${tokens.letterSpacing.name});` : '',
            tokens.lineHeight?.name != null ? `line-height: var(--${tokens.lineHeight.name});` : '',
            tokens.paragraphIndent?.name != null ? `text-indent: var(--${tokens.paragraphIndent.name});` : '',
            tokens.textCase?.name != null ? `text-transform: var(--${tokens.textCase.name});` : '',
            tokens.textDecoration?.name != null ? `text-decoration: var(--${tokens.textDecoration.name});` : '',
        ]);
    });
}
