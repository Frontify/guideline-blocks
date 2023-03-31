/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import '@frontify/fondue-tokens/styles';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { RichTextBlock, useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';
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

    return (
        <RichTextBlock
            settingsId="content"
            isEditing={isEditing}
            value={content}
            setBlockSettings={setBlockSettings}
            designTokens={designTokens}
            columns={columnNumber}
            gap={gap}
            plugins={getPlugins(columnNumber, gap)}
            placeholder={PLACEHOLDER}
        />
    );
};
