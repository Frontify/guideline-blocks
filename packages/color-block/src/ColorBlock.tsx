/* (c) Copyright Frontify Ltd., all rights reserved. */

import '@frontify/fondue-tokens/styles';
import 'tailwindcss/tailwind.css';

import { FC } from 'react';

import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';
import { RichTextEditor } from '@frontify/fondue';

import { ColorBlockListView } from './ColorBlockListView';
import { ColorBlockDropsView } from './ColorBlockDropsView';
import { ColorBlockCardsView } from './ColorBlockCardsView';
import { Props, Settings } from './types';

export const ColorBlock: FC<Props> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState(appBridge);

    const { view_type = 'cards', color_spaces = ['hex, rgb'], name = '', description = '' } = blockSettings;
    console.log('🚀 ~ blockSettings', blockSettings);

    console.log('color_spaces', color_spaces);

    const onNameChange = (value: string): Promise<void> => setBlockSettings({ ...blockSettings, name: value });
    const onDescriptionChange = (value: string): Promise<void> =>
        setBlockSettings({ ...blockSettings, description: value });

    const { designTokens } = useGuidelineDesignTokens();

    const demoColors = ['1', '2', '3', '4', '5', '6', '7'];

    return (
        <div>
            <div className="tw-w-full tw-mb-3 tw-text-l tw-font-bold">
                <RichTextEditor
                    designTokens={designTokens ?? undefined}
                    onTextChange={onNameChange}
                    readonly={!isEditing}
                    value={name}
                    placeholder={isEditing ? 'Color pallete name' : ''}
                />
            </div>

            <div className="tw-w-full tw-mb-12 tw-text-s">
                <RichTextEditor
                    designTokens={designTokens ?? undefined}
                    onTextChange={onDescriptionChange}
                    readonly={!isEditing}
                    value={description}
                    placeholder={isEditing ? 'Describe this color palette here' : ''}
                />
            </div>

            {view_type === 'list' && (
                <ColorBlockListView colors={demoColors} colorSpaces={color_spaces} isEditing={isEditing} />
            )}

            {view_type === 'drops' && (
                <ColorBlockDropsView colors={demoColors} colorSpaces={color_spaces} isEditing={isEditing} />
            )}

            {view_type === 'cards' && (
                <ColorBlockCardsView colors={demoColors} colorSpaces={color_spaces} isEditing={isEditing} />
            )}
        </div>
    );
};
