/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import { ReactElement } from 'react';
import { debounce } from '@frontify/arcade';
import { CodeMirrorEditor } from './components';
import { useBlockSettings } from '@frontify/app-bridge';
import { CodeMirrorEditorProps, CodeSnippetProps, Settings } from './types';
import { toRgbaString } from '@frontify/guideline-blocks-shared';
import { BORDER_COLOR_DEFAULT_VALUE, DEFAULT_THEME_VALUE, DEFAULT_TUPLE_VALUE } from './constants';
import { getBorderWidthInPx, getCustomBorderRadius, getCustomPadding } from './helpers';

export const CodeSnippet = ({ appBridge, id }: CodeSnippetProps): ReactElement => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);

    const {
        padding,
        language,
        border = [],
        borderRadius,
        customPadding: paddingTuple = DEFAULT_TUPLE_VALUE,
        customBorderRadius: borderRadiusTuple = DEFAULT_TUPLE_VALUE,
        withBorder = false,
        withHeading = false,
        withRowNumbers = false,
        withCustomPadding = false,
        withCustomBorderRadius = false,
        theme = DEFAULT_THEME_VALUE,
    } = blockSettings;

    const [lineStyle, lineWidth, borderColor] = border;

    const borderWidth = getBorderWidthInPx(lineWidth);
    const customPadding = getCustomPadding(paddingTuple);
    const customBorderRadius = getCustomBorderRadius(borderRadiusTuple);
    const borderColorRgba = toRgbaString(borderColor ?? BORDER_COLOR_DEFAULT_VALUE);

    const handleChange = debounce((value: string) => setBlockSettings({ content: value }), 500);

    const codeMirorEditorProps: CodeMirrorEditorProps = {
        id,
        theme,
        language,
        withHeading,
        withRowNumbers,
        padding: withCustomPadding ? customPadding : padding,
        borderRadius: withCustomBorderRadius ? customBorderRadius : borderRadius,
        border: withBorder ? `${lineStyle} ${borderWidth} ${borderColorRgba}` : 'none',
        onChange: handleChange,
        initValue: blockSettings.content,
    };

    return <CodeMirrorEditor {...codeMirorEditorProps} />;
};
