/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement, useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FrontifyColor, useBlockSettings, useColorPalettes, useColors, useEditorState } from '@frontify/app-bridge';
import { RichTextEditor } from '@frontify/fondue';
import { useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';

import { CardsItem } from './components/cards/CardsItem';
import { CardsItemAdd } from './components/cards/CardsItemAdd';
import { DropsItem } from './components/drops/DropsItem';
import { DropsItemAdd } from './components/drops/DropsItemAdd';
import { DropZone } from './components/DropZone';
import { ListItem } from './components/list/ListItem';
import { ListItemAdd } from './components/list/ListItemAdd';
import { ColorBlockProps, ColorBlockType, ColorSpaceInputValues, Settings } from './types';

const wrapperClasses: Record<ColorBlockType, string> = {
    [ColorBlockType.List]: 'tw-py-2 tw-overflow-x-hidden',
    [ColorBlockType.Drops]: 'tw-grid tw-gap-4 tw-grid-cols-6',
    [ColorBlockType.Cards]: 'tw-grid tw-gap-4 tw-grid-cols-4',
};

export const ColorBlock = ({ appBridge }: ColorBlockProps): ReactElement => {
    const [blockSettings] = useBlockSettings<Settings>(appBridge);
    const { designTokens } = useGuidelineDesignTokens();
    const isEditing = useEditorState(appBridge);

    const { colorsByPaletteId, createColor, updateColor, deleteColor } = useColors(
        appBridge,
        blockSettings.colorPaletteId
    );
    const [colors, setColors] = useState<FrontifyColor[]>([]);
    useEffect(() => {
        setColors(colorsByPaletteId);
    }, [colorsByPaletteId]);

    const { colorPalettes, updateColorPalette } = useColorPalettes(appBridge, [blockSettings.colorPaletteId]);

    const moveCard = (dragIndex: number, hoverIndex: number) => {
        const colorsCopy = [...colors];
        const insertAt = dragIndex > hoverIndex ? hoverIndex : hoverIndex + 1;
        const deleteAt = dragIndex > hoverIndex ? dragIndex + 1 : dragIndex;

        colorsCopy.splice(insertAt, 0, colors[dragIndex]);
        colorsCopy.splice(deleteAt, 1);

        setColors(colorsCopy);
    };

    const handleDrop = (colorId: number, index: number) => {
        updateColor(colorId, { sort: index + 1 });
    };

    return (
        <div data-test-id="color-block">
            <div className="tw-w-full tw-mb-3 tw-text-l tw-font-bold tw-text-black">
                <RichTextEditor
                    designTokens={designTokens ?? undefined}
                    placeholder={isEditing ? 'Color palette name' : ''}
                    value={colorPalettes[0]?.name}
                    onBlur={(value) => updateColorPalette(blockSettings.colorPaletteId, { name: value })}
                    readonly={!isEditing}
                />
            </div>

            <div className="tw-w-full tw-mb-12 tw-text-s tw-text-black">
                <RichTextEditor
                    designTokens={designTokens ?? undefined}
                    placeholder={isEditing ? 'Describe this color palette here' : ''}
                    value={colorPalettes[0]?.description}
                    onBlur={(value) => updateColorPalette(blockSettings.colorPaletteId, { description: value })}
                    readonly={!isEditing}
                />
            </div>

            <div className={wrapperClasses[blockSettings.view]}>
                <DndProvider backend={HTML5Backend}>
                    {colors.map((color, index) => (
                        <DropZone
                            key={`orderable-list-item-${color.id}`}
                            index={index}
                            onDrop={() => handleDrop(color.id, index)}
                            treeId={String(blockSettings.colorPaletteId)}
                            colorBlockType={blockSettings.view}
                            moveCard={moveCard}
                            isEditing={isEditing}
                        >
                            <div>
                                {blockSettings.view === ColorBlockType.List && (
                                    <ListItem
                                        color={color}
                                        colorSpaces={blockSettings.colorspaces as (keyof ColorSpaceInputValues)[]}
                                        isEditing={isEditing}
                                        onBlur={(event) => updateColor(color.id, { name: event.target.value })}
                                        onUpdate={(colorPatch) => updateColor(color.id, colorPatch)}
                                        onDelete={(colorId) => deleteColor(colorId)}
                                    />
                                )}
                                {blockSettings.view === ColorBlockType.Drops && (
                                    <DropsItem
                                        color={color}
                                        colorSpaces={blockSettings.colorspaces as (keyof ColorSpaceInputValues)[]}
                                        isEditing={isEditing}
                                        onBlur={(event) => updateColor(color.id, { name: event.target.value })}
                                        onUpdate={(colorPatch) => updateColor(color.id, colorPatch)}
                                        onDelete={(colorId) => deleteColor(colorId)}
                                    />
                                )}
                                {blockSettings.view === ColorBlockType.Cards && (
                                    <CardsItem
                                        color={color}
                                        colorSpaces={blockSettings.colorspaces as (keyof ColorSpaceInputValues)[]}
                                        isEditing={isEditing}
                                        onBlur={(event) => updateColor(color.id, { name: event.target.value })}
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
                        {blockSettings.view === ColorBlockType.List && (
                            <ListItemAdd
                                colorSpaces={blockSettings.colorspaces as (keyof ColorSpaceInputValues)[]}
                                onConfirm={(color) => {
                                    createColor({
                                        colorPaletteId: blockSettings.colorPaletteId,
                                        red: color.red,
                                        green: color.green,
                                        blue: color.blue,
                                        alpha: color.alpha ? Math.round(color.alpha * 255) : 255,
                                    });
                                }}
                            />
                        )}

                        {blockSettings.view === ColorBlockType.Drops && (
                            <DropsItemAdd
                                colorSpaces={blockSettings.colorspaces as (keyof ColorSpaceInputValues)[]}
                                onConfirm={(color) => {
                                    createColor({
                                        colorPaletteId: blockSettings.colorPaletteId,
                                        red: color.red,
                                        green: color.green,
                                        blue: color.blue,
                                        alpha: color.alpha ? Math.round(color.alpha * 255) : 255,
                                    });
                                }}
                            />
                        )}

                        {blockSettings.view === ColorBlockType.Cards && (
                            <CardsItemAdd
                                colorSpaces={blockSettings.colorspaces as (keyof ColorSpaceInputValues)[]}
                                onConfirm={(color) => {
                                    createColor({
                                        colorPaletteId: blockSettings.colorPaletteId,
                                        red: color.red,
                                        green: color.green,
                                        blue: color.blue,
                                        alpha: color.alpha ? Math.round(color.alpha * 255) : 255,
                                    });
                                }}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
