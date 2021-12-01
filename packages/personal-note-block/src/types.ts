/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeNative } from '@frontify/app-bridge';
import { Color } from '@frontify/arcade';

export type BlockProps = {
    appBridge: AppBridgeNative;
};

export type BorderSelectionType = [NoteBorderStyle, string, Color];

export type Settings = {
    backgroundColor?: Color;
    borderRadiusChoice?: NoteBorderRadius;
    borderRadiusValue?: string;
    borderSelection?: BorderSelectionType;
    dateEdited?: string;
    hasAvatarName?: boolean;
    hasBackground?: boolean;
    hasBorder?: boolean;
    hasCustomBorderRadius?: boolean;
    hasCustomPadding?: boolean;
    hasDateEdited?: boolean;
    note?: string;
    paddingChoice?: NotePadding;
    paddingValue?: string;
    createdByUser?: number;
    username?: string;
    avatar?: string;
    visibility?: NoteVisibility;
};

export type NoteHeaderProps = {
    name?: string;
    avatar?: string;
    hasAvatarName: boolean;
    hasDateEdited: boolean;
    dateEdited?: string;
    useLightText: boolean;
};

export enum NoteStyle {
    Card = 'Card',
}

export enum NotePadding {
    None = 'None',
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
}

export enum NoteBorderRadius {
    None = 'None',
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
}

export enum NoteBorderStyle {
    Solid = 'Solid',
    Dotted = 'Dotted',
    Dashed = 'Dashed',
}

export enum NoteVisibility {
    YouOnly = 'YouOnly',
    Editors = 'Editors',
    Everyone = 'Everyone',
}

export const borderStyles: Record<NoteBorderStyle, string> = {
    [NoteBorderStyle.Solid]: 'solid',
    [NoteBorderStyle.Dotted]: 'dotted',
    [NoteBorderStyle.Dashed]: 'dashed',
};

export const borderRadiusClasses: Record<NoteBorderRadius, string> = {
    [NoteBorderRadius.None]: 'tw-rounded-none',
    [NoteBorderRadius.Small]: 'tw-rounded',
    [NoteBorderRadius.Medium]: 'tw-rounded-md',
    [NoteBorderRadius.Large]: 'tw-rounded-lg',
};

export const paddingClasses: Record<NotePadding, string> = {
    [NotePadding.None]: 'tw-p-0',
    [NotePadding.Small]: 'tw-p-6',
    [NotePadding.Medium]: 'tw-p-9',
    [NotePadding.Large]: 'tw-p-12',
};
