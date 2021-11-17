/* (c) Copyright Frontify Ltd., all rights reserved. */

export type BlockProps = {
    appBridge: AppBridgeNative;
};

export type borderSelectionType = [NoteBorderStyle, string, Color];

export type Settings = {
    backgroundColor: Color;
    borderRadiusChoice: NoteBorderRadius;
    borderSelection: borderSelectionType;
    dateEdited: Date;
    hasAvatarName: boolean;
    hasBackground: boolean;
    hasCustomPadding: boolean;
    hasDateEdited: boolean;
    note: string;
    paddingChoice: NotePadding;
    paddingValue: string;
    userId: string;
    visibility: NoteVisibility;
};

export enum NoteStyle {
    Card = 'Card',
}

export enum NotePadding {
    None = 'none',
    Small = 'small',
    Medium = 'medium',
    Large = 'large',
}

export enum NoteBorderRadius {
    None = 'none',
    Small = 'small',
    Medium = 'medium',
    Large = 'large',
}

export enum NoteBorderStyle {
    Solid = 'solid',
    Dotted = 'dotted',
    Dashed = 'dashed',
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
