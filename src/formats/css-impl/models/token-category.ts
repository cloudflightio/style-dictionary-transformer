import { TransformedToken } from 'style-dictionary';

export interface CategorizedTokens {
    radius: Map<string, Partial<RadiusTokenGroup>>;
    border: Map<string, Partial<BorderTokenGroup>>;
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

export type TokenCategory = RadiusCategory | BorderCategory | OtherCategory;

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

export interface OtherCategory {
    type: 'other-category';
}
