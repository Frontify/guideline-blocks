/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';

import { RichTextEditor as FondueRichTextEditor } from '@frontify/fondue';
import { RichTextEditorProps } from './types';
import { SerializedText } from './SerializedText';
import { BlockStyles } from './plugins';

export const RichTextEditor = ({
    id = 'rte',
    styles = BlockStyles,
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
            columns={columns}
            gap={gap}
            show={showSerializedText}
            plugins={plugins}
            styles={styles}
        />
    );
};
