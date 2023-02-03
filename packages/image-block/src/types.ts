/* (c) Copyright Frontify Ltd., all rights reserved. */

export type Settings = {
    hasLink?: boolean;
};

export enum ImageSecurity {
    Global = 'Global',
    Custom = 'Custom',
}

export enum Alignment {
    Left = 'Left',
    Center = 'Center',
    Right = 'Right',
}

export enum CaptionPosition {
    Below = 'Below',
    Above = 'Above',
    Right = 'Right',
    Left = 'Left',
}

export enum Ratio {
    Ratio2To1 = '2:1',
    Ratio1To1 = '1:1',
    Ratio1To2 = '1:2',
}

export enum Padding {
    None = 'None',
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
}

export enum BorderStyle {
    Dotted = 'Dotted',
    Dashed = 'Dashed',
    Solid = 'Solid',
}
