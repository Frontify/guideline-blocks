/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Select } from '@frontify/fondue/components';
import { CopyButton } from '@frontify/guideline-blocks-shared';
import { type CSSProperties } from 'react';

import { type Language, languageNameMap } from '../types';

type CodeSnippetHeaderProps = {
    labelId: string;
    language: Language;
    content: string;
    isEditing: boolean;
    headerStyle: CSSProperties;
    headerButtonStyle: CSSProperties;
    headerSelectStyle: CSSProperties;
    onLanguageChange: (language: Language) => void;
};

export const CodeSnippetHeader = ({
    labelId,
    language,
    content,
    isEditing,
    headerStyle,
    headerButtonStyle,
    headerSelectStyle,
    onLanguageChange,
}: CodeSnippetHeaderProps) => (
    <div
        data-test-id="code-snippet-header"
        className="tw-py-2 tw-px-3 tw-bg-black-5 tw-border-b tw-border-black-10 tw-text-small tw-flex tw-justify-between tw-items-center"
        style={{ ...headerStyle, letterSpacing: 'normal' }}
    >
        {isEditing ? (
            <div id={labelId} className="tw-max-w-[150px]" style={headerSelectStyle}>
                <Select value={language} onSelect={(value) => onLanguageChange(value as Language)}>
                    {Object.entries(languageNameMap).map(([value, label]) => (
                        <Select.Item value={value} key={value}>
                            {label}
                        </Select.Item>
                    ))}
                </Select>
            </div>
        ) : (
            <span id={labelId}>{languageNameMap[language]}</span>
        )}
        <CopyButton
            content={content}
            testId="header-copy-button"
            className="tw-items-center tw-justify-end tw-gap-1 tw-flex"
            style={headerButtonStyle}
        />
    </div>
);
