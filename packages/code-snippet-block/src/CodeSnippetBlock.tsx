/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';

import { ReactElement } from 'react';
import { debounce } from '@frontify/fondue';
import { useBlockSettings } from '@frontify/app-bridge';
import { toRgbaString } from '@frontify/guideline-blocks-shared';

import { getValueInPx } from './helpers';
import { CodeMirrorEditor } from './components';
import { CodeMirrorEditorProps, CodeSnippetProps, Settings } from './types';
import { BORDER_COLOR_DEFAULT_VALUE, DEFAULT_THEME_VALUE } from './constants';

export const CodeSnippetBlock = ({ appBridge, id }: CodeSnippetProps): ReactElement => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);

    const {
        content,
        padding,
        language,
        lineStyle,
        lineWidth,
        borderColor,
        borderRadius,
        borderRadiusTop = '',
        borderRadiusLeft = '',
        borderRadiusRight = '',
        borderRadiusBottom = '',
        paddingTop = '',
        paddingLeft = '',
        paddingRight = '',
        paddingBottom = '',
        withBorder = false,
        withHeading = false,
        withRowNumbers = false,
        withCustomPadding = false,
        theme = DEFAULT_THEME_VALUE,
        withCustomBorderRadius = false,
    } = blockSettings;

    const customPadding = `${getValueInPx(paddingTop)} ${getValueInPx(paddingRight)} ${getValueInPx(
        paddingBottom
    )} ${getValueInPx(paddingLeft)}`;

    const borderColorRgba = toRgbaString(borderColor ?? BORDER_COLOR_DEFAULT_VALUE);
    const customBorderRadius = `${borderRadiusTop} ${borderRadiusRight} ${borderRadiusBottom} ${borderRadiusLeft}`;

    const handleChange = debounce((value: string) => setBlockSettings({ content: value }), 500);

    const codeMirrorEditorProps: CodeMirrorEditorProps = {
        id,
        theme,
        language,
        withHeading,
        withRowNumbers,
        initValue: content,
        onChange: handleChange,
        padding: withCustomPadding ? customPadding : padding,
        borderRadius: withCustomBorderRadius ? customBorderRadius : borderRadius,
        border: withBorder ? `${lineStyle} ${lineWidth} ${borderColorRgba}` : 'none',
    };

    return <CodeMirrorEditor {...codeMirrorEditorProps} />;
};
