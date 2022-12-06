/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Color } from '@frontify/fondue';

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
    editing: boolean;
};

export type Item = {
    id: number;
    title: string;
    body: string;
};

export type EditorElement = {
    children: EditorChild[];
};

export type EditorChild = {
    text: string;
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

export const columnsClasses: Record<number, string> = {
    1: 'tw-grid-cols-1',
    2: 'tw-grid-cols-2',
    3: 'tw-grid-cols-3',
    4: 'tw-grid-cols-4',
};
