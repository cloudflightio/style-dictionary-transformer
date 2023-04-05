import { TransformedToken } from 'style-dictionary';
import {
    borderTokenEndings,
    fontTokenEndings,
    gradientTokenEndings,
    radiusTokenEndings,
    spacingTokenEndings,
    transitionTokenEndings,
} from '../../../models/token-endings';

type TokenGroupType<T extends keyof CategorizedTokens> = NonNullable<ReturnType<CategorizedTokens[T]['get']>>;

export interface CategorizedTokens {
    radius: Map<string, Partial<RadiusTokenGroup>>;
    border: Map<string, Partial<BorderTokenGroup>>;
    spacing: Map<string, Partial<SpacingTokenGroup>>;
    font: Map<string, Partial<FontTokenGroup>>;
    transition: Map<string, Partial<TransitionTokenGroup>>;
    gradient: Map<string, Partial<GradientTokenGroup>>;
}

export type RadiusTokenGroup = Record<keyof typeof radiusTokenEndings, TransformedToken>;
export type BorderTokenGroup = Record<keyof typeof borderTokenEndings, TransformedToken>;
export type SpacingTokenGroup = Record<keyof typeof spacingTokenEndings, TransformedToken>;
export type FontTokenGroup = Record<keyof typeof fontTokenEndings, TransformedToken>;
export type TransitionTokenGroup = Record<keyof typeof transitionTokenEndings, TransformedToken>;
export type GradientTokenGroup = Record<
    keyof Pick<typeof gradientTokenEndings, 'kind' | 'rotation'>,
    TransformedToken
> & {
    steps: Partial<Record<keyof Pick<typeof gradientTokenEndings, 'stepPosition' | 'stepColor'>, TransformedToken>>[];
};

export type TokenCategory =
    | RadiusCategory
    | BorderCategory
    | SpacingCategory
    | FontCategory
    | TransitionCategory
    | GradientCategory;

interface Category<T extends keyof CategorizedTokens> {
    type: T;
    groupName: string;
    applyFn(group: TokenGroupType<T>): TokenGroupType<T>;
}

export type RadiusCategory = Category<'radius'>;
export type BorderCategory = Category<'border'>;
export type SpacingCategory = Category<'spacing'>;
export type FontCategory = Category<'font'>;
export type TransitionCategory = Category<'transition'>;
export type GradientCategory = Category<'gradient'>;
