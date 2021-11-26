/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeNative } from '@frontify/app-bridge';
import { Color } from '@frontify/arcade';

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
    items: Item[];
};

export type DoDontItemProps = {
    id: number;
    type: DoDontType;
    style: DoDontStyle;
    doColor: Color;
    dontColor: Color;
    saveItem: (id: number, value: string, type: 'title' | 'body') => void;
    title?: string;
    body?: string;
};

export type Item = {
    id: number;
    title: string;
    body: string;
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
