export enum BorderStyle {
    Solid = 'Solid',
    Dashed = 'Dashed',
    Dotted = 'Dotted',
}

export enum Radius {
    None = 'None',
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
}

export enum PaddingBasic {
    None = 'None',
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
}

export const paddingBasicStyleMap: Record<PaddingBasic, string> = {
    [PaddingBasic.None]: '0px',
    [PaddingBasic.Small]: '24px',
    [PaddingBasic.Medium]: '36px',
    [PaddingBasic.Large]: '60px',
};

export type PaddingSettings = {
    paddingBasic: PaddingBasic;
    hasCustomPadding: boolean;
    paddingValues: string[];
};
