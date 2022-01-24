/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { Color, RichTextEditor } from '@frontify/arcade';
import { isDark, joinClassNames, mapRgbaToString } from '@frontify/guideline-blocks-shared';
import { CSSProperties, FC, useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { NoteHeader } from './components/NoteHeader';
import { BACKGROUND_COLOR_DEFAULT_VALUE, BORDER_COLOR_DEFAULT_VALUE } from './settings';
import {
    BlockProps,
    borderRadiusClasses,
    BorderSelectionType,
    borderStyles,
    NoteBorderRadius,
    NoteBorderStyle,
    NotePadding,
    NoteVisibility,
    paddingValues,
    Settings,
} from './types';

const getBorderStyles = (borderSelection: BorderSelectionType): CSSProperties => {
    // TODO: This check could be removed if defaultValue are returned from blockSettings
    const style = borderSelection[0] ? borderSelection[0] : NoteBorderStyle.Solid;
    const width = borderSelection[1] ? borderSelection[1] : '1px';
    const rgba = borderSelection[2] ? borderSelection[2] : BORDER_COLOR_DEFAULT_VALUE;
    return {
        borderStyle: borderStyles[style],
        borderWidth: width,
        borderColor: mapRgbaToString(rgba),
    };
};

const getRadiusStyles = (borderRadius: string): CSSProperties => ({
    borderRadius,
});

const getBackgroundStyles = (backgroundColor: Color): CSSProperties =>
    backgroundColor ? { backgroundColor: mapRgbaToString(backgroundColor) } : {};

const getPaddingStyles = (padding: string): CSSProperties => ({
    padding,
});

export const PersonalNoteBlock: FC<BlockProps> = ({ appBridge }) => {
    const isEditing = useEditorState(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const [userId, setUserId] = useState<number | null>(null);

    const {
        backgroundColor = BACKGROUND_COLOR_DEFAULT_VALUE,
        borderRadiusChoice = NoteBorderRadius.None,
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
            dateEdited: new Date().toString(),
        });
    };

    useEffect(() => {
        async function getUserData() {
            await appBridge.getCurrentLoggedUser().then((data) => {
                if (data) {
                    const { id, name, image } = data;
                    setUserId(id);
                    if (!createdByUser) {
                        setBlockSettings({
                            ...blockSettings,
                            createdByUser: id,
                            username: name,
                            avatar: image?.image || '',
                        });
                    }
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
            data-test-id="personal-note-block"
            className={joinClassNames([
                !hasCustomBorderRadius && borderRadiusClasses[borderRadiusChoice],
                hasBackground && !!backgroundColor && isDark(backgroundColor) && 'tw-text-white',
            ])}
            style={{
                ...(hasBorder && getBorderStyles(borderSelection)),
                ...(hasBackground && getBackgroundStyles(backgroundColor)),
                ...((hasBorder || hasBackground) && getRadiusStyles(hasCustomBorderRadius ? borderRadiusValue : '')),
                ...getPaddingStyles(hasCustomPadding ? paddingValue : paddingValues[paddingChoice]),
            }}
        >
            {(hasAvatarName || hasDateEdited) && (
                <NoteHeader
                    hasAvatarName={hasAvatarName}
                    name={username}
                    avatar={avatar}
                    hasDateEdited={hasDateEdited}
                    dateEdited={dateEdited}
                    useLightText={hasBackground && !!backgroundColor && isDark(backgroundColor)}
                />
            )}

            <RichTextEditor
                value={note}
                onTextChange={saveNote}
                placeholder="Write personal note here ..."
                readonly={!isEditing}
            />
        </div>
    );
};
