/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { RichTextEditor, defaultPlugins, defaultPluginsWithColumns } from '@frontify/fondue';
import '@frontify/fondue-tokens/styles';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';
import { FC } from 'react';
import 'tailwindcss/tailwind.css';
import { PLACEHOLDER } from './settings';
import { Settings, spacingValues } from './types';

export const TextBlock: FC<BlockProps> = ({ appBridge }) => {
    const isEditing = useEditorState(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const { designTokens } = useGuidelineDesignTokens();

    const onTextChange = (value: string) => value !== blockSettings.content && setBlockSettings({ content: value });
    const gap = blockSettings.isColumnGutterCustom
        ? blockSettings.columnGutterCustom
        : spacingValues[blockSettings.columnGutterSimple];

    console.log('blockSettings', blockSettings);

    return (
        <div data-test-id="text-block">
            <RichTextEditor
                designTokens={designTokens ?? undefined}
                key={'text-block-editor'}
                value={blockSettings.content}
                layout={{ gap, columns: blockSettings.columnNumber }}
                border={false}
                plugins={blockSettings.columnNumber > 1 ? defaultPluginsWithColumns : defaultPlugins}
                placeholder={isEditing ? PLACEHOLDER : undefined}
                readonly={!isEditing}
                onTextChange={onTextChange}
                onBlur={onTextChange}
            />
        </div>
    );
};
