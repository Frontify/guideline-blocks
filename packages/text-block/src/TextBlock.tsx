/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { RichTextEditor, defaultPlugins, defaultPluginsWithColumns } from '@frontify/fondue';
import '@frontify/fondue-tokens/styles';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { hasRichTextValue, joinClassNames, useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';
import { FC } from 'react';
import 'tailwindcss/tailwind.css';
import { PLACEHOLDER } from './settings';
import { GRID_CLASSES, Settings, spacingValues } from './types';

export const TextBlock: FC<BlockProps> = ({ appBridge }) => {
    const isEditing = useEditorState(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const { designTokens } = useGuidelineDesignTokens();

    const onTextChange = (value: string) => value !== blockSettings.content && setBlockSettings({ content: value });

    return (
        <div
            data-test-id="text-block"
            style={{
                gap: blockSettings.isColumnGutterCustom
                    ? blockSettings.columnGutterCustom
                    : spacingValues[blockSettings.columnGutterSimple],
            }}
            className={joinClassNames([
                'tw-block tw-p-0 tw-m-0',
                hasRichTextValue(blockSettings.content) && GRID_CLASSES[blockSettings.columnNumber],
            ])}
        >
            <RichTextEditor
                designTokens={designTokens ?? undefined}
                key={'text-block-editor'}
                value={blockSettings.content}
                plugins={blockSettings.columnNumber > 1 ? defaultPluginsWithColumns : defaultPlugins}
                placeholder={isEditing ? PLACEHOLDER : undefined}
                readonly={!isEditing}
                onTextChange={onTextChange}
                onBlur={onTextChange}
            />
        </div>
    );
};
