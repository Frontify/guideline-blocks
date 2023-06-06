/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement, useEffect, useMemo, useState } from 'react';
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
    const [isApiRequestPending, setIsApiRequestPending] = useState(false);

    const onTextChange = (content: string) => {
        setBlockSettings({ content }).finally(() => {
            setIsApiRequestPending(false);
        });
    };

    useEffect(() => {
        const unloadHandler = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            return (e.returnValue = 'Unsaved changes');
        };

        if (isApiRequestPending) {
            window.addEventListener('beforeunload', unloadHandler);
        }

        return () => window.removeEventListener('beforeunload', unloadHandler);
    }, [isApiRequestPending]);

    const richTextEditor = useMemo(() => {
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
                onValueChanged={!isApiRequestPending ? () => setIsApiRequestPending(true) : undefined}
            />
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [appBridge, isEditing, content, columnNumber, gap]);

    return richTextEditor;
};
