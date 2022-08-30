/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';

import { FC, ReactElement } from 'react';
import { debounce } from '@frontify/fondue';
import { useBlockSettings } from '@frontify/app-bridge';
import { toRgbaString } from '@frontify/guideline-blocks-shared';

import { getValueInPx } from './helpers';
import { CodeMirrorEditor } from './components';
import { CodeMirrorEditorProps, CodeSnippetProps, Settings } from './types';
import { BORDER_COLOR_DEFAULT_VALUE, DEFAULT_THEME_VALUE } from './constants';

/** Commented out code is because of the issue https://github.com/Frontify/guideline-blocks/pull/141#issuecomment-1231385790 */
export const CodeSnippetBlock: FC<CodeSnippetProps> = ({ appBridge }): ReactElement => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);

    const {
        content,
        padding,
        language,
        lineStyle,
        lineWidth,
        borderColor = BORDER_COLOR_DEFAULT_VALUE,
        // borderRadius,
        // borderRadiusTop = '0px',
        // borderRadiusLeft = '0px',
        // borderRadiusRight = '0px',
        // borderRadiusBottom = '0px',
        paddingTop = '0px',
        paddingLeft = '0px',
        paddingRight = '0px',
        paddingBottom = '0px',
        withBorder = false,
        withHeading = false,
        withRowNumbers = false,
        withCustomPadding = false,
        theme = DEFAULT_THEME_VALUE,
        // withCustomBorderRadius = false,
    } = blockSettings;

    const customPadding = `${getValueInPx(paddingTop)} ${getValueInPx(paddingRight)} ${getValueInPx(
        paddingBottom
    )} ${getValueInPx(paddingLeft)}`;

    const borderColorRgba = toRgbaString(borderColor);
    // const customBorderRadius = `${borderRadiusTop} ${borderRadiusRight} ${borderRadiusBottom} ${borderRadiusLeft}`;

    const handleChange = debounce((value: string) => setBlockSettings({ content: value }), 500);

    const codeMirrorEditorProps: CodeMirrorEditorProps = {
        theme,
        language,
        withHeading,
        withRowNumbers,
        initValue: content,
        onChange: handleChange,
        padding: withCustomPadding ? customPadding : padding,
        // borderRadius: withCustomBorderRadius ? customBorderRadius : borderRadius,
        border: withBorder ? `${lineStyle} ${lineWidth} ${borderColorRgba}` : 'none',
    };

    return <CodeMirrorEditor {...codeMirrorEditorProps} />;
};
