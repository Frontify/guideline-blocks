/* (c) Copyright Frontify Ltd., all rights reserved. */

export type DividerColor = {
    rgba: string;
};

export enum DividerStyle {
    NoLine = 'noline',
    Dashed = 'dashed',
    Solid = 'solid',
    Dotted = 'dotted',
}

export enum DividerHeight {
    Small = '36px',
    Medium = '60px',
    Large = '96px',
}

export const dividerStyle = {
    [DividerStyle.NoLine]: 'tw-border-none',
    [DividerStyle.Dashed]: 'tw-border-dashed',
    [DividerStyle.Solid]: 'tw-border-solid',
    [DividerStyle.Dotted]: 'tw-border-dotted',
};

export enum DividerWidth {
    '10%' = '10%',
    '25%' = '25%',
    '50%' = '50%',
    '100%' = '100%',
}

export enum DividerAlignment {
    Center = 'center',
    Right = 'right',
    Left = 'left',
}

export const dividerAlignment = {
    [DividerAlignment.Center]: 'tw-justify-center',
    [DividerAlignment.Right]: 'tw-justify-end',
    [DividerAlignment.Left]: 'tw-justify-start',
};

export enum DividerThickness {
    Small = '1px',
    Medium = '2px',
    Large = '4px',
}
