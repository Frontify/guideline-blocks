/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';

import { FC, ReactElement } from 'react';
import { debounce } from '@frontify/fondue';
import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { toRgbaString } from '@frontify/guideline-blocks-shared';

import { getValueInPx } from './helpers';
import { CodeMirrorEditor } from './components';
import { BorderRadiusCorners, CodeMirrorEditorProps, CodeSnippetProps, Settings } from './types';
import { BORDER_COLOR_DEFAULT_VALUE, DEFAULT_THEME_VALUE } from './constants';

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

    const customMargin = `${getValueInPx(marginTop)} ${getValueInPx(marginRight)} ${getValueInPx(
        marginBottom
    )} ${getValueInPx(marginLeft)}`;

    const borderColorRgba = toRgbaString(borderColor);

    const handleChange = debounce((value: string) => setBlockSettings({ content: value }), 500);

    const borderRadiusValues: Record<BorderRadiusCorners, string> = {
        topLeft: withCustomBorderRadius ? borderRadiusTopLeft : borderRadius,
        topRight: withCustomBorderRadius ? borderRadiusTopRight : borderRadius,
        bottomLeft: withCustomBorderRadius ? borderRadiusBottomLeft : borderRadius,
        bottomRight: withCustomBorderRadius ? borderRadiusBottomRight : borderRadius,
    };

    const codeMirrorEditorProps: CodeMirrorEditorProps = {
        theme,
        language,
        isEditing,
        withHeading,
        withRowNumbers,
        initValue: content,
        onChange: handleChange,
        borderRadius: borderRadiusValues,
        margin: withCustomMargin ? customMargin : margin,
        border: withBorder ? `${lineStyle} ${lineWidth} ${borderColorRgba}` : 'none',
    };

    return <CodeMirrorEditor {...codeMirrorEditorProps} />;
};
