import { CategorizedTokens } from '../models/token-category';
import { classesFrom, classFrom } from './serialize-class-util';

export function borderClassesFrom(category: CategorizedTokens['border']): string {
    return classesFrom(category, (groupName, tokens) => {
        return classFrom(groupName, [
            tokens.width?.name != null ? `border-width: var(--${tokens.width.name});` : '',
            tokens.color?.name != null ? `border-color: var(--${tokens.color.name});` : '',
        ]);
    });
}

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

export function radiusClassesFrom(category: CategorizedTokens['radius']): string {
    return classesFrom(category, (groupName, tokens) => {
        return classFrom(groupName, [
            tokens.topLeft?.name != null ? `border-top-left-radius: var(--${tokens.topLeft.name});` : '',
            tokens.topRight?.name != null ? `border-top-right-radius: var(--${tokens.topRight.name});` : '',
            tokens.bottomLeft?.name != null ? `border-bottom-left-radius: var(--${tokens.bottomLeft.name});` : '',
            tokens.bottomRight?.name != null ? `border-bottom-right-radius: var(--${tokens.bottomRight.name});` : '',
        ]);
    });
}

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
