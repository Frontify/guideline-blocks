/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Fragment, ReactElement } from 'react';
import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';

import { ColorBlockType, Props, Settings } from './types';

import { DraggableItem, DropZonePosition, OrderableListItem, RichTextEditor } from '@frontify/fondue';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { ListItem } from './components/list/ListItem';
import { ListItemAdd } from './components/list/ListItemAdd';
import { DropsItemAdd } from './components/drops/DropsItemAdd';
import { DropsItem } from './components/drops/DropsItem';
import { CardsItemAdd } from './components/cards/CardsItemAdd';
import { CardsItem } from './components/cards/CardsItem';
import { DropZone } from './components/DropZone';

const DEMO_COLORS = [
    { id: '#FF375A', sort: 1 },
    { id: '#825FFF', sort: 2 },
    { id: '#00C8A5', sort: 3 },
    { id: '#FFB400', sort: 4 },
    { id: '#FF375A', sort: 5 },
    { id: '#825FFF', sort: 6 },
    { id: '#00C8A5', sort: 7 },
    { id: '#FFB400', sort: 8 },
];

export const ColorBlock = ({ appBridge }: Props): ReactElement => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const { designTokens } = useGuidelineDesignTokens();
    const isEditing = useEditorState(appBridge);

    const { view = ColorBlockType.Cards, colorspaces = ['hex, rgb'], name = '', description = '' } = blockSettings;

    const onNameChange = (value: string) => setBlockSettings({ name: value });
    const onDescriptionChange = (value: string) => setBlockSettings({ description: value });

    const handleDrop = (
        targetItem: OrderableListItem<T>,
        sourceItem: OrderableListItem<T>,
        position: DropZonePosition
    ) => {
        console.log(targetItem);
        console.log(sourceItem);
        console.log(position);
    };

    const wrapperClasses: Record<ColorBlockType, string> = {
        [ColorBlockType.List]: 'tw-py-2 tw-overflow-x-hidden',
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
                <DndProvider backend={HTML5Backend}>
                    {DEMO_COLORS.map((color: DraggableItem<object>, index: number) => (
                        <Fragment key={index}>
                            <DropZone
                                key={`orderable-list-item-${index}-before`}
                                data={{
                                    targetItem: color,
                                    position: DropZonePosition.Before,
                                }}
                                onDrop={handleDrop}
                                treeId={'test'}
                                colorBlockType={view}
                            />

                            {view === ColorBlockType.List && (
                                <ListItem color={color.id} colorSpaces={colorspaces} isEditing={isEditing} />
                            )}
                            {view === ColorBlockType.Drops && (
                                <DropsItem color={color.id} colorSpaces={colorspaces} isEditing={isEditing} />
                            )}
                            {view === ColorBlockType.Cards && (
                                <CardsItem color={color.id} colorSpaces={colorspaces} isEditing={isEditing} />
                            )}

                            {index === DEMO_COLORS.length - 1 && (
                                <DropZone
                                    key={`orderable-list-item-${index}-after`}
                                    data={{
                                        targetItem: color,
                                        position: DropZonePosition.After,
                                    }}
                                    onDrop={handleDrop}
                                    treeId={'test'}
                                    colorBlockType={view}
                                />
                            )}
                        </Fragment>
                    ))}
                </DndProvider>

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
