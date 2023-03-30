import { TransformedToken } from 'style-dictionary';

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

export interface RadiusCategory {
    type: 'radius-category';
    groupName: string;
    property: keyof RadiusTokenGroup;
}

export interface BorderCategory {
    type: 'border-category';
    groupName: string;
    property: keyof BorderTokenGroup;
}

export interface SpacingCategory {
    type: 'spacing-category';
    groupName: string;
    property: keyof SpacingTokenGroup;
}

export interface OtherCategory {
    type: 'other-category';
}
