/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import { FC, Key, useEffect, useRef, useState } from 'react';
import { AppBridgeBlock, useBlockSettings, useColorPalettes, useEditorState } from '@frontify/app-bridge';
import { SquareWithColor } from './components/SquareWithColor';
import { SquareWithoutColor } from './components/SquareWithoutColor';
import { AddNewColor } from './components/AddNewColor';
import { ColorPalette, ColorProps, Settings } from './types';

import {
    Button,
    ButtonGroup,
    ButtonSize,
    ButtonStyle,
    DropZonePosition,
    IconArrowStretchBox12,
    IconPlus12,
    OrderableListItem,
    useMemoizedId,
} from '@frontify/fondue';
import '@frontify/fondue-tokens/styles';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import 'tailwindcss/tailwind.css';
import { DropZone } from './react-dnd/DropZone';

type Props = {
    appBridge: AppBridgeBlock;
};

export const ColorScaleBlock: FC<Props> = ({ appBridge }) => {
    const { colorPalettes } = useColorPalettes(appBridge);
    const [colorPickerPalette, setColorPickerPalette]: [ColorPalette[], (value: ColorPalette[]) => void] = useState(
        [] as ColorPalette[]
    );
    const isEditing = useEditorState(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const [colorScaleHeight, setColorScaleHeight] = useState(
        blockSettings['customHeight'] ? blockSettings['heightInput'] : blockSettings['heightSlider']
    );
    const [isDragging, setIsDragging]: [boolean, (value: boolean) => void] = useState(false);
    const emptyBlockColors: string[] = ['#D5D6D6', '#DFDFDF', '#E8E9E9', '#F1F1F1', '#FAFAFA', '#FFFFFF'];
    const [editedColor, setEditedColor] = useState();
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
    const colorScaleBlockRef: { current?: HTMLDivElement } = useRef();

    const colorWidth = 100; // default color square width if all other calculations fail

    const postDrop = (updatedColors: ColorProps[]) => {
        setBlockSettings({ ...blockSettings, 'color-input': updatedColors });
        setDisplayableItems(updatedColors);
    };

    const handleDrop = (targetItem: OrderableListItem, movedItem: OrderableListItem, position: DropZonePosition) => {
        let movedItemIndex = 0,
            targetItemIndex = 0;

        let updatedColors = [...displayableItems];

        for (const [index, colorItem] of updatedColors.entries()) {
            if (colorItem.id === movedItem.id) {
                movedItemIndex = index;
            }
        }

        updatedColors = updatedColors.filter((colorItem, index) => index !== movedItemIndex);

        for (const [index, colorItem] of updatedColors.entries()) {
            if (colorItem.id === targetItem.id) {
                targetItemIndex = index;
            }
        }

        if (position === 'after') {
            updatedColors.splice(targetItemIndex + 1, 0, movedItem as ColorProps);
        } else if (position === 'before') {
            updatedColors.splice(targetItemIndex, 0, movedItem as ColorProps);
        }

        postDrop(updatedColors);
    };

    const calculateDefaultColorWidth = (arrLen: number) => {
        if (colorScaleBlockRef && colorScaleBlockRef.current) {
            const colorScaleBlockWidth = colorScaleBlockRef.current.getBoundingClientRect().width;
            const defaultWidth = colorScaleBlockWidth / arrLen;

            return defaultWidth;
        } else {
            return colorWidth;
        }
    };

    const resizeEvenly = (itemList: ColorProps[]) => {
        if (!itemList) {
            return;
        }

        const defaultWidth = calculateDefaultColorWidth(itemList.length);

        const newDisplayableItems = itemList.map((item, index) => {
            return { ...item, width: defaultWidth };
        });

        return newDisplayableItems;
    };

    const calculateWidths = (itemList: ColorProps[]) => {
        let emptySpace = 0;
        let usedSpace = 0;
        let emptySquares = 0;
        let emptySquareWidth = 12;
        let itemsWithWidths: ColorProps[] = [];

        itemsWithWidths = itemList?.map((value: ColorProps) => {
            if (colorScaleBlockRef && colorScaleBlockRef.current && (!value || (value && !value.id))) {
                // Square has no ID, so this is an empty placeholder square
                emptySquares++;
                return value;
            } else if (colorScaleBlockRef && colorScaleBlockRef.current && (!value || (value && !value.width))) {
                // In this case, a width is missing
                return {
                    ...value,
                    width: calculateDefaultColorWidth(itemList.length),
                };
            }
            return value;
        });

        if (colorScaleBlockRef && colorScaleBlockRef.current) {
            const colorBlockWidth = colorScaleBlockRef.current.getBoundingClientRect().width;

            itemsWithWidths?.map((value: ColorProps) => {
                if (value && value.id && value.width) {
                    usedSpace += value.width;
                }

                return value;
            });

            emptySpace = colorBlockWidth - usedSpace;

            emptySquareWidth = emptySpace / emptySquares;

            itemsWithWidths = itemsWithWidths?.map((value: ColorProps) => {
                if (!value || (value && !value.id)) {
                    if (value) {
                        return { ...value, width: emptySquareWidth };
                    }
                    return {
                        width: emptySquareWidth,
                        alt: 'Click to drag',
                    };
                }
                return value;
            });
        }

        if (emptySpace === 0 && itemsWithWidths) {
            itemsWithWidths = itemsWithWidths?.map((value: ColorProps, index: number) => {
                if (!value || (value && !value.id)) {
                    if (value) {
                        return {
                            ...value,
                            width: calculateDefaultColorWidth(itemList.length),
                        };
                    }
                    return {
                        width: calculateDefaultColorWidth(itemList.length),
                        alt: 'Click to drag',
                    };
                }
                return value;
            });
        }

        return itemsWithWidths || [];
    };

    const [displayableItems, setDisplayableItems] = useState(calculateWidths(blockSettings['color-input']));

    const [colorOptionsOpen, setColorOptionsOpen] = useState({});

    const dragStartPos: { current?: number | null } = useRef();
    const dragStartWidth: { current?: number | null } = useRef();
    const lastDragPos: { current?: number | null } = useRef();

    const deleteColor = (id: number) => {
        const reorderedList = displayableItems?.filter((item: ColorProps) => item.id !== id);
        setBlockSettings({ ...blockSettings, 'color-input': reorderedList });
    };

    const updateColor = (newColor: ColorProps) => {
        // If appearAfter is true, it means that this is a new color square being added. The new square will appear after the index provided by `id`.

        let updatedColors = [...displayableItems];

        const addedFirstColor = displayableItems.filter((item) => (item.id ? true : false)).length;

        if (!addedFirstColor) {
            updatedColors = [newColor];
        } else {
            updatedColors.push(newColor);
        }

        const colorsWithNewWidths = resizeEvenly(updatedColors) || [];

        setBlockSettings({
            ...blockSettings,
            'color-input': colorsWithNewWidths,
        });
        setDisplayableItems(colorsWithNewWidths);
    };

    const calculateLeftPosition = (index: number, width?: number) => {
        let leftPos = 0;
        const defaultWidth = width ? width : colorWidth;
        displayableItems?.map((value: ColorProps, loopIndex: number) => {
            if (loopIndex < index) {
                leftPos += value && value.width ? value.width : defaultWidth;
            }
            return value;
        });
        return leftPos;
    };

    const canExpandColorBlock = () => {
        const colorScaleBlockWidth = colorScaleBlockRef.current.getBoundingClientRect().width;
        let usedSpace = 0;

        displayableItems?.map((value: ColorProps) => {
            let width;
            if (value && value.width) {
                width = value.width;
            } else {
                width = calculateDefaultColorWidth(displayableItems.length);
            }
            if (width) {
                usedSpace += width;
            }
            return value;
        });

        if (usedSpace < colorScaleBlockWidth) {
            return true;
        }
        return false;
    };

    const doesColorHaveRgbValues = (colorValue: ColorProps) => {
        if (colorValue && colorValue.color) {
            return true;
        }
        return false;
    };

    const populateColorPickerPalettes = () => {
        const palettes: ColorPalette[] = [];

        for (const palette of colorPalettes) {
            const colors = palette.colors.map((color) => {
                return {
                    id: color.id,
                    alpha: color.alpha,
                    red: color.red,
                    green: color.green,
                    blue: color.blue,
                    name: color.name,
                };
            });
            palettes.push({
                id: palette.id,
                title: palette.name,
                source: `#${palette.colors[0].hex}`,
                colors,
            });
        }
        setColorPickerPalette(palettes);
    };

    useEffect(() => {
        // This runs when colorPalettes gets populated.

        populateColorPickerPalettes();
    }, [colorPalettes]);

    useEffect(() => {
        const currentHeight = blockSettings['customHeight']
            ? blockSettings['heightInput']
            : blockSettings['heightSlider'];

        if (colorScaleHeight !== currentHeight) {
            setColorScaleHeight(currentHeight);
        }
        // This runs every time blockSettings are changed.

        if (colorScaleBlockRef && colorScaleBlockRef.current) {
            let needToCalculateWidths = false;

            // This determines the minimum number of colors, and checks to see if a custom value is defined or if the settings is using slider values.

            // TODO: use real values later
            // const minimumColors = blockSettings['colorInputMinimumSwitch']
            //     ? parseInt(blockSettings['colorInputMinimum'])
            //     : parseInt(blockSettings['colorInputMinimumSlider']);
            let addedFirstColor = false;
            if (blockSettings['color-input']) {
                addedFirstColor = blockSettings['color-input'].filter((item: ColorProps) =>
                    item.id ? true : false
                ).length;
            } else {
                addedFirstColor = false;
            }
            const minimumColors = addedFirstColor ? 1 : 6;

            try {
                // Check to see if we have the minimum number of color squares as defined in the settings.
                if (blockSettings['color-input'] && blockSettings['color-input'].length >= minimumColors) {
                    blockSettings['color-input'].forEach((value: ColorProps) => {
                        if (!value || (value && !value.width)) {
                            needToCalculateWidths = true;
                        }
                    });

                    if (needToCalculateWidths) {
                        const colorsWithNewWidths = calculateWidths(blockSettings['color-input']);
                        setBlockSettings({
                            ...blockSettings,
                            'color-input': colorsWithNewWidths,
                        });
                        setDisplayableItems(colorsWithNewWidths);
                    } else {
                        setDisplayableItems(blockSettings['color-input']);
                    }
                } else {
                    // If the number of colors is less than the minimum amount defined in settings, add
                    // however many color squares are needed to match the minimum.
                    const colorsArray = blockSettings['color-input'] || [];
                    let missingColors = 0;

                    if (colorsArray.length < minimumColors) {
                        missingColors = minimumColors - colorsArray.length;
                        let colorsWithNewWidths;

                        for (let i = 0; i < missingColors; i++) {
                            colorsArray.push(null);

                            colorsWithNewWidths = calculateWidths(colorsArray);
                        }
                        setBlockSettings({
                            ...blockSettings,
                            'color-input': colorsWithNewWidths,
                        });
                        setDisplayableItems(colorsWithNewWidths || []);
                    }
                }
            } catch (event: any) {
                throw new Error(event);
            }
        }
    }, [blockSettings]);

    const draggingId: { current?: number | null } = useRef(null);

    const onResizeStop = () => {
        draggingId.current = null;
    };

    const onResizeStart = (event: MouseEvent, index?: number, currentColor?: ColorProps) => {
        if (dragStartPos) {
            dragStartPos.current = event.clientX;
            dragStartWidth.current = currentColor?.width;
        }
        draggingId.current = index;
    };

    const onResize = (event: any) => {
        if (draggingId.current !== null) {
            const id = draggingId.current;
            if (!lastDragPos.current) {
                lastDragPos.current = event.clientX;
            }

            if (event.clientX < lastDragPos?.current) {
                if (lastDragPos?.current - event.clientX >= 8) {
                    lastDragPos?.current = event.clientX;

                    let valuesChanged = false;
                    const movementSinceStart = dragStartPos.current - event.clientX;

                    const colorsBeforeCurrent = displayableItems
                        ?.filter((diValue, diIndex) => {
                            if (diIndex < id) {
                                return true;
                            }
                            return false;
                        })
                        .reverse();

                    const newDisplayableItems = displayableItems?.map((diValue, diIndex) => {
                        if (diValue && diIndex === id) {
                            if (diValue.width && diValue.width >= 16) {
                                // need to make sure it's 16 because we're going to decrease width
                                // by 8 pixels, and the minimum width is 8 pixels
                                if (dragStartWidth.current - movementSinceStart >= 8) {
                                    diValue.width = dragStartWidth.current - movementSinceStart;

                                    valuesChanged = true;
                                }
                            } else {
                                let needToShrinkColor = true;
                                colorsBeforeCurrent?.map((adjacentColor) => {
                                    if (needToShrinkColor) {
                                        if (adjacentColor) {
                                            if (adjacentColor.width && adjacentColor.width >= 16) {
                                                // need to make sure it's 16 because we're going to decrease width
                                                // by 8 pixels, and the minimum width is 8 pixels
                                                adjacentColor.width = adjacentColor.width - 8;

                                                valuesChanged = true;
                                                needToShrinkColor = false;
                                            }
                                        }
                                    }
                                });
                            }
                        }
                        return diValue;
                    });

                    if (valuesChanged) {
                        setDisplayableItems(newDisplayableItems);
                        setBlockSettings({
                            ...blockSettings,
                            'color-input': newDisplayableItems,
                        });
                    }
                }
            }

            if (event.clientX > lastDragPos.current) {
                if (event.clientX - lastDragPos.current >= 8) {
                    lastDragPos.current = event.clientX;

                    let valuesChanged = false;
                    const movementSinceStart = event.clientX - dragStartPos.current;

                    const colorsAfterCurrent = displayableItems?.filter((diValue, diIndex) => {
                        if (diIndex > id) {
                            return true;
                        }
                        return false;
                    });

                    const newDisplayableItems = displayableItems?.map((diValue, diIndex) => {
                        if (canExpandColorBlock()) {
                            if (diIndex === id) {
                                diValue.width = dragStartWidth.current + movementSinceStart;

                                valuesChanged = true;
                            }
                        } else {
                            let needToShrinkColor = true;
                            colorsAfterCurrent?.map((adjacentColor) => {
                                if (needToShrinkColor) {
                                    if (adjacentColor) {
                                        if (adjacentColor.width && adjacentColor.width >= 16) {
                                            // need to make sure it's 16 because we're going to decrease width
                                            // by 8 pixels, and the minimum width is 8 pixels
                                            adjacentColor.width = adjacentColor.width - 8;

                                            valuesChanged = true;
                                            needToShrinkColor = false;
                                        }
                                    }
                                }
                            });
                        }
                        return diValue;
                    });
                    if (valuesChanged) {
                        setDisplayableItems(newDisplayableItems);
                        setBlockSettings({
                            ...blockSettings,
                            'color-input': newDisplayableItems,
                        });
                    }
                }
            }
        }
    };

    const onResizeEvenly = () => {
        setBlockSettings({ ...blockSettings, 'color-input': resizeEvenly(displayableItems) });
    };

    const onAddColor = () => {
        setIsColorPickerOpen(true);
    };

    const listId = useMemoizedId();

    return (
        <>
            <div
                data-test-id="color-scale-block"
                className={`color-scale-block tw-rounded-md tw-overflow-visible tw-mb-4 ${
                    isEditing ? 'editing' : ''
                } tw-w-full tw-flex tw-h-[${colorScaleHeight}]`}
                ref={colorScaleBlockRef}
                // Note: onMouseUp and onResize are defined here intentionally, instead of being in the DragHandle component.
                // The reason for this is that the dragging feature stops working if I move these to DragHandle,
                // perhaps because the component is being destroyed on every re-render and causing issues with dragging.
                // The 'onResizeStart' method, on the other hand, needs to stay in DragHandle, because it needs to
                // identify which color square is being resized.
                onMouseUp={onResizeStop}
                onMouseMove={onResize}
                draggable={true}
            >
                <DndProvider backend={HTML5Backend}>
                    {displayableItems &&
                        displayableItems.map((value: ColorProps, index: number) => {
                            let backgroundColorRgba;

                            if (value && value.color) {
                                backgroundColorRgba = `${value.color.red},${value.color.green},${value.color.blue},${value.color.alpha}`;
                            }

                            let width;

                            if (value && value.width) {
                                width = value.width;
                            } else {
                                width = calculateDefaultColorWidth(displayableItems.length);
                            }

                            return (
                                <div className="color-square tw-flex tw-relative" key={value.id}>
                                    {doesColorHaveRgbValues(value) ? (
                                        <>
                                            <DropZone
                                                key={`orderable-list-item-${value.id}-before`}
                                                currentColor={value}
                                                height={colorScaleHeight ? parseInt(colorScaleHeight) : 96}
                                                width={width}
                                                isDraggingActive={isDragging !== false}
                                                data={{
                                                    targetItem: value,
                                                    position: DropZonePosition.Before,
                                                }}
                                                onDrop={handleDrop}
                                                treeId={listId}
                                                before
                                            />
                                            <SquareWithColor
                                                id={value.id}
                                                index={index}
                                                width={isDragging === value.id ? 0 : width}
                                                height={colorScaleHeight}
                                                isDragging={isDragging}
                                                setIsDragging={setIsDragging}
                                                currentColor={value}
                                                backgroundColorRgba={backgroundColorRgba}
                                                totalNumberOfBlocks={displayableItems.length}
                                                onResizeStart={onResizeStart}
                                                calculateLeftPosition={calculateLeftPosition}
                                                isEditing={isEditing}
                                                editedColor={editedColor}
                                                setEditedColor={setEditedColor}
                                                updateColor={updateColor}
                                                setFormat={() => false}
                                                deleteColor={deleteColor}
                                                handleDrop={handleDrop}
                                                listId={listId}
                                            />
                                        </>
                                    ) : (
                                        <SquareWithoutColor
                                            id={value.id}
                                            sort={value.sort}
                                            index={index}
                                            placeholderColor={emptyBlockColors[index]}
                                            totalNumberOfBlocks={displayableItems.length}
                                            width={width}
                                            height={colorScaleHeight}
                                            currentSquare={value}
                                            onResizeStart={onResizeStart}
                                            calculateLeftPosition={calculateLeftPosition}
                                            isEditing={isEditing}
                                            editedColor={editedColor}
                                            setEditedColor={setEditedColor}
                                            updateColor={updateColor}
                                            setFormat={() => false}
                                            colorOptionsOpen={colorOptionsOpen}
                                            setColorOptionsOpen={setColorOptionsOpen}
                                            deleteColor={deleteColor}
                                            handleDrop={handleDrop}
                                            listId={listId}
                                        />
                                    )}
                                </div>
                            );
                        })}
                </DndProvider>
            </div>
            {isEditing ? (
                <div className="tw-text-right">
                    <ButtonGroup size={ButtonSize.Small}>
                        <Button
                            onClick={onResizeEvenly}
                            style={ButtonStyle.Secondary}
                            size={ButtonSize.Small}
                            icon={<IconArrowStretchBox12 />}
                            disabled={!displayableItems}
                        >
                            Resize Evenly
                        </Button>
                        <Button
                            onClick={onAddColor}
                            style={ButtonStyle.Secondary}
                            size={ButtonSize.Small}
                            icon={<IconPlus12 />}
                        >
                            Add Color
                        </Button>
                    </ButtonGroup>

                    <AddNewColor
                        isColorPickerOpen={isColorPickerOpen}
                        setIsColorPickerOpen={setIsColorPickerOpen}
                        editedColor={editedColor}
                        setEditedColor={setEditedColor}
                        colors={colorPickerPalette}
                        updateColor={updateColor}
                        setFormat={() => false}
                    />
                </div>
            ) : (
                <></>
            )}
        </>
    );
};
