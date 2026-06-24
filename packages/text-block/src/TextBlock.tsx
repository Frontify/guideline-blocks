/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { merge } from '@frontify/fondue/rte';
import { type BlockProps, RichTextEditor } from '@frontify/guideline-blocks-settings';
import { StyleProvider } from '@frontify/guideline-blocks-shared';
import { type ReactElement, useCallback, useMemo } from 'react';

import manifest from '../manifest.json';

import { getPlugins } from './getPlugins';
import { PLACEHOLDER } from './settings';
import { type Settings, spacingValues } from './types';

export const TextBlock = ({ appBridge }: BlockProps): ReactElement => {
    const isEditing = useEditorState(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const { content, columnNumber, columnGutterSimple, columnGutterCustom, isColumnGutterCustom } = blockSettings;
    const gap = isColumnGutterCustom ? columnGutterCustom : spacingValues[columnGutterSimple];

    const plugins = useMemo(() => getPlugins(appBridge, parseInt(columnNumber), gap), [appBridge, columnNumber, gap]);

    const handleTextChange = useCallback((content: string) => setBlockSettings({ content }), [setBlockSettings]);

    return (
        <StyleProvider
            data-test-id="text-block-wrapper"
            appId={manifest.appId}
            className={merge([isEditing && 'tw-min-h-9'])}
        >
            <RichTextEditor
                id={String(appBridge.context('blockId').get())}
                isEditing={isEditing}
                value={content}
                columns={parseInt(columnNumber)}
                gap={gap}
                plugins={plugins}
                placeholder={PLACEHOLDER}
                onTextChange={handleTextChange}
            />
        </StyleProvider>
    );
};
