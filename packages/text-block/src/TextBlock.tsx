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

    if (!isEditing) {
        const style = { columns: blockSettings.columnNumber, columnGap: gap };
        const rawValue = JSON.stringify(parseRawValue({ raw: blockSettings.content ?? '' }));
        const html = serializeRawToHtml(rawValue, designTokens ?? undefined);
        return (
            <div
                data-test-id="text-block-html"
                className="tw-relative tw-w-full tw-break-words"
                style={style}
                dangerouslySetInnerHTML={{ __html: html }}
            />
        );
    }

    const onTextChange = (value: string) => value !== blockSettings.content && setBlockSettings({ content: value });

    return (
        <RichTextEditor
            data-test-id="rich-text-editor"
            id={appBridge.getBlockId().toString()}
            designTokens={designTokens ?? undefined}
            value={blockSettings.content}
            border={false}
            placeholder={isEditing ? PLACEHOLDER : undefined}
            onTextChange={onTextChange}
            onBlur={onTextChange}
            plugins={getPlugins(Number(blockSettings.columnNumber), Number((gap ?? '').replace('px', '')) || undefined)}
        />
    );
};
