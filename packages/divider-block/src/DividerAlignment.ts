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
