/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Extension } from '@codemirror/state';
import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { Dropdown, DropdownSize, debounce } from '@frontify/fondue';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { radiusStyleMap, toRgbaString } from '@frontify/guideline-blocks-shared';
import { langs } from '@uiw/codemirror-extensions-langs';
import * as themes from '@uiw/codemirror-themes-all';
import CodeMirror from '@uiw/react-codemirror';
import { FC, useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { headerThemes } from './headerThemes';
import { Language, Settings, languageNameMap } from './types';

export const CodeSnippetBlock: FC<BlockProps> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState(appBridge);
    const [contentValue] = useState(blockSettings.content);
    const [selectedLanguage, setSelectedLanguage] = useState(blockSettings.language ?? 'plain');
    const extensions = [] as Extension[];

    useEffect(() => {
        setSelectedLanguage(blockSettings.language ?? 'plain');
    }, [blockSettings.language]);

    const {
        borderStyle,
        borderWidth,
        borderColor,
        hasBorder = false,
        withHeading = false,
        withRowNumbers = false,
        theme = 'default',
    } = blockSettings;

    const getTheme = () => {
        if (theme !== 'default' && Object.keys(themes).includes(theme)) {
            return themes[theme];
        }
        return 'light';
    };

    const getCurrentLanguageFromLangs = () => {
        if (selectedLanguage !== 'plain' && Object.keys(langs).includes(selectedLanguage)) {
            return langs[selectedLanguage];
        }
        return null;
    };

    const activeLanguage = getCurrentLanguageFromLangs();
    if (activeLanguage) {
        extensions.push(activeLanguage());
    }

    const customCornerRadiusStyle = {
        borderRadius: blockSettings.hasExtendedCustomRadius
            ? `${blockSettings.extendedRadiusTopLeft} ${blockSettings.extendedRadiusTopRight} ${blockSettings.extendedRadiusBottomRight} ${blockSettings.extendedRadiusBottomLeft}`
            : radiusStyleMap[blockSettings.extendedRadiusChoice],
    };

    const handleChange = debounce((value: string) => setBlockSettings({ content: value }), 500);

    const handleLanguageChange = (value: Language) => {
        setSelectedLanguage(value);
        setBlockSettings({ language: value });
    };

    return (
        <div
            data-test-id="code-snippet-block"
            className="tw-overflow-hidden"
            style={{
                fontFamily: 'Menlo, Courier, monospace',
                fontSize: '12px',
                border: hasBorder ? `${borderStyle} ${borderWidth} ${toRgbaString(borderColor)}` : 'none',
                borderRadius: customCornerRadiusStyle.borderRadius,
            }}
        >
            {withHeading && (
                <div
                    data-test-id="code-snippet-header"
                    className="tw-py-2 tw-px-3 tw-bg-black-5 tw-border-b tw-border-black-10 tw-text-s"
                    style={headerThemes[blockSettings.theme ?? 'default']}
                >
                    {isEditing ? (
                        <div className="tw-max-w-[150px]">
                            <Dropdown
                                size={DropdownSize.Small}
                                activeItemId={selectedLanguage}
                                menuBlocks={[
                                    {
                                        id: 'languages',
                                        menuItems: Object.entries(languageNameMap).map(([value, label]) => ({
                                            id: value,
                                            title: label,
                                        })),
                                    },
                                ]}
                                onChange={(value) => handleLanguageChange(value as Language)}
                            />
                        </div>
                    ) : (
                        <span>{languageNameMap[selectedLanguage]}</span>
                    )}
                </div>
            )}
            <CodeMirror
                theme={getTheme()}
                value={contentValue}
                extensions={extensions}
                onChange={handleChange}
                readOnly={!isEditing}
                basicSetup={{
                    lineNumbers: withRowNumbers,
                    foldGutter: false,
                    searchKeymap: false,
                    highlightActiveLineGutter: false,
                    highlightActiveLine: false,
                    lintKeymap: false,
                    autocompletion: false,
                }}
                placeholder={isEditing ? '< please add snippet here >' : ''}
            />
        </div>
    );
};
