/* (c) Copyright Frontify Ltd., all rights reserved. */

import '@frontify/fondue-tokens/styles';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { RichTextEditor, Text } from '@frontify/fondue';
import { useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';
import { useBlockAssets, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { FC } from 'react';
import 'tailwindcss/tailwind.css';
import { BlockSettings } from './types';

export const AudioBlock: FC<BlockProps> = ({ appBridge }) => {
    const isEditing = useEditorState(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<BlockSettings>(appBridge);
    const { blockAssets } = useBlockAssets(appBridge);
    const { designTokens } = useGuidelineDesignTokens();
    const { description } = blockSettings;
    const audio = blockAssets?.audio?.[0];

    const saveDescription = (value: string) =>
        value !== blockSettings.description &&
        setBlockSettings({
            description: value,
        });

    return (
        <div data-test-id="audio-block" className="tw-relative tw-w-full">
            {audio ? (
                <>
                    <audio key={audio.id} controls>
                        <source src={audio.genericUrl} type={audio['type']} />
                    </audio>
                    <Text as="p">{audio.fileName}</Text>
                    <RichTextEditor
                        designTokens={designTokens ?? undefined}
                        value={description}
                        onBlur={saveDescription}
                        onTextChange={saveDescription}
                        placeholder="add a description here"
                        readonly={!isEditing}
                    />
                </>
            ) : (
                <p>Add Audio asset</p>
            )}
        </div>
    );
};
