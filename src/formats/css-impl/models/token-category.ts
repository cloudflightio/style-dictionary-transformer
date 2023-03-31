import { TransformedToken } from 'style-dictionary';
import {
    borderTokenEndings,
    fontTokenEndings,
    radiusTokenEndings,
    spacingTokenEndings,
} from '../../../models/token-endings';

type TokenGroupType<T extends keyof CategorizedTokens> = NonNullable<ReturnType<CategorizedTokens[T]['get']>>;
type NonPartial<T extends Partial<unknown>> = T extends Partial<infer U> ? U : never;

export interface CategorizedTokens {
    radius: Map<string, Partial<RadiusTokenGroup>>;
    border: Map<string, Partial<BorderTokenGroup>>;
    spacing: Map<string, Partial<SpacingTokenGroup>>;
    font: Map<string, Partial<FontTokenGroup>>;
}

export type RadiusTokenGroup = Record<keyof typeof radiusTokenEndings, TransformedToken>;
export type BorderTokenGroup = Record<keyof typeof borderTokenEndings, TransformedToken>;
export type SpacingTokenGroup = Record<keyof typeof spacingTokenEndings, TransformedToken>;
export type FontTokenGroup = Record<keyof typeof fontTokenEndings, TransformedToken>;

export type TokenCategory = RadiusCategory | BorderCategory | SpacingCategory | FontCategory | OtherCategory;

interface Category<T extends keyof CategorizedTokens> {
    type: T;
    property: keyof NonPartial<TokenGroupType<T>>;
    groupName: string;
}

export type RadiusCategory = Category<'radius'>;
export type BorderCategory = Category<'border'>;
export type SpacingCategory = Category<'spacing'>;
export type FontCategory = Category<'font'>;

export interface OtherCategory {
    type: 'other';
}
