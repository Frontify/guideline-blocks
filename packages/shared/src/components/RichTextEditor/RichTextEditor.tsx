/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';

import { RichTextEditor as FondueRichTextEditor } from '@frontify/fondue';
import { RichTextEditorProps } from './types';
import { SerializedText } from './SerializedText';

export const RichTextEditor = ({
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
}: RichTextEditorProps) => {
    if (isEditing) {
        const saveText = (newValue: string) => newValue !== value && setBlockSettings({ [settingsId]: newValue });
        return (
            <FondueRichTextEditor
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
