/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';

import { FC, ReactElement } from 'react';
import { debounce } from '@frontify/fondue';
import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { toRgbaString } from '@frontify/guideline-blocks-shared';

import { getValueInPx } from './helpers';
import { CodeMirrorEditor } from './components';
import { CodeMirrorEditorProps, CodeSnippetProps, Settings } from './types';
import { BORDER_COLOR_DEFAULT_VALUE, DEFAULT_THEME_VALUE } from './constants';

export const CodeSnippetBlock: FC<CodeSnippetProps> = ({ appBridge }): ReactElement => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState(appBridge);

    const {
        content,
        padding,
        language,
        lineStyle,
        lineWidth,
        borderColor = BORDER_COLOR_DEFAULT_VALUE,
        paddingTop = '0px',
        paddingLeft = '0px',
        paddingRight = '0px',
        paddingBottom = '0px',
        withBorder = false,
        withHeading = false,
        withRowNumbers = false,
        withCustomPadding = false,
        theme = DEFAULT_THEME_VALUE,
    } = blockSettings;

    const customPadding = `${getValueInPx(paddingTop)} ${getValueInPx(paddingRight)} ${getValueInPx(
        paddingBottom
    )} ${getValueInPx(paddingLeft)}`;

    const borderColorRgba = toRgbaString(borderColor);

    const handleChange = debounce((value: string) => setBlockSettings({ content: value }), 500);

    const codeMirrorEditorProps: CodeMirrorEditorProps = {
        theme,
        language,
        isEditing,
        withHeading,
        withRowNumbers,
        initValue: content,
        onChange: handleChange,
        padding: withCustomPadding ? customPadding : padding,
        border: withBorder ? `${lineStyle} ${lineWidth} ${borderColorRgba}` : 'none',
    };

    return <CodeMirrorEditor {...codeMirrorEditorProps} />;
};
