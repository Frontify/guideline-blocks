/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';

import { FC, ReactElement } from 'react';
import { debounce } from '@frontify/fondue';
import { toRgbaString } from '@frontify/guideline-blocks-shared';
import { useBlockSettings, useEditorState } from '@frontify/app-bridge';

import { CodeMirrorEditor } from './components';
import { BORDER_COLOR_DEFAULT_VALUE, DEFAULT_THEME_VALUE } from './constants';
import { CodeMirrorEditorProps, CodeSnippetProps, Settings } from './types';

export const CodeSnippetBlock: FC<CodeSnippetProps> = ({ appBridge }): ReactElement => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState(appBridge);

    const {
        content,
        margin,
        language,
        lineStyle,
        lineWidth,
        borderColor = BORDER_COLOR_DEFAULT_VALUE,
        borderRadius = '0px',
        marginTop = '0px',
        marginLeft = '0px',
        marginRight = '0px',
        marginBottom = '0px',
        borderRadiusTopLeft = '0px',
        borderRadiusTopRight = '0px',
        borderRadiusBottomLeft = '0px',
        borderRadiusBottomRight = '0px',
        withBorder = false,
        withHeading = false,
        withRowNumbers = false,
        withCustomMargin = false,
        withCustomBorderRadius = false,
        theme = DEFAULT_THEME_VALUE,
    } = blockSettings;

    const customMargin = `${marginTop} ${marginRight} ${marginBottom} ${marginLeft}`;
    const customBorderRadius = `${borderRadiusTopLeft} ${borderRadiusTopRight} ${borderRadiusBottomRight} ${borderRadiusBottomLeft}`;

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
        borderRadius: withCustomBorderRadius ? customBorderRadius : borderRadius,
        margin: withCustomMargin ? customMargin : margin,
        border: withBorder ? `${lineStyle} ${lineWidth} ${borderColorRgba}` : 'none',
    };

    return <CodeMirrorEditor {...codeMirrorEditorProps} />;
};
