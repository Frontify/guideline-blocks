/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import '@frontify/arcade/style';
import { FC } from 'react';
import { AppBridgeNative, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { NoteStyle, NoteBorderRadius, NoteBorderStyle, NotePadding, NoteVisibility } from './types';

type PersonalNoteBlockProps = {
    appBridge: AppBridgeNative;
};

type borderSelectionType = [NoteBorderStyle, string, string];

type Settings = {
    backgroundColor: string;
    borderRadiusChoice: NoteBorderRadius;
    borderSelection: borderSelectionType;
    hasAvatarName: boolean;
    hasBackground: boolean;
    hasCustomPadding: boolean;
    hasDateEdited: boolean;
    note: string;
    paddingChoice: NotePadding;
    visibility: NoteVisibility;
};

const PersonalNoteBlock: FC<PersonalNoteBlockProps> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState();

    console.log({ blockSettings });

    const {
        backgroundColor = '',
        borderRadiusChoice = NoteBorderRadius.Small,
        borderSelection = [NoteBorderStyle.Solid, '1px', '#EAEBEB'],
        hasAvatarName = true,
        hasBackground = false,
        hasCustomPadding = false,
        hasDateEdited = true,
        note = '',
        paddingChoice = NotePadding.Small,
        visibility = NoteVisibility.Everyone,
    } = blockSettings;

    const saveNote = (value: string) => {
        console.log('save my note, dude: ', value);

        setBlockSettings({
            ...blockSettings,
            note: value,
        });
    };

    return (
        <div>
            {isEditing ? (
                <textarea
                    className="tw-w-full tw-outline-none tw-resize-y"
                    onChange={(event) => saveNote(event.target.value)}
                    placeholder="Write personal note here..."
                >
                    {note}
                </textarea>
            ) : (
                <p>{note}</p>
            )}
        </div>
    );
};

export default PersonalNoteBlock;
