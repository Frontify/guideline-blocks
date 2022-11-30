/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { RichTextEditor } from '@frontify/fondue';
import '@frontify/fondue-tokens/styles';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';
import { FC } from 'react';
import 'tailwindcss/tailwind.css';
import { DEFAULT_COLUMN_NUMBER, PLACEHOLDER } from './settings';
import './styles.css';
import { GRID_CLASSES, Settings } from './types';

export const TextBlock: FC<BlockProps> = ({ appBridge }) => {
    const isEditing = useEditorState(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const { designTokens } = useGuidelineDesignTokens();

    const {
        columnNumber = DEFAULT_COLUMN_NUMBER,
        content = [...Array(parseInt(columnNumber.toString()))],
        isColumnGutterCustom,
        columnGutterCustom,
        columnGutterSimple,
    } = blockSettings;

    const onTextChange = (value: string, index: number) => {
        const newContent = [...content, (content[index] = value)];
        setBlockSettings({ ...blockSettings, content: newContent });
    };

    return (
        <div
            data-test-id="text-block"
            style={{
                gap: isColumnGutterCustom ? columnGutterCustom : columnGutterSimple,
            }}
            className={`text-block tw-grid ${GRID_CLASSES[columnNumber]}`}
        >
            {
                // TODO: parseInt and toString cast can be remove after https://app.clickup.com/t/263cwaw is done
                [...Array(parseInt(columnNumber.toString()))].map((_, index) => {
                    return (
                        <RichTextEditor
                            designTokens={designTokens ?? undefined}
                            key={`text-block-editor-${index}`}
                            value={content[index]}
                            placeholder={PLACEHOLDER}
                            readonly={!isEditing}
                            onTextChange={(value) => onTextChange(value, index)}
                        />
                    );
                })
            }
        </div>
    );
};
