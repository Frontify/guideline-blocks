/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Color } from '@frontify/fondue';
import { BorderSettings, Padding, PaddingSettings, RadiusSettings } from '@frontify/guideline-blocks-shared';

export type Settings = {
    backgroundColor?: Color;
    dateEdited?: string;
    hasAvatarName?: boolean;
    hasBackground?: boolean;
    hasDateEdited?: boolean;
    note?: string;
    createdByUser?: number;
    username?: string;
    avatar?: string;
    visibility?: NoteVisibility;
} & BorderSettings &
    RadiusSettings &
    PaddingSettings;

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

export enum NoteVisibility {
    YouOnly = 'YouOnly',
    Editors = 'Editors',
    Everyone = 'Everyone',
}

export const paddingStyleMap: Record<Padding, string> = {
    [Padding.None]: '0px',
    [Padding.Small]: '24px',
    [Padding.Medium]: '36px',
    [Padding.Large]: '48px',
};
