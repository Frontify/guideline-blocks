/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { Color, RichTextEditor } from '@frontify/arcade';
import {
    BorderStyle,
    Padding,
    Radius,
    borderStyleMap,
    isDark,
    radiusStyleMap,
    toRgbaString,
} from '@frontify/guideline-blocks-shared';
import { CSSProperties, FC, useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { NoteHeader } from './components/NoteHeader';
import { BACKGROUND_COLOR_DEFAULT_VALUE, BORDER_COLOR_DEFAULT_VALUE } from './settings';
import { BlockProps, NoteVisibility, Settings, paddingStyleMap } from './types';

const getBorderStyles = (
    style = BorderStyle.Solid,
    width = '1px',
    color = BORDER_COLOR_DEFAULT_VALUE
): CSSProperties => ({
    borderStyle: borderStyleMap[style],
    borderWidth: width,
    borderColor: toRgbaString(color),
});

const getBackgroundStyles = (backgroundColor: Color): CSSProperties =>
    backgroundColor ? { backgroundColor: toRgbaString(backgroundColor) } : {};

export const PersonalNoteBlock: FC<BlockProps> = ({ appBridge }) => {
    const isEditing = useEditorState(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const [userId, setUserId] = useState<number | null>(null);

    const {
        backgroundColor = BACKGROUND_COLOR_DEFAULT_VALUE,
        radiusChoice = Radius.None,
        radiusValue = '',
        borderStyle = BorderStyle.Solid,
        borderWidth = '1px',
        borderColor = BORDER_COLOR_DEFAULT_VALUE,
        dateEdited = '',
        hasAvatarName = true,
        hasBackground = false,
        hasBorder = true,
        hasRadius = false,
        hasCustomPaddingValue = false,
        hasDateEdited = true,
        note,
        paddingChoice = Padding.Small,
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            className={hasBackground && !!backgroundColor && isDark(backgroundColor) ? 'tw-text-white' : ''}
            style={{
                ...(hasBorder && getBorderStyles(borderStyle, borderWidth, borderColor)),
                ...(hasBackground && getBackgroundStyles(backgroundColor)),
                borderRadius: hasRadius && (hasBorder || hasBackground) ? radiusValue : radiusStyleMap[radiusChoice],
                padding: hasCustomPaddingValue ? paddingValue : paddingStyleMap[paddingChoice],
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
