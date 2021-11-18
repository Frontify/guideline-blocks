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

export enum DoDontContent {
    Title = 'Title',
    Body = 'Body',
}

export const spacingClasses: Record<DoDontSpacing, string> = {
    [DoDontSpacing.Small]: 'tw-gap-4',
    [DoDontSpacing.Medium]: 'tw-gap-6',
    [DoDontSpacing.Large]: 'tw-gap-8',
};
