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

    const { view = 'cards', colorspaces = ['hex, rgb'], name = '', description = '' } = blockSettings;

    const onNameChange = (value: string) => setBlockSettings({ name: value });
    const onDescriptionChange = (value: string) => setBlockSettings({ description: value });

    const { designTokens } = useGuidelineDesignTokens();

    const demoColors = ['1', '2', '3', '4', '5', '6', '7'];

    return (
        <div data-test-id="color-block">
            <div className="tw-w-full tw-mb-3 tw-text-l tw-font-bold tw-text-black">
                <RichTextEditor
                    designTokens={designTokens ?? undefined}
                    placeholder={isEditing ? 'Color palette name' : ''}
                    value={name}
                    onTextChange={onNameChange}
                    readonly={!isEditing}
                />
            </div>

            <div className="tw-w-full tw-mb-12 tw-text-s tw-text-black">
                <RichTextEditor
                    designTokens={designTokens ?? undefined}
                    placeholder={isEditing ? 'Describe this color palette here' : ''}
                    value={description}
                    onTextChange={onDescriptionChange}
                    readonly={!isEditing}
                />
            </div>

            {view === 'list' && (
                <ColorBlockListView colors={demoColors} colorSpaces={colorspaces} isEditing={isEditing} />
            )}

            {view === 'drops' && (
                <ColorBlockDropsView colors={demoColors} colorSpaces={colorspaces} isEditing={isEditing} />
            )}

            {view === 'cards' && (
                <ColorBlockCardsView colors={demoColors} colorSpaces={colorspaces} isEditing={isEditing} />
            )}
        </div>
    );
};
