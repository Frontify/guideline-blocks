/* (c) Copyright Frontify Ltd., all rights reserved. */

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
