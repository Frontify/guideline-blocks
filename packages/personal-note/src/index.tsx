/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import '@frontify/arcade/style';
import { FC } from 'react';
import { AppBridgeNative, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { NoteStyle, NoteBorderRadius, NoteBorderStyle, NotePadding, NoteVisibility } from './types';

type PersonalNoteBlockProps = {
    appBridge: AppBridgeNative;
};

type Settings = {
    note: string;
};

const PersonalNoteBlock: FC<PersonalNoteBlockProps> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState();

    const { note = '' } = blockSettings;

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
