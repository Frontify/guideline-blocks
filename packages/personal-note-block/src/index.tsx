/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import '@frontify/arcade/style';
import { FC } from 'react';
import { AppBridgeNative, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { RichTextEditor, Color } from '@frontify/arcade';
import { NoteHeader } from './components/NoteHeader';
import { NoteStyle, NoteBorderRadius, NoteBorderStyle, NotePadding, NoteVisibility } from './types';
import { BORDER_COLOR_DEFAULT_VALUE } from './settings';

type PersonalNoteBlockProps = {
    appBridge: AppBridgeNative;
};

type borderSelectionType = [NoteBorderStyle, string, Color];

type Settings = {
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
    visibility: NoteVisibility;
};

const shouldUseLightText = (r, g, b) => {
    // Convert rgb to YIQ (https://en.wikipedia.org/wiki/YIQ)
    // If value is in upper half of spectrum, return dark
    // If value is in lower half of spectrum, return light
    var yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq <= 128;
};

console.log(shouldUseLightText(255, 255, 255));
console.log(shouldUseLightText(45, 50, 50));

const getBorderStyles = (hasborder: boolean, borderSelection: borderSelectionType, borderRadius: string) =>
    hasborder
        ? {
              borderStyle: borderStyles[borderSelection[0]],
              borderWidth: borderSelection[1],
              borderColor: `rgba(${Object.values(borderSelection[2].rgba).join(', ')})`,
              borderRadius,
          }
        : {};

const getBackgroundStyles = (hasBackground: boolean, backgroundColor: Color) =>
    hasBackground ? { backgroundColor: `rgba(${Object.values(backgroundColor.rgba).join(', ')})` } : {};

const borderStyles: Record<NoteBorderStyle, string> = {
    [NoteBorderStyle.Solid]: 'solid',
    [NoteBorderStyle.Dotted]: 'dotted',
    [NoteBorderStyle.Dashed]: 'dashed',
};

const borderRadiusClasses: Record<NoteBorderRadius, string> = {
    [NoteBorderRadius.None]: 'tw-rounded-none',
    [NoteBorderRadius.Small]: 'tw-rounded',
    [NoteBorderRadius.Medium]: 'tw-rounded-md',
    [NoteBorderRadius.Large]: 'tw-rounded-lg',
};

const paddingClasses: Record<NotePadding, string> = {
    [NotePadding.None]: 'tw-p-0',
    [NotePadding.Small]: 'tw-p-6',
    [NotePadding.Medium]: 'tw-p-9',
    [NotePadding.Large]: 'tw-p-12',
};

const PersonalNoteBlock: FC<PersonalNoteBlockProps> = ({ appBridge }) => {
    const isEditing = useEditorState();
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);

    const {
        backgroundColor = '',
        borderRadiusChoice = NoteBorderRadius.Small,
        borderRadiusValue = '',
        borderSelection = [NoteBorderStyle.Solid, '1px', BORDER_COLOR_DEFAULT_VALUE],
        dateEdited = '',
        hasAvatarName = true,
        hasBackground = false,
        hasBorder = true,
        hasCustomBorderRadius = false,
        hasCustomPadding = false,
        hasDateEdited = true,
        note,
        paddingChoice = NotePadding.Small,
        visibility = NoteVisibility.Everyone,
    } = blockSettings;

    const saveNote = (value: string) => {
        setBlockSettings({
            ...blockSettings,
            note: value,
            dateEdited: new Date(),
        });
    };

    console.log({
        ...getBorderStyles(hasBorder, borderSelection, hasCustomBorderRadius ? borderRadiusValue : ''),
        ...getBackgroundStyles(hasBackground, backgroundColor),
    });

    return (
        <div
            className={`tw-space-y-4
              ${!hasCustomPadding && paddingClasses[paddingChoice]}
              ${!hasCustomBorderRadius && borderRadiusClasses[borderRadiusChoice]}`}
            style={{
                ...getBorderStyles(hasBorder, borderSelection, hasCustomBorderRadius ? borderRadiusValue : ''),
                ...getBackgroundStyles(hasBackground, backgroundColor),
            }}
        >
            <NoteHeader hasAvatarName={hasAvatarName} hasDateEdited={hasDateEdited} dateEdited={dateEdited} />
            <RichTextEditor
                value={note}
                onTextChange={(value) => saveNote(value)}
                placeholder="Write personal note here ..."
                readonly={!isEditing}
            />
        </div>
    );
};

export default PersonalNoteBlock;
