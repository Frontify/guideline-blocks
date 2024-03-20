/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { Color } from '@frontify/fondue';

import {
    BlockProps,
    BorderStyle,
    Padding,
    Radius,
    RichTextEditor,
    borderStyleMap,
    getDefaultPluginsWithLinkChooser,
    isDark,
    radiusStyleMap,
    toRgbaString,
} from '@frontify/guideline-blocks-settings';
import { CSSProperties, FC, useEffect } from 'react';
import '@frontify/guideline-blocks-settings/styles';
import '@frontify/fondue/style';
import 'tailwindcss/tailwind.css';
import { NoteHeader } from './components/NoteHeader';
import { BACKGROUND_COLOR_DEFAULT_VALUE, BORDER_COLOR_DEFAULT_VALUE } from './settings';
import { Settings, paddingStyleMap } from './types';

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
    } = blockSettings;

    const saveNote = (value: string) =>
        value !== blockSettings.note &&
        setBlockSettings({
            note: value,
            dateEdited: new Date().toString(),
        });

    useEffect(() => {
        async function getUserData() {
            await appBridge.getCurrentLoggedUser().then((data) => {
                if (data) {
                    const { id, name, image } = data;
                    if (!createdByUser) {
                        setBlockSettings({
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

    return (
        <div className="personal-note-block">
            <div
                data-test-id="personal-note-block"
                className={hasBackground && !!backgroundColor && isDark(backgroundColor) ? 'tw-text-white' : ''}
                style={{
                    ...(hasBorder && getBorderStyles(borderStyle, borderWidth, borderColor)),
                    ...(hasBackground && getBackgroundStyles(backgroundColor)),
                    borderRadius:
                        hasRadius && (hasBorder || hasBackground) ? radiusValue : radiusStyleMap[radiusChoice],
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
                    id={`${appBridge.getBlockId().toString()}-title`}
                    value={note}
                    onTextChange={saveNote}
                    placeholder="Write personal note here ..."
                    isEditing={isEditing}
                    plugins={getDefaultPluginsWithLinkChooser(appBridge)}
                />
            </div>
        </div>
    );
};
