/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC, FormEvent, useEffect, useMemo, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
    Color as ColorType,
    useBlockSettings,
    useColorPalettes,
    useColors,
    useEditorState,
} from '@frontify/app-bridge';
import { Color } from '@frontify/fondue';
import { BlockProps, joinClassNames, moveItemInArray } from '@frontify/guideline-blocks-settings';
import '@frontify/fondue/style';

import { CardsItem } from './components/cards/CardsItem';
import { CardsItemAdd } from './components/cards/CardsItemAdd';
import { DropsItem } from './components/drops/DropsItem';
import { DropsItemAdd } from './components/drops/DropsItemAdd';
import { DropZone } from './components/DropZone';
import { ListItem } from './components/list/ListItem';
import { ListItemAdd } from './components/list/ListItemAdd';
import { ColorBlockType, ColorSpaceValues, ItemProps, Settings } from './types';

const wrapperClasses: Record<ColorBlockType, string> = {
    [ColorBlockType.List]: 'tw-py-2 tw-overflow-x-hidden',
    [ColorBlockType.Drops]: 'tw-grid tw-gap-4 tw-grid-cols-6',
    [ColorBlockType.Cards]: 'tw-grid tw-gap-4 tw-grid-cols-4',
};

export const ColorBlock: FC<BlockProps> = ({ appBridge }) => {
    const [blockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState(appBridge);

    const { colorsByPaletteId, createColor, updateColor, deleteColor } = useColors(
        appBridge,
        blockSettings.colorPaletteId
    );
    const [colors, setColors] = useState<ColorType[]>([]);
    useEffect(() => {
        setColors(colorsByPaletteId);
    }, [colorsByPaletteId]);

    const memoizedColorPaletteId = useMemo(() => [blockSettings.colorPaletteId], [blockSettings.colorPaletteId]);
    const { colorPalettes, updateColorPalette } = useColorPalettes(appBridge, memoizedColorPaletteId);

    const handleDrop = (colorId: number, index: number) => {
        updateColor(colorId, { sort: index + 1 });
    };

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const handleNameChange = (event: FormEvent<HTMLInputElement>) => setName(event.currentTarget.value);
    const handleDescriptionChange = (event: FormEvent<HTMLInputElement>) => setDescription(event.currentTarget.value);

    useEffect(() => {
        if (colorPalettes[0]) {
            setName(colorPalettes[0].name);
            setDescription(colorPalettes[0].description);
        }
    }, [colorPalettes]);

    const colorSpaces = blockSettings.colorspaces as (keyof ColorSpaceValues)[];
    const handleCreateColor = (color: Color) => {
        createColor({
            colorPaletteId: blockSettings.colorPaletteId,
            red: color.red,
            green: color.green,
            blue: color.blue,
            alpha: color.alpha ? Math.round(color.alpha * 255) : 255,
        });
    };

    const inputClasses = joinClassNames(['tw-w-full tw-outline-none', isEditing ? '' : 'tw-pointer-events-none']);

    return (
        <div className="color-block" data-test-id="color-block">
            <div className="tw-w-full tw-mb-3 tw-text-l tw-font-bold tw-text-black">
                <input
                    className={inputClasses}
                    placeholder={isEditing ? 'Color palette name' : ''}
                    value={name}
                    onChange={handleNameChange}
                    onBlur={(event) =>
                        updateColorPalette(blockSettings.colorPaletteId, { name: event.currentTarget.value })
                    }
                    readOnly={!isEditing}
                />
            </div>

            <div className="tw-w-full tw-mb-12 tw-text-s tw-text-black">
                <input
                    className={inputClasses}
                    placeholder={isEditing ? 'Describe this color palette here' : ''}
                    value={description}
                    onChange={handleDescriptionChange}
                    onBlur={(event) =>
                        updateColorPalette(blockSettings.colorPaletteId, { description: event.currentTarget.value })
                    }
                    readOnly={!isEditing}
                />
            </div>

            <div className={wrapperClasses[blockSettings.view]}>
                <DndProvider backend={HTML5Backend}>
                    {colors.map((color, index) => {
                        const itemProps: ItemProps = {
                            color,
                            colorSpaces,
                            isEditing,
                            onBlur: (event) => updateColor(color.id, { name: event.target.value }),
                            onUpdate: (colorPatch) => updateColor(color.id, colorPatch),
                            onDelete: (colorId) => deleteColor(colorId),
                        };

                        return (
                            <DropZone
                                key={`drop-zone-item-${color.id}`}
                                index={index}
                                onDrop={() => handleDrop(color.id, index)}
                                treeId={String(blockSettings.colorPaletteId)}
                                colorBlockType={blockSettings.view}
                                moveCard={(dragIndex, hoverIndex) => {
                                    setColors(moveItemInArray(colors, dragIndex, hoverIndex));
                                }}
                                isEditing={isEditing}
                            >
                                <div>
                                    {blockSettings.view === ColorBlockType.List && <ListItem {...itemProps} />}
                                    {blockSettings.view === ColorBlockType.Drops && <DropsItem {...itemProps} />}
                                    {blockSettings.view === ColorBlockType.Cards && <CardsItem {...itemProps} />}
                                </div>
                            </DropZone>
                        );
                    })}

                    {isEditing && (
                        <>
                            {blockSettings.view === ColorBlockType.List && (
                                <ListItemAdd colorSpaces={colorSpaces} onConfirm={handleCreateColor} />
                            )}

                            {blockSettings.view === ColorBlockType.Drops && (
                                <DropsItemAdd colorSpaces={colorSpaces} onConfirm={handleCreateColor} />
                            )}

                            {blockSettings.view === ColorBlockType.Cards && (
                                <CardsItemAdd colorSpaces={colorSpaces} onConfirm={handleCreateColor} />
                            )}
                        </>
                    )}
                </DndProvider>
            </div>
        </div>
    );
};
