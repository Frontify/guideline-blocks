/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import '@frontify/arcade/style';
import { FC } from 'react';
import { AppBridgeNative, useBlockSettings } from '@frontify/app-bridge';
import { RichTextEditor } from '@frontify/arcade';
import { NoteStyle, NoteBorderRadius, NoteBorderStyle, NotePadding, NoteVisibility } from './types';
import { BORDER_COLOR_DEFAULT_VALUE } from './settings';

type PersonalNoteBlockProps = {
    appBridge: AppBridgeNative;
};

type borderSelectionType = [NoteBorderStyle, string, string];

type Settings = {
    backgroundColor: string;
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

const getBorderStyles = (borderSelection: borderSelectionType, borderRadius: string) => ({
    borderStyle: borderStyles[borderSelection[0]],
    borderWidth: borderSelection[1],
    borderColor: `rgba(${Object.values(borderSelection[2].rgba).join(', ')})`,
    borderRadius,
});

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
        note = '',
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

    console.log({ dateEdited });

    return (
        <div
            className={`tw-space-y-4 ${paddingClasses[paddingChoice]} ${
                !hasCustomBorderRadius && borderRadiusClasses[borderRadiusChoice]
            }`}
            style={hasBorder ? getBorderStyles(borderSelection, hasCustomBorderRadius ? borderRadiusValue : '') : {}}
        >
            <div className="tw-flex tw-items-center tw-space-x-4">
                {/* TODO: Replace with acutal user data */}
                {hasAvatarName && (
                    <img src="https://picsum.photos/200" width="32" height="32" className="tw-rounded-full" />
                )}
                <div className="tw-flex tw-flex-col tw-text-s">
                    {hasAvatarName && <span className="tw-text-black-100">Leanne Simpson</span>}
                    {hasDateEdited && <span>Added on 8/24/2021, 14:18:30</span>}
                </div>
            </div>
            <RichTextEditor
                value={note}
                onTextChange={(value) => saveNote(value)}
                placeholder="Write personal note here ..."
            />
        </div>
    );
};

export default PersonalNoteBlock;
