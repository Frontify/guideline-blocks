/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';

import { RichTextEditor as FondueRichTextEditor } from '@frontify/fondue';
import { RichTextEditorProps } from './types';
import { SerializedText } from './SerializedText';

export const RichTextEditor = ({
    id = 'rte',
    designTokens,
    isEditing,
    value,
    columns,
    gap,
    placeholder,
    plugins,
    onBlur,
    updateValueOnChange,
    showSerializedText,
}: RichTextEditorProps) => {
    if (isEditing) {
        const saveText = (newValue: string) => newValue !== value && onBlur(newValue);
        return (
            <FondueRichTextEditor
                id={id}
                designTokens={designTokens}
                value={value}
                border={false}
                placeholder={placeholder}
                onBlur={saveText}
                plugins={plugins}
                updateValueOnChange={updateValueOnChange}
            />
        );
    }
    return (
        <SerializedText
            value={value}
            designTokens={designTokens}
            columns={columns}
            gap={gap}
            show={showSerializedText}
        />
    );
};
