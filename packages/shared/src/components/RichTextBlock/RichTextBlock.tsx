/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';

import { RichTextEditor } from '@frontify/fondue';
import { RichTextBlockProps } from './types';
import { SerializedText } from './SerializedText';

export const RichTextBlock = ({
    settingsId,
    designTokens,
    isEditing,
    value,
    columns,
    gap,
    placeholder,
    plugins,
    setBlockSettings,
    updateValueOnChange,
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
                plugins={plugins}
                updateValueOnChange={updateValueOnChange}
            />
        );
    } else {
        return <SerializedText value={value} designTokens={designTokens} columns={columns} gap={gap} />;
    }
};
