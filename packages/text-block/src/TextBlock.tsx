/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from 'react';
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
    return (
        <RichTextEditor
            id={appBridge.getBlockId().toString()}
            isEditing={isEditing}
            value={content}
            columns={columnNumber}
            gap={gap}
            plugins={getPlugins(appBridge, columnNumber, gap)}
            placeholder={PLACEHOLDER}
            onTextChange={(content: string) => setBlockSettings({ content })}
        />
    );
};
