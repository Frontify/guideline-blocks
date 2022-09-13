/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement, useEffect, useState } from 'react';
import { FrontifyColor, useBlockSettings, useColorPalettes, useColors, useEditorState } from '@frontify/app-bridge';
import { useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';

import { ColorBlockProps, ColorBlockType, Settings } from './types';

import { RichTextEditor } from '@frontify/fondue';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { ListItem } from './components/list/ListItem';
import { ListItemAdd } from './components/list/ListItemAdd';
import { DropsItemAdd } from './components/drops/DropsItemAdd';
import { DropsItem } from './components/drops/DropsItem';
import { CardsItemAdd } from './components/cards/CardsItemAdd';
import { CardsItem } from './components/cards/CardsItem';
import { DropZone } from './components/DropZone';

import update from 'immutability-helper';

export const ColorBlock = ({ appBridge }: ColorBlockProps): ReactElement => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const { designTokens } = useGuidelineDesignTokens();
    const isEditing = useEditorState(appBridge);

    const { view = ColorBlockType.Cards, colorspaces = ['hex, rgb'], name = '', description = '' } = blockSettings;

    const onNameChange = (value: string) => setBlockSettings({ name: value });
    const onDescriptionChange = (value: string) => setBlockSettings({ description: value });

    const handleDrop = (colorId: number, index: number) => {
        updateColor(colorId, { sort: index + 1 });
    };

    const wrapperClasses: Record<ColorBlockType, string> = {
        [ColorBlockType.List]: 'tw-py-2 tw-overflow-x-hidden',
        [ColorBlockType.Drops]: 'tw-grid tw-gap-4 tw-grid-cols-6',
        [ColorBlockType.Cards]: 'tw-grid tw-gap-4 tw-grid-cols-4',
    };

    const { colorsByPaletteId, createColor, updateColor, deleteColor } = useColors(appBridge, appBridge.getBlockId());

    const [colors, setColors] = useState<FrontifyColor[]>([]);

    const { colorPalettes } = useColorPalettes(appBridge);

    console.log(colorPalettes);

    useEffect(() => {
        setColors(colorsByPaletteId);
    }, [colorsByPaletteId]);

    const moveCard = (dragIndex: number, hoverIndex: number) => {
        setColors((previousColors) =>
            update(previousColors, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, previousColors[dragIndex]],
                ],
            })
        );
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
                    {colors.map((color, index) => (
                        <DropZone
                            key={`orderable-list-item-${color.id}`}
                            index={index}
                            onDrop={() => handleDrop(color.id, index)}
                            treeId={'test'}
                            colorBlockType={view}
                            moveCard={moveCard}
                            isEditing={isEditing}
                        >
                            <div>
                                {view === ColorBlockType.List && (
                                    <ListItem
                                        color={color}
                                        colorSpaces={colorspaces}
                                        isEditing={isEditing}
                                        onBlur={(value) => updateColor(color.id, { name: value })}
                                        onUpdate={(colorPatch) => updateColor(color.id, colorPatch)}
                                        onDelete={(colorId) => deleteColor(colorId)}
                                    />
                                )}
                                {view === ColorBlockType.Drops && (
                                    <DropsItem
                                        color={color}
                                        colorSpaces={colorspaces}
                                        isEditing={isEditing}
                                        onBlur={(value) => updateColor(color.id, { name: value })}
                                        onUpdate={(colorPatch) => updateColor(color.id, colorPatch)}
                                        onDelete={(colorId) => deleteColor(colorId)}
                                    />
                                )}
                                {view === ColorBlockType.Cards && (
                                    <CardsItem
                                        color={color}
                                        colorSpaces={colorspaces}
                                        isEditing={isEditing}
                                        onBlur={(value) => updateColor(color.id, { name: value })}
                                        onUpdate={(colorPatch) => updateColor(color.id, colorPatch)}
                                        onDelete={(colorId) => deleteColor(colorId)}
                                    />
                                )}
                            </div>
                        </DropZone>
                    ))}
                </DndProvider>

                {isEditing && (
                    <>
                        {view === ColorBlockType.List && (
                            <ListItemAdd
                                colorSpaces={colorspaces}
                                isEditing={isEditing}
                                onConfirm={(color) => {
                                    createColor({
                                        colorPaletteId: appBridge.getBlockId(),
                                        red: color.r,
                                        green: color.g,
                                        blue: color.b,
                                        alpha: (color.a && color.a * 100) || 1,
                                    });
                                }}
                            />
                        )}

                        {view === ColorBlockType.Drops && (
                            <DropsItemAdd
                                colorSpaces={colorspaces}
                                isEditing={isEditing}
                                onConfirm={(color) =>
                                    createColor({
                                        colorPaletteId: appBridge.getBlockId(),
                                        red: color.r,
                                        green: color.g,
                                        blue: color.b,
                                        alpha: (color.a && color.a * 100) || 1,
                                    })
                                }
                            />
                        )}

                        {view === ColorBlockType.Cards && (
                            <CardsItemAdd
                                colorSpaces={colorspaces}
                                isEditing={isEditing}
                                onConfirm={(color) =>
                                    createColor({
                                        colorPaletteId: appBridge.getBlockId(),
                                        red: color.r,
                                        green: color.g,
                                        blue: color.b,
                                        alpha: (color.a && color.a * 100) || 1,
                                    })
                                }
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
