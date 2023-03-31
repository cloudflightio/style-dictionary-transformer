import { TransformedToken } from 'style-dictionary';

type TokenGroupType<T extends keyof CategorizedTokens> = NonNullable<ReturnType<CategorizedTokens[T]['get']>>;
type NonPartial<T extends Partial<unknown>> = T extends Partial<infer U> ? U : never;

export interface CategorizedTokens {
    radius: Map<string, Partial<RadiusTokenGroup>>;
    border: Map<string, Partial<BorderTokenGroup>>;
    spacing: Map<string, Partial<SpacingTokenGroup>>;
}

export interface RadiusTokenGroup {
    topLeft: TransformedToken;
    topRight: TransformedToken;
    bottomLeft: TransformedToken;
    bottomRight: TransformedToken;
}

export interface BorderTokenGroup {
    width: TransformedToken;
    color: TransformedToken;
}

export interface SpacingTokenGroup {
    top: TransformedToken;
    right: TransformedToken;
    left: TransformedToken;
    bottom: TransformedToken;
}

export type TokenCategory = RadiusCategory | BorderCategory | SpacingCategory | OtherCategory;

interface Category<T extends keyof CategorizedTokens> {
    type: T;
    property: keyof NonPartial<TokenGroupType<T>>;
    groupName: string;
}

export type RadiusCategory = Category<'radius'>;

export type BorderCategory = Category<'border'>;

export type SpacingCategory = Category<'spacing'>;

export interface OtherCategory {
    type: 'other';
}
