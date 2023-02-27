/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { RichTextEditor, parseRawValue, serializeRawToHtml } from '@frontify/fondue';
import '@frontify/fondue-tokens/styles';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';
import 'tailwindcss/tailwind.css';
import { PLACEHOLDER } from './settings';
import { Settings, spacingValues } from './types';
import { getPlugins } from './getPlugins';
import { ReactElement } from 'react';

export const TextBlock = ({ appBridge }: BlockProps): ReactElement => {
    const isEditing = useEditorState(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const { designTokens } = useGuidelineDesignTokens();
    const gap = blockSettings.isColumnGutterCustom
        ? blockSettings.columnGutterCustom
        : spacingValues[blockSettings.columnGutterSimple];

    const onTextChange = (value: string) => value !== blockSettings.content && setBlockSettings({ content: value });
    const rawValue = JSON.stringify(parseRawValue({ raw: blockSettings.content ?? '' }));
    const html = serializeRawToHtml(rawValue, designTokens ?? undefined, blockSettings.columnNumber, gap);

    return (
        <>
            {!isEditing ? (
                <div data-test-id="rte-content-html" dangerouslySetInnerHTML={{ __html: html }} />
            ) : (
                <RichTextEditor
                    data-test-id="rich-text-editor"
                    id={appBridge.getBlockId().toString()}
                    designTokens={designTokens}
                    value={blockSettings.content}
                    border={false}
                    placeholder={PLACEHOLDER}
                    onTextChange={onTextChange}
                    onBlur={onTextChange}
                    plugins={getPlugins(blockSettings.columnNumber, gap)}
                />
            )}
        </>
    );
};
