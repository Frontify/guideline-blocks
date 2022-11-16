/* (c) Copyright Frontify Ltd., all rights reserved. */

import { javascript } from '@codemirror/lang-javascript';
import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { debounce } from '@frontify/fondue';
import { radiusStyleMap, toRgbaString } from '@frontify/guideline-blocks-shared';
import CodeMirror from '@uiw/react-codemirror';
import { FC, ReactElement } from 'react';
import 'tailwindcss/tailwind.css';
import { DEFAULT_THEME_VALUE } from './constants';
import { CodeMirrorEditorProps, CodeSnippetProps, Settings } from './types';

export const CodeSnippetBlock: FC<CodeSnippetProps> = ({ appBridge }): ReactElement => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState(appBridge);

    const {
        content,
        language,
        borderStyle,
        borderWidth,
        borderColor,
        hasBorder = false,
        withHeading = false,
        withRowNumbers = false,
        theme = DEFAULT_THEME_VALUE,
    } = blockSettings;

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
        border: hasBorder ? `${borderStyle} ${borderWidth} ${borderColorRgba}` : 'none',
    };

    return (
        <div
            className="tw-overflow-hidden"
            style={{
                border: hasBorder ? `${borderStyle} ${borderWidth} ${borderColorRgba}` : 'none',
                borderRadius: customCornerRadiusStyle.borderRadius,
            }}
        >
            <header className="tw-p-2 tw-bg-[#f5f5f5]">Heading</header>
            <CodeMirror
                value={content}
                extensions={[javascript({ jsx: true })]}
                onChange={handleChange}
                editable={isEditing}
                basicSetup={{ lineNumbers: withRowNumbers }}
            />
        </div>
    );
};
