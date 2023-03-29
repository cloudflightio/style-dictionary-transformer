import { TransformedToken } from 'style-dictionary';

export interface CategorizedTokens {
    radius: Map<string, Partial<RadiusTokenGroup>>;
}

export interface RadiusTokenGroup {
    topLeft: TransformedToken;
    topRight: TransformedToken;
    bottomLeft: TransformedToken;
    bottomRight: TransformedToken;
}

export type TokenCategory = RadiusCategory | OtherCategory;

export interface RadiusCategory {
    type: 'radius-category';
    groupName: string;
    property: keyof RadiusTokenGroup;
}

export interface OtherCategory {
    type: 'other-category';
}
