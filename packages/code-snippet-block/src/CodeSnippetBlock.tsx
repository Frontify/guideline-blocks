/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';

import { ReactElement } from 'react';
import { debounce } from '@frontify/fondue';
import { useBlockSettings } from '@frontify/app-bridge';
import { toRgbaString } from '@frontify/guideline-blocks-shared';

import { CodeMirrorEditor } from './components';
import { CodeMirrorEditorProps, CodeSnippetProps, Settings } from './types';
import { getBorderWidthInPx, getCustomBorderRadius, getCustomPadding } from './helpers';
import { BORDER_COLOR_DEFAULT_VALUE, DEFAULT_THEME_VALUE, DEFAULT_TUPLE_VALUE } from './constants';

export const CodeSnippetBlock = ({ appBridge, id }: CodeSnippetProps): ReactElement => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);

    const {
        padding,
        language,
        border = [],
        borderRadius,
        withBorder = false,
        withHeading = false,
        withRowNumbers = false,
        withCustomPadding = false,
        theme = DEFAULT_THEME_VALUE,
        withCustomBorderRadius = false,
        customPadding: paddingTuple = DEFAULT_TUPLE_VALUE,
        customBorderRadius: borderRadiusTuple = DEFAULT_TUPLE_VALUE,
    } = blockSettings;

    const [lineStyle, lineWidth, borderColor] = border;

    const borderWidth = getBorderWidthInPx(lineWidth);
    const customPadding = getCustomPadding(paddingTuple);
    const customBorderRadius = getCustomBorderRadius(borderRadiusTuple);
    const borderColorRgba = toRgbaString(borderColor ?? BORDER_COLOR_DEFAULT_VALUE);

    const handleChange = debounce((value: string) => setBlockSettings({ content: value }), 500);

    const codeMirrorEditorProps: CodeMirrorEditorProps = {
        id,
        theme,
        language,
        withHeading,
        withRowNumbers,
        onChange: handleChange,
        initValue: blockSettings.content,
        padding: withCustomPadding ? customPadding : padding,
        borderRadius: withCustomBorderRadius ? customBorderRadius : borderRadius,
        border: withBorder ? `${lineStyle} ${borderWidth} ${borderColorRgba}` : 'none',
    };

    return <CodeMirrorEditor {...codeMirrorEditorProps} />;
};
