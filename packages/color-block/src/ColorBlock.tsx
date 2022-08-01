/* (c) Copyright Frontify Ltd., all rights reserved. */

import '@frontify/fondue-tokens/styles';
import 'tailwindcss/tailwind.css';

import { FC } from 'react';

import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';
import { RichTextEditor } from '@frontify/fondue';

import { ColorBlockType, Props, Settings } from './types';
import { ListItem } from './components/list/ListItem';
import { ListItemAdd } from './components/list/ListItemAdd';
import { DropsItemAdd } from './components/drops/DropsItemAdd';
import { DropsItem } from './components/drops/DropsItem';
import { CardsItemAdd } from './components/cards/CardsItemAdd';
import { CardsItem } from './components/cards/CardsItem';

export const ColorBlock: FC<Props> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState(appBridge);

    const { view = ColorBlockType.Cards, colorspaces = ['hex, rgb'], name = '', description = '' } = blockSettings;

    const onNameChange = (value: string) => setBlockSettings({ name: value });
    const onDescriptionChange = (value: string) => setBlockSettings({ description: value });

    const { designTokens } = useGuidelineDesignTokens();

    const demoColors = ['#100100', '#200200', '#300300', '#400400', '#500500', '#600600', '#700700'];

    const wrapperClasses: Record<ColorBlockType, string> = {
        [ColorBlockType.List]: '',
        [ColorBlockType.Drops]: 'tw-grid tw-gap-4 tw-grid-cols-6',
        [ColorBlockType.Cards]: 'tw-grid tw-gap-4 tw-grid-cols-4',
    };

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

            <div className={wrapperClasses[view]}>
                {demoColors.map((color: string) => (
                    <>
                        {view === ColorBlockType.List && (
                            <ListItem color={color} colorSpaces={colorspaces} isEditing={isEditing} />
                        )}
                        {view === ColorBlockType.Drops && (
                            <DropsItem color={color} colorSpaces={colorspaces} isEditing={isEditing} />
                        )}
                        {view === ColorBlockType.Cards && (
                            <CardsItem color={color} colorSpaces={colorspaces} isEditing={isEditing} />
                        )}
                    </>
                ))}

                {isEditing && (
                    <>
                        {view === ColorBlockType.List && (
                            <ListItemAdd colorSpaces={colorspaces} isEditing={isEditing} />
                        )}

                        {view === ColorBlockType.Drops && (
                            <DropsItemAdd colorSpaces={colorspaces} isEditing={isEditing} />
                        )}

                        {view === ColorBlockType.Cards && (
                            <CardsItemAdd colorSpaces={colorspaces} isEditing={isEditing} />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
