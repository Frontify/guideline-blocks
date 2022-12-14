/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { RichTextEditor } from '@frontify/fondue';
import '@frontify/fondue-tokens/styles';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';
import { FC } from 'react';
import 'tailwindcss/tailwind.css';
import { getPlugins } from './getPlugins';
import { DEFAULT_COLUMN_NUMBER, PLACEHOLDER } from './settings';
import { GRID_CLASSES, Settings } from './types';

export const TextBlock: FC<BlockProps> = ({ appBridge }) => {
    const isEditing = useEditorState(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const { designTokens } = useGuidelineDesignTokens();

    const {
        columnNumber = DEFAULT_COLUMN_NUMBER,
        content,
        isColumnGutterCustom,
        columnGutterCustom,
        columnGutterSimple,
    } = blockSettings;

    const onTextChange = (value: string) => setBlockSettings({ content: value });
    return (
        <div
            data-test-id="text-block"
            style={{
                gap: isColumnGutterCustom ? columnGutterCustom : columnGutterSimple,
            }}
            className={`tw-gap-2 tw-block ${GRID_CLASSES[columnNumber]}`}
        >
            <RichTextEditor
                designTokens={designTokens ?? undefined}
                key={'text-block-editor'}
                value={content}
                plugins={getPlugins(columnNumber)}
                placeholder={isEditing ? PLACEHOLDER : undefined}
                readonly={!isEditing}
                onTextChange={onTextChange}
            />
        </div>
    );
};
