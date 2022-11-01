/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { AppBridgeBlock } from '@frontify/app-bridge';
import { RadiusExtendedSettings } from '@frontify/guideline-blocks-shared';

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

export const outerWidthMap: Record<Width, string> = {
    [Width.FullWidth]: 'tw-block',
    [Width.HugContents]: 'tw-flex',
};

export enum Alignment {
    Left = 'left',
    Center = 'center',
    Right = 'right',
}

export const alignmentMap: Record<Alignment, string> = {
    [Alignment.Left]: 'tw-justify-start',
    [Alignment.Center]: 'tw-justify-center',
    [Alignment.Right]: 'tw-justify-end',
};

export enum Padding {
    S = 's',
    M = 'm',
    L = 'l',
}

export const paddingMap: Record<Padding, string> = {
    [Padding.S]: 'tw-px-8 tw-py-4',
    [Padding.M]: 'tw-px-8 tw-py-6',
    [Padding.L]: 'tw-p-9',
};

export type BlockSettings = {
    type: Type;
    alignment: Alignment;
    iconSwitch: boolean;
    width: Width;
    textValue?: string;
    hasCustomPadding: boolean;
    paddingChoice: Padding;
} & RadiusExtendedSettings &
    CustomPaddingStyles;

export type CustomPaddingStyles = {
    paddingTop: string;
    paddingRight: string;
    paddingBottom: string;
    paddingLeft: string;
};

export type CalloutBlockProps = {
    appBridge: AppBridgeBlock;
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
