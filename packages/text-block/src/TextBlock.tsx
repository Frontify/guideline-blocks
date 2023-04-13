/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import '@frontify/fondue-tokens/styles';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { RichTextEditor, useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';
import 'tailwindcss/tailwind.css';
import { PLACEHOLDER } from './settings';
import { Settings, spacingValues } from './types';
import { getPlugins } from './getPlugins';
import { ReactElement } from 'react';

export const TextBlock = ({ appBridge }: BlockProps): ReactElement => {
    const isEditing = useEditorState(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const { content, columnNumber, columnGutterSimple, columnGutterCustom, isColumnGutterCustom } = blockSettings;
    const { designTokens } = useGuidelineDesignTokens();
    const gap = isColumnGutterCustom ? columnGutterCustom : spacingValues[columnGutterSimple];
    const onTextChange = (content: string) => setBlockSettings({ content });

    return (
        <RichTextEditor
            isEditing={isEditing}
            value={content}
            designTokens={designTokens}
            columns={columnNumber}
            gap={gap}
            plugins={getPlugins(appBridge, columnNumber, gap)}
            placeholder={PLACEHOLDER}
            onBlur={onTextChange}
        />
    );
};
