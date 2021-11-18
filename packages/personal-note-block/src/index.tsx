/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import '@frontify/arcade/style';
import { CSSProperties, FC, useEffect, useState } from 'react';
import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { RichTextEditor, Color } from '@frontify/arcade';
import { mapRgbaToString, isDark, joinClassNames } from '@frontify/guideline-blocks-shared';
import { NoteHeader } from './components/NoteHeader';
import {
    BlockProps,
    borderRadiusClasses,
    BorderSelectionType,
    borderStyles,
    NoteBorderRadius,
    NoteBorderStyle,
    NotePadding,
    NoteVisibility,
    paddingClasses,
    Settings,
} from './types';
import { BACKGROUND_COLOR_DEFAULT_VALUE, BORDER_COLOR_DEFAULT_VALUE } from './settings';

const getBorderStyles = (borderSelection: BorderSelectionType, borderRadius: string): CSSProperties => ({
    borderStyle: borderStyles[borderSelection[0]],
    borderWidth: borderSelection[1],
    borderColor: mapRgbaToString(borderSelection[2].rgba),
    borderRadius,
});

const getBackgroundStyles = (backgroundColor: Color): CSSProperties => ({
    backgroundColor: mapRgbaToString(backgroundColor.rgba),
});

const getPaddingStyles = (padding: string): CSSProperties => ({
    padding,
});

const PersonalNoteBlock: FC<BlockProps> = ({ appBridge }) => {
    const isEditing = useEditorState();
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const [userId, setUserId] = useState<number | null>(null);

    const {
        backgroundColor = BACKGROUND_COLOR_DEFAULT_VALUE,
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
        paddingValue = '',
        createdByUser,
        username,
        avatar,
        visibility = NoteVisibility.Everyone,
    } = blockSettings;

    const saveNote = (value: string) => {
        setBlockSettings({
            ...blockSettings,
            note: value,
            dateEdited: new Date(),
        });
    };

    const saveUserData = (userId: number, username: string, avatar: string) => {
        setUserId(userId);
        if (!createdByUser) {
            setBlockSettings({
                ...blockSettings,
                createdByUser: userId,
                username,
                avatar,
            });
        }
    };

    useEffect(() => {
        async function getUserData() {
            await appBridge.getCurrentLoggedUser().then((data) => {
                if (data) {
                    const { id, name, image } = data;
                    saveUserData(id, name, image?.image);
                }
            });
        }
        getUserData();
    }, []);

    if (
        (visibility === NoteVisibility.Editors && !isEditing) || // If visibility "editors" is selected, hide block when not in editing mode
        (visibility === NoteVisibility.YouOnly && createdByUser !== userId) // If visibility "you only" is selected, hide block when current user is not matching user who created the block
    ) {
        return <></>;
    }

    return (
        <div
            className={joinClassNames([
                !hasCustomPadding && paddingClasses[paddingChoice],
                !hasCustomBorderRadius && borderRadiusClasses[borderRadiusChoice],
                hasBackground && isDark(backgroundColor.rgba) && 'tw-text-white',
            ])}
            style={{
                ...(hasBorder && getBorderStyles(borderSelection, hasCustomBorderRadius ? borderRadiusValue : '')),
                ...(hasBackground && getBackgroundStyles(backgroundColor)),
                ...(hasCustomPadding && getPaddingStyles(paddingValue)),
            }}
        >
            <NoteHeader
                hasAvatarName={hasAvatarName}
                name={username}
                avatar={avatar}
                hasDateEdited={hasDateEdited}
                dateEdited={dateEdited}
                useLightText={hasBackground && isDark(backgroundColor.rgba)}
            />
            <RichTextEditor
                value={note}
                onTextChange={saveNote}
                placeholder="Write personal note here ..."
                readonly={!isEditing}
            />
        </div>
    );
};

export default PersonalNoteBlock;
