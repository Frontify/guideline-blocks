/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import { FC, useEffect, useRef, useState } from 'react';
import {
    AppBridgeBlock,
    FrontifyColorPalette,
    useBlockSettings,
    useColorPalettes,
    useEditorState,
} from '@frontify/app-bridge';
import { SquareWithColor } from './components/SquareWithColor';
import { ColorPickerFlyout } from './components/ColorPickerFlyout';
import { ColorPalette, ColorProps, Settings } from './types';
import {
    Button,
    ButtonGroup,
    ButtonSize,
    ButtonStyle,
    DropZonePosition,
    IconArrowStretchBox12,
    IconPlus12,
    useMemoizedId,
} from '@frontify/fondue';
import '@frontify/fondue-tokens/styles';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import 'tailwindcss/tailwind.css';
import { DropZone } from './react-dnd/DropZone';
import { EmptyView } from './components/EmptyView';
import { calculateDefaultColorWidth, calculateWidths, canExpandColorBlock, resizeEvenly } from './helpers';

type Props = {
    appBridge: AppBridgeBlock;
};

export const ColorScaleBlock: FC<Props> = ({ appBridge }) => {
    const { colorPalettes } = useColorPalettes(appBridge);
    const [colorPickerPalette, setColorPickerPalette]: [ColorPalette[], (color: ColorPalette[]) => void] = useState(
        [] as ColorPalette[]
    );
    const isEditing = useEditorState(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const [colorScaleHeight, setColorScaleHeight] = useState(
        blockSettings['customHeight'] ? blockSettings['heightInput'] : blockSettings['heightSlider']
    );
    const emptyBlockColors = ['#D5D6D6', '#DFDFDF', '#E8E9E9', '#F1F1F1', '#FAFAFA', '#FFFFFF'];
    const [currentlyDraggedColorId, setCurrentlyDraggedColorId]: [
        number | undefined,
        (color?: number | undefined) => void
    ] = useState();
    const [editedColor, setEditedColor] = useState<Nullable<ColorProps>>();
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
    const colorScaleBlockRef: { current?: HTMLDivElement } = useRef();
    const draggingId: { current?: number | null } = useRef(null);
    const dragStartPos: { current?: number | null | undefined } = useRef();
    const dragStartWidth: { current?: number | null | undefined } = useRef();
    const lastDragPos: { current?: number | null | undefined } = useRef();
    const minimumNumberOfColors = 1;
    const maximumNumberOfPlaceholderSquares = 6;

    const deleteColor = (id: number) => {
        const reorderedList = displayableItems?.filter((item: ColorProps) => item.id !== id);
        setBlockSettings({ ...blockSettings, 'color-input': reorderedList });
    };

    const updateColor = (newColor: ColorProps) => {
        // If appearAfter is true, it means that this is a new color square being added. The new square will appear after the index provided by `id`.

        let updatedColors = [...displayableItems];

        const addedFirstColor = displayableItems.filter((item) => item.color).length;

        if (!addedFirstColor) {
            updatedColors = [newColor];
        } else {
            updatedColors.push(newColor);
        }

        const colorsWithNewWidths = resizeEvenly(updatedColors, colorScaleBlockRef);

        setBlockSettings({
            ...blockSettings,
            'color-input': colorsWithNewWidths,
        });
        setDisplayableItems(colorsWithNewWidths);
    };

    const populatePlaceholderSquares = () => {
        // If the number of colors is less than the minimum amount defined in settings, add
        // however many color squares are needed to match the minimum.
        const colorsArray = blockSettings['color-input'] || [];
        let missingColors = 0;

        if (colorsArray.length < maximumNumberOfPlaceholderSquares) {
            missingColors = maximumNumberOfPlaceholderSquares - colorsArray.length;
            let colorsWithNewWidths;

            for (let i = 0; i < missingColors; i++) {
                colorsArray.push({});

                colorsWithNewWidths = calculateWidths(colorsArray, colorScaleBlockRef);
            }
            setBlockSettings({
                ...blockSettings,
                'color-input': colorsWithNewWidths,
            });
            setDisplayableItems(colorsWithNewWidths || []);
        }
    };

    const populateColorPickerPalettes = (inputPalettes: FrontifyColorPalette[]) => {
        const formattedPalettes: ColorPalette[] = [];

        for (const palette of inputPalettes) {
            if (palette && palette.colors) {
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
                formattedPalettes.push({
                    id: palette.id,
                    title: palette.name,
                    source: `#${palette.colors[0].hex}`,
                    colors,
                });
            }
        }
        setColorPickerPalette(formattedPalettes);
    };

    useEffect(() => {
        populateColorPickerPalettes(colorPalettes);
    }, [colorPalettes]);

    useEffect(() => {
        const currentHeight = blockSettings['customHeight']
            ? blockSettings['heightInput']
            : blockSettings['heightSlider'];

        if (colorScaleHeight !== currentHeight) {
            setColorScaleHeight(currentHeight);
        }

        if (colorScaleBlockRef && colorScaleBlockRef.current) {
            let addedFirstColor;
            if (blockSettings['color-input']) {
                addedFirstColor = blockSettings['color-input'].filter((item: ColorProps) =>
                    item.id ? true : false
                ).length;
            } else {
                addedFirstColor = false;
            }
            const minimumColors = addedFirstColor ? minimumNumberOfColors : maximumNumberOfPlaceholderSquares;

            try {
                if (blockSettings['color-input'] && blockSettings['color-input'].length >= minimumColors) {
                    let needToCalculateWidths;

                    blockSettings['color-input'].forEach((color: ColorProps) => {
                        needToCalculateWidths = !color || (color && !color.width);
                    });

                    if (needToCalculateWidths) {
                        const colorsWithNewWidths = calculateWidths(blockSettings['color-input'], colorScaleBlockRef);
                        setBlockSettings({
                            ...blockSettings,
                            'color-input': colorsWithNewWidths,
                        });
                        setDisplayableItems(colorsWithNewWidths);
                    } else {
                        return setDisplayableItems(blockSettings['color-input']);
                    }
                } else {
                    populatePlaceholderSquares();
                }
            } catch (error) {
                console.error(error);
            }
        }
    }, [blockSettings]);

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

    const onResize = (event: MouseEvent) => {
        if (draggingId.current !== null) {
            const id = draggingId.current;
            if (!lastDragPos.current) {
                lastDragPos.current = event.clientX;
            }

            if (event.clientX < lastDragPos?.current) {
                if (lastDragPos.current - event.clientX >= 8) {
                    lastDragPos.current = event.clientX;

                    let valuesChanged = false;

                    if (!dragStartPos.current) {
                        return;
                    }

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
                                if ((dragStartWidth.current ?? 0) - movementSinceStart >= 8) {
                                    diValue.width = (dragStartWidth.current ?? 0) - movementSinceStart;

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
                                    return adjacentColor;
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

                    const movementSinceStart = event.clientX - (dragStartPos.current ?? 0);

                    const colorsAfterCurrent = displayableItems?.filter((diValue, diIndex) => {
                        if (id && diIndex > id) {
                            return true;
                        }
                        return false;
                    });

                    const newDisplayableItems = displayableItems?.map((diValue, diIndex) => {
                        if (canExpandColorBlock(displayableItems, colorScaleBlockRef)) {
                            if (diIndex === id) {
                                diValue.width = (dragStartWidth.current ?? 0) + movementSinceStart;

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
                                return adjacentColor;
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
        setBlockSettings({ ...blockSettings, 'color-input': resizeEvenly(displayableItems, colorScaleBlockRef) });
    };

    const onAddColor = () => {
        setIsColorPickerOpen(true);
    };

    const handleDrop = (
        displayableItems: ColorProps[],
        targetItem: ColorProps,
        movedItem: ColorProps,
        position: DropZonePosition
    ) => {
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

        setBlockSettings({ ...blockSettings, 'color-input': updatedColors });
        setDisplayableItems(updatedColors);
    };

    const [displayableItems, setDisplayableItems] = useState(
        calculateWidths(blockSettings['color-input'], colorScaleBlockRef)
    );

    const listId = useMemoizedId();

    return (
        <>
            <div className="tw-w-full tw-p-px tw-mb-4 tw-border tw-border-line tw-rounded">
                <div
                    data-test-id="color-scale-block"
                    className={`tw-rounded-md tw-overflow-visible tw-flex tw-h-[${colorScaleHeight}]`}
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
                            displayableItems?.map((color: ColorProps, index: number) => {
                                let backgroundColorRgba;

                                if (color && color.color) {
                                    backgroundColorRgba = `${color.color.red},${color.color.green},${color.color.blue},${color.color.alpha}`;
                                }

                                let width;

                                if (color && color.width) {
                                    width = color.width;
                                } else {
                                    width = calculateDefaultColorWidth(displayableItems.length, colorScaleBlockRef);
                                }

                                console.log(width);

                                return (
                                    <div className="color-square tw-flex tw-relative" key={color.id}>
                                        <>
                                            {color.color ? (
                                                <>
                                                    <DropZone
                                                        key={`orderable-list-item-${color.id}-before`}
                                                        currentColor={color}
                                                        height={parseInt(colorScaleHeight)}
                                                        width={width}
                                                        isDraggingActive={Number.isInteger(currentlyDraggedColorId)}
                                                        data={{
                                                            targetItem: color,
                                                            position: DropZonePosition.Before,
                                                        }}
                                                        onDrop={handleDrop}
                                                        treeId={listId}
                                                        before
                                                    />
                                                    <SquareWithColor
                                                        id={color.id}
                                                        index={index}
                                                        width={currentlyDraggedColorId === color.id ? 0 : width}
                                                        height={colorScaleHeight}
                                                        isDragging={
                                                            currentlyDraggedColorId !== null &&
                                                            currentlyDraggedColorId !== undefined
                                                        }
                                                        setIsDragging={setCurrentlyDraggedColorId}
                                                        currentColor={color}
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
                                                <EmptyView
                                                    placeholderBackgroundColor={emptyBlockColors[index]}
                                                    totalNumberOfBlocks={displayableItems.length}
                                                    index={index}
                                                    width={width}
                                                    height={
                                                        blockSettings['customHeight']
                                                            ? blockSettings['heightInput']
                                                            : blockSettings['heightSlider']
                                                    }
                                                />
                                            )}
                                        </>
                                    </div>
                                );
                            })}
                    </DndProvider>
                </div>
            </div>

            {isEditing && (
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

                    <ColorPickerFlyout
                        isColorPickerOpen={isColorPickerOpen}
                        setIsColorPickerOpen={setIsColorPickerOpen}
                        editedColor={editedColor}
                        setEditedColor={setEditedColor}
                        colors={colorPickerPalette}
                        updateColor={updateColor}
                        setFormat={() => false}
                    />
                </div>
            )}
        </>
    );
};
