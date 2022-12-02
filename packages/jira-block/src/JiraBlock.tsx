/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { Color, RichTextEditor } from '@frontify/fondue';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { FC } from 'react';
import { DEFAULT_BACKGROUND_COLOR, FULL_WIDTH } from './settings';

type Settings = {
    width: string;
    backgroundColor: Color;
    textValue: string;
    showRichTextEditor: boolean;
};

const toRgbaString = (color: Color): string => {
    return `rgba(${color.red}, ${color.green}, ${color.blue}, ${color.alpha})`;
};

export const JiraBlock: FC<BlockProps> = ({ appBridge }) => {
    const isEditing = useEditorState(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);

    const {
        width = FULL_WIDTH,
        showRichTextEditor = true,
        backgroundColor = DEFAULT_BACKGROUND_COLOR,
        textValue,
    } = blockSettings;

    const onTextChange = (value: string): Promise<void> => setBlockSettings({ ...blockSettings, textValue: value });

    const customStyles = {
        width,
        backgroundColor: toRgbaString(backgroundColor),
    };

    console.log(appBridge.getGuidelineTitle());

    return (
        <div className={'style.container'} style={customStyles}>
            <RichTextEditor
                onTextChange={onTextChange}
                readonly={!isEditing || !showRichTextEditor}
                value={textValue}
                placeholder={`A custom block with background color: ${backgroundColor.name || backgroundColor}`}
            />
        </div>
    );
};
