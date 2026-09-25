/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { merge } from '@frontify/fondue/rte';
import { type BlockProps, radiusStyleMap, toRgbaString } from '@frontify/guideline-blocks-settings';

import './styles.css';
import { CopyButton, StyleProvider } from '@frontify/guideline-blocks-shared';
import CodeMirror from '@uiw/react-codemirror';
import debounce from 'lodash-es/debounce';
import { type FC, useMemo, useState } from 'react';

import blockScope from '../block-scope.json';

import { CodeSnippetHeader } from './components/CodeSnippetHeader';
import { DEFAULT_BORDER_COLOR } from './constants';
import { useCodeMirrorExtensions } from './hooks/useCodeMirrorExtensions';
import { useCodeSnippetTheme } from './hooks/useCodeSnippetTheme';
import { type Language, type Settings } from './types';

export const CodeSnippetBlock: FC<BlockProps> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState(appBridge);
    const [contentValue] = useState(blockSettings.content);
    const [pendingLanguage, setPendingLanguage] = useState<Language>();
    const selectedLanguage = pendingLanguage ?? blockSettings.language ?? 'plain';
    const labelId = useMemo(() => `${appBridge.context('blockId').get()}-header`, [appBridge]);
    const {
        borderStyle,
        borderWidth,
        borderColor,
        hasBorder = false,
        withHeading = false,
        withRowNumbers = false,
        theme = 'default',
        content = '',
    } = blockSettings;

    const isMultiline = (content.match(/\n/g) || []).length > 1;

    const { editorTheme, headerStyle, headerButtonStyle, headerSelectStyle } = useCodeSnippetTheme(theme);
    const extensions = useCodeMirrorExtensions(selectedLanguage, theme);

    const customCornerRadiusStyle = {
        borderRadius: blockSettings.hasExtendedCustomRadius
            ? `${blockSettings.extendedRadiusTopLeft} ${blockSettings.extendedRadiusTopRight} ${blockSettings.extendedRadiusBottomRight} ${blockSettings.extendedRadiusBottomLeft}`
            : radiusStyleMap[blockSettings.extendedRadiusChoice],
    };

    const handleChange = debounce((value: string) => setBlockSettings({ content: value }), 500);

    const handleLanguageChange = async (value: Language) => {
        setPendingLanguage(value);
        try {
            await setBlockSettings({ language: value });
        } finally {
            setPendingLanguage(undefined);
        }
    };

    return (
        <StyleProvider scope={blockScope.scope}>
            <div
                data-test-id="code-snippet-block"
                className="tw-overflow-hidden"
                style={{
                    fontFamily: 'Menlo, Courier, monospace',
                    fontSize: '12px',
                    border: hasBorder
                        ? `${borderStyle} ${borderWidth} ${toRgbaString(borderColor || DEFAULT_BORDER_COLOR)}`
                        : 'none',
                    borderRadius: customCornerRadiusStyle.borderRadius,
                }}
            >
                <div className={merge(['tw-relative tw-group/copy', !isEditing && 'CodeMirror-readonly'])}>
                    {withHeading && (
                        <CodeSnippetHeader
                            labelId={labelId}
                            language={selectedLanguage}
                            content={content}
                            isEditing={isEditing}
                            headerStyle={headerStyle}
                            headerButtonStyle={headerButtonStyle}
                            headerSelectStyle={headerSelectStyle}
                            onLanguageChange={handleLanguageChange}
                        />
                    )}
                    <CodeMirror
                        theme={editorTheme}
                        value={contentValue}
                        extensions={extensions}
                        onChange={handleChange}
                        readOnly={!isEditing}
                        basicSetup={{
                            lineNumbers: withRowNumbers,
                            searchKeymap: false,
                            highlightActiveLineGutter: false,
                            highlightActiveLine: false,
                            lintKeymap: false,
                            autocompletion: false,
                            syntaxHighlighting: true,
                        }}
                        onCreateEditor={(view) =>
                            view.dom.querySelector('.cm-content')?.setAttribute('aria-labelledby', labelId)
                        }
                        placeholder={isEditing ? '< please add snippet here >' : ''}
                    />
                    {!withHeading && (
                        <div className="tw-absolute tw-p-1 tw-dark tw-top-0 tw-right-0 tw-hidden group-hover/copy:tw-block">
                            {isMultiline ? (
                                <CopyButton
                                    content={content}
                                    testId="copy-button"
                                    className="tw-p-2 tw-rounded-md"
                                    style={headerStyle}
                                    withTooltip
                                />
                            ) : (
                                <CopyButton
                                    content={content}
                                    className="tw-flex tw-items-center tw-justify-end tw-gap-1 tw-pr-2 tw-rounded-md"
                                    style={headerStyle}
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </StyleProvider>
    );
};
