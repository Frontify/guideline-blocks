/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';

import { FC, ReactElement } from 'react';
import { debounce } from '@frontify/fondue';
import { marginStyleMap, radiusStyleMap, toRgbaString } from '@frontify/guideline-blocks-shared';
import { useBlockSettings, useEditorState } from '@frontify/app-bridge';

import { CodeMirrorEditor } from './components';
import { BORDER_COLOR_DEFAULT_VALUE, DEFAULT_THEME_VALUE } from './constants';
import { CodeMirrorEditorProps, CodeSnippetProps, Settings } from './types';

export const CodeSnippetBlock: FC<CodeSnippetProps> = ({ appBridge }): ReactElement => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState(appBridge);

    const {
        content,
        language,
        lineStyle,
        lineWidth,
        borderColor = BORDER_COLOR_DEFAULT_VALUE,
        withBorder = false,
        withHeading = false,
        withRowNumbers = false,
        theme = DEFAULT_THEME_VALUE,
    } = blockSettings;

    const customMarginStyle = {
        margin: blockSettings.hasExtendedCustomMargin
            ? `${blockSettings.extendedMarginTop} ${blockSettings.extendedMarginRight} ${blockSettings.extendedMarginBottom} ${blockSettings.extendedMarginLeft}`
            : marginStyleMap[blockSettings.extendedMarginChoice],
    };

    const customCornerRadiusStyle = {
        borderRadius: blockSettings.hasExtendedCustomRadius
            ? `${blockSettings.extendedRadiusTopLeft} ${blockSettings.extendedRadiusTopRight} ${blockSettings.extendedRadiusBottomRight} ${blockSettings.extendedRadiusBottomLeft}`
            : radiusStyleMap[blockSettings.extendedRadiusChoice],
    };

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
        borderRadius: customCornerRadiusStyle.borderRadius,
        margin: customMarginStyle.margin,
        border: withBorder ? `${lineStyle} ${lineWidth} ${borderColorRgba}` : 'none',
    };

    return <CodeMirrorEditor {...codeMirrorEditorProps} />;
};
