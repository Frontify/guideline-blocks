/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { RichTextEditor } from '@frontify/fondue';
import '@frontify/fondue-tokens/styles';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';
import 'tailwindcss/tailwind.css';
import { PLACEHOLDER } from './settings';
import { Settings, spacingValues } from './types';
import { getPlugins } from './getPlugins';

export const TextBlock = ({ appBridge }: BlockProps) => {
    const isEditing = useEditorState(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const { designTokens } = useGuidelineDesignTokens();
    const onTextChange = (value: string) => value !== blockSettings.content && setBlockSettings({ content: value });
    const gap = blockSettings.isColumnGutterCustom
        ? blockSettings.columnGutterCustom
        : spacingValues[blockSettings.columnGutterSimple];
    const plugins = getPlugins(Number(blockSettings.columnNumber), Number(gap.replace('px', '')) || undefined);
    console.log(isEditing);

    return (
        <div data-test-id="text-block">
            <RichTextEditor
                id={appBridge.getBlockId().toString()}
                designTokens={designTokens ?? undefined}
                value={blockSettings.content}
                border={false}
                placeholder={isEditing ? PLACEHOLDER : undefined}
                onTextChange={onTextChange}
                onBlur={onTextChange}
                plugins={plugins}
                readonly={false} // atm we need to set this to false to make the editor work
            />
        </div>
    );
};
