/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeNative } from '@frontify/app-bridge';
import { Color } from '@frontify/arcade';
import { ItemProps } from './DoDontItem';

export type DosDontsBlockProps = {
    appBridge: AppBridgeNative;
};

export type Settings = {
    columns: number;
    isCustomSpacing: boolean;
    spacingValue: string;
    doColor: Color;
    dontColor: Color;
    layout: DoDontLayout;
    style: DoDontStyle;
    spacingChoice: DoDontSpacing;
    items: Pick<ItemProps, 'id' | 'title' | 'body'>[];
};

export enum DoDontType {
    Do = 'Do',
    Dont = 'Dont',
}

export enum DoDontStyle {
    Icons = 'Icons',
    Underline = 'Underline',
    Text = 'Text',
}

export enum DoDontLayout {
    SideBySide = 'SideBySide',
    Stacked = 'Stacked',
}

export enum DoDontSpacing {
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
}

export const spacingValues: Record<DoDontSpacing, string> = {
    [DoDontSpacing.Small]: '16px',
    [DoDontSpacing.Medium]: '24px',
    [DoDontSpacing.Large]: '32px',
};
