/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import '@frontify/arcade/style';
import { FC } from 'react';
import { AppBridgeNative, useBlockSettings } from '@frontify/app-bridge';
import { RichTextEditor } from '@frontify/arcade';
import { NoteStyle, NoteBorderRadius, NoteBorderStyle, NotePadding, NoteVisibility } from './types';

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

const paddingClasses: Record<NotePadding, string> = {
    [NotePadding.None]: 'tw-p-0',
    [NotePadding.Small]: 'tw-p-6',
    [NotePadding.Medium]: 'tw-p-9',
    [NotePadding.Large]: 'tw-p-12',
};

const PersonalNoteBlock: FC<PersonalNoteBlockProps> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);

    console.log({ blockSettings });

    const {
        backgroundColor = '',
        borderRadiusChoice = NoteBorderRadius.Small,
        borderSelection = [NoteBorderStyle.Solid, '1px', ''],
        dateEdited = '',
        hasAvatarName = true,
        hasBackground = false,
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

    return (
        <div className={`tw-grid ${paddingClasses[paddingChoice]}`}>
            <RichTextEditor
                value={note}
                onTextChange={(value) => saveNote(value)}
                placeholder="Write personal note here ..."
            />
        </div>
    );
};

export default PersonalNoteBlock;
