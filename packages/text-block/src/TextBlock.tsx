/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement, useEffect, useState } from 'react';
import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import '@frontify/fondue-tokens/styles';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { RichTextEditor } from '@frontify/guideline-blocks-shared';
import 'tailwindcss/tailwind.css';
import { PLACEHOLDER } from './settings';
import { Settings, spacingValues } from './types';
import { getPlugins } from './getPlugins';

export const TextBlock = ({ appBridge }: BlockProps): ReactElement => {
    const isEditing = useEditorState(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const { content, columnNumber, columnGutterSimple, columnGutterCustom, isColumnGutterCustom } = blockSettings;
    const gap = isColumnGutterCustom ? columnGutterCustom : spacingValues[columnGutterSimple];
    const [isTextSaving, setIsTextSaving] = useState(false);
    const onTextChange = (content: string) => {
        setIsTextSaving(true);
        setBlockSettings({ content }).finally(() => {
            setIsTextSaving(false);
        });
    };

    useEffect(() => {
        const unloadHandler = (e: BeforeUnloadEvent) => {
            if (isTextSaving) {
                e.preventDefault();
                return (e.returnValue = 'Unsaved changes');
            }
            return;
        };
        window.addEventListener('beforeunload', unloadHandler);
        return () => window.removeEventListener('beforeunload', unloadHandler);
    }, [isTextSaving]);

    return (
        <RichTextEditor
            id={appBridge.getBlockId().toString()}
            isEditing={isEditing}
            value={content}
            columns={columnNumber}
            gap={gap}
            plugins={getPlugins(appBridge, columnNumber, gap)}
            placeholder={PLACEHOLDER}
            onBlur={onTextChange}
            onTextChange={onTextChange}
        />
    );
};
