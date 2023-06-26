/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';

import { RichTextEditor as FondueRichTextEditor } from '@frontify/fondue';
import { RichTextEditorProps } from './types';
import { SerializedText } from './SerializedText';

export const RichTextEditor = ({
    id = 'rte',
    isEditing,
    value,
    columns,
    gap,
    placeholder,
    plugins,
    onTextChange,
    showSerializedText,
    updateValueOnChange,
}: RichTextEditorProps) => {
    if (isEditing) {
        return (
            <FondueRichTextEditor
                id={id}
                value={value}
                border={false}
                placeholder={placeholder}
                plugins={plugins}
                updateValueOnChange={updateValueOnChange}
                onTextChange={(newContent: string) => onTextChange && newContent !== value && onTextChange(newContent)}
            />
        );
    }
    return <SerializedText value={value} columns={columns} gap={gap} show={showSerializedText} plugins={plugins} />;
};
