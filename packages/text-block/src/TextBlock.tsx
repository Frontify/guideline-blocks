/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement, useCallback, useMemo } from 'react';
import { useBlockSettings, useEditorState } from '@frontify/app-bridge';

import { merge } from '@frontify/fondue';
import { BlockProps, RichTextEditor } from '@frontify/guideline-blocks-settings';

import { PLACEHOLDER } from './settings';
import { Settings, spacingValues } from './types';
import { getPlugins } from './getPlugins';
import { StyleProvider } from '@frontify/guideline-blocks-shared';

export const TextBlock = ({ appBridge }: BlockProps): ReactElement => {
    const isEditing = useEditorState(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const { content, columnNumber, columnGutterSimple, columnGutterCustom, isColumnGutterCustom } = blockSettings;
    const gap = isColumnGutterCustom ? columnGutterCustom : spacingValues[columnGutterSimple];

    const plugins = useMemo(() => getPlugins(appBridge, columnNumber, gap), [appBridge, columnNumber, gap]);

    const handleTextChange = useCallback((content: string) => setBlockSettings({ content }), [setBlockSettings]);

    return (
        <div data-test-id="text-block-wrapper" className={merge(['text-block', isEditing && 'tw-min-h-9'])}>
            <StyleProvider>
                <RichTextEditor
                    id={String(appBridge.context('blockId').get())}
                    isEditing={isEditing}
                    value={content}
                    columns={columnNumber}
                    gap={gap}
                    plugins={plugins}
                    placeholder={PLACEHOLDER}
                    onTextChange={handleTextChange}
                />
            </StyleProvider>
        </div>
    );
};
