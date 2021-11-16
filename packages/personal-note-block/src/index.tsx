/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import '@frontify/arcade/style';
import { FC, useEffect, useState } from 'react';
import { AppBridgeNative, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { RichTextEditor, Color } from '@frontify/arcade';
import { mapRgbaToString, isDark, joinClassNames } from '@frontify/guideline-blocks-shared';
import { NoteHeader } from './components/NoteHeader';
import { NoteStyle, NoteBorderRadius, NoteBorderStyle, NotePadding, NoteVisibility } from './types';
import { BACKGROUND_COLOR_DEFAULT_VALUE, BORDER_COLOR_DEFAULT_VALUE } from './settings';

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
    paddingValue: string;
    userId: string;
    visibility: NoteVisibility;
};

const getBorderStyles = (borderSelection: borderSelectionType, borderRadius: string) => ({
    borderStyle: borderStyles[borderSelection[0]],
    borderWidth: borderSelection[1],
    borderColor: mapRgbaToString(borderSelection[2].rgba),
    borderRadius,
});

const getBackgroundStyles = (backgroundColor: Color) => ({
    backgroundColor: mapRgbaToString(backgroundColor.rgba),
});

const getPaddingStyles = (padding: string) => ({
    padding,
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
    const isEditing = useEditorState();
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const [user, setUser] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [avatar, setAvatar] = useState<string>('');

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
        visibility = NoteVisibility.Everyone,
    } = blockSettings;

    const saveNote = (value: string) => {
        setBlockSettings({
            ...blockSettings,
            note: value,
            dateEdited: new Date(),
        });
    };

    const saveUser = (userId: string) => {
        setUser(userId);
        if (!createdByUser) {
            setBlockSettings({
                ...blockSettings,
                createdByUser: userId,
            });
        }
    };

    useEffect(() => {
        async function getUserData() {
            await appBridge.getCurrentLoggedUser().then((data) => {
                saveUser(data?.id);
                setName(data?.name);
                setAvatar(data?.image?.image);
            });
        }
        getUserData();
    }, []);

    if (visibility === NoteVisibility.Editors && !isEditing) {
        // If visibility "editors" is selected, hide block when not in editing mode
        return <></>;
    }

    if (visibility === NoteVisibility.YouOnly && createdByUser !== user) {
        // If visibility "you only" is selected, hide block when current user is not matching user who created the block
        return <></>;
    }

    return (
        <div
            className={joinClassNames([
                'tw-space-y-4',
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
                name={name}
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
