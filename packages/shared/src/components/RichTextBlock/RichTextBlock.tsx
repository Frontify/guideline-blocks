/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';

import { RichTextEditor, parseRawValue, serializeRawToHtml } from '@frontify/fondue';
import { RichTextBlockProps } from './types';

export const RichTextBlock = ({
    settingsId,
    designTokens,
    isEditing,
    value,
    columns,
    gap,
    placeholder,
    rtePlugins,
    setBlockSettings,
}: RichTextBlockProps) => {
    if (isEditing) {
        const saveText = (newValue: string) => newValue !== value && setBlockSettings({ [settingsId]: newValue });
        return (
            <RichTextEditor
                designTokens={designTokens}
                value={value}
                border={false}
                placeholder={placeholder}
                onBlur={saveText}
                plugins={rtePlugins}
            />
        );
    } else {
        const rawValue = JSON.stringify(parseRawValue({ raw: value ?? '' }));
        const html = serializeRawToHtml(rawValue, designTokens, columns, gap);
        return <div data-test-id="rte-content-html" dangerouslySetInnerHTML={{ __html: html }} />;
    }
};
