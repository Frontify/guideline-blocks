/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useEffect, useState } from 'react';

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
    const [shouldPreventPageLeave, setShouldPreventPageLeave] = useState(false);

    const saveText = (newContent: string) => {
        onTextChange && newContent !== value && onTextChange(newContent);
        setShouldPreventPageLeave(false);
    };

    useEffect(() => {
        const unloadHandler = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            return (e.returnValue = 'Unprocessed changes');
        };

        if (shouldPreventPageLeave) {
            window.addEventListener('beforeunload', unloadHandler);
        }

        return () => window.removeEventListener('beforeunload', unloadHandler);
    }, [shouldPreventPageLeave]);

    if (isEditing) {
        return (
            <FondueRichTextEditor
                id={id}
                value={value}
                border={false}
                placeholder={placeholder}
                plugins={plugins}
                updateValueOnChange={updateValueOnChange}
                onValueChanged={() => setShouldPreventPageLeave(true)}
                onTextChange={saveText}
            />
        );
    }
    return <SerializedText value={value} columns={columns} gap={gap} show={showSerializedText} plugins={plugins} />;
};
