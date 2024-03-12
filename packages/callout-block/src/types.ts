/* (c) Copyright Frontify Ltd., all rights reserved. */

import { RadiusExtendedSettings } from '@frontify/guideline-blocks-settings';

export enum Type {
    Warning = 'warning',
    Tip = 'tip',
    Note = 'note',
    Info = 'info',
}

export enum Width {
    FullWidth = 'fullWidth',
    HugContents = 'hugContents',
}

export enum Appearance {
    Light = 'light',
    Strong = 'strong',
}

export const outerWidthMap: Record<Width, string> = {
    [Width.FullWidth]: 'tw-w-full',
    [Width.HugContents]: 'tw-w-fit',
};

export enum Alignment {
    Left = 'left',
    Center = 'center',
    Right = 'right',
}

export const alignmentMap: Record<Alignment, string> = {
    [Alignment.Left]: 'tw-mr-auto',
    [Alignment.Center]: 'tw-mx-auto',
    [Alignment.Right]: 'tw-ml-auto',
};

export enum Padding {
    S = 's',
    M = 'm',
    L = 'l',
}

export const paddingMap: Record<Padding, string> = {
    [Padding.S]: 'tw-px-4 tw-py-3',
    [Padding.M]: 'tw-px-[25px] tw-py-5',
    [Padding.L]: 'tw-px-[30px] tw-py-[25px]',
};

export enum Icon {
    None = 'none',
    Info = 'info',
    Lightbulb = 'lightbulb',
    Megaphone = 'megaphone',
    Custom = 'custom',
}

export type BlockSettings = {
    type: Type;
    alignment: Alignment;
    iconSwitch: boolean;
    width: Width;
    textValue?: string;
    iconType: Icon;
    hasCustomPadding: boolean;
    paddingChoice: Padding;
    appearance: Appearance;
} & RadiusExtendedSettings &
    CustomPaddingStyles;

export type CustomPaddingStyles = {
    paddingTop: string;
    paddingRight: string;
    paddingBottom: string;
    paddingLeft: string;
};

export const topBottomPaddingMap: Record<Padding, string> = {
    [Padding.S]: '16px',
    [Padding.M]: '24px',
    [Padding.L]: '36px',
};

export const leftRightPaddingMap: Record<Padding, string> = {
    [Padding.S]: '32px',
    [Padding.M]: '32px',
    [Padding.L]: '36px',
};
