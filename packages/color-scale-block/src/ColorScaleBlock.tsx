/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import {
    AppBridgeBlock,
    FrontifyColor,
    FrontifyColorPalette,
    useBlockSettings,
    useColorPalettes,
    useEditorState,
} from '@frontify/app-bridge';
import { SquareWithColor } from './components/SquareWithColor';
import { ColorPickerFlyout } from './components/ColorPickerFlyout';
import { BlockColor, Settings } from './types';
import {
    Button,
    ButtonGroup,
    ButtonSize,
    ButtonStyle,
    Color,
    DropZonePosition,
    IconArrowStretchBox12,
    IconPlus12,
    Palette,
    useMemoizedId,
} from '@frontify/fondue';
import '@frontify/fondue-tokens/styles';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import 'tailwindcss/tailwind.css';
import { DropZone } from './dragAndDrop/DropZone';
import { EmptyView } from './components/EmptyView';
import {
    calculateDefaultColorWidth,
    calculateWidths,
    canExpandColorBlock,
    defaultColorSquareWidth,
    resizeEvenly,
} from './helpers';
import { MouseEventHandler } from 'react';

type Props = {
    appBridge: AppBridgeBlock;
};

export const ColorScaleBlock = ({ appBridge }: Props) => {
    const { colorPalettes: frontifyColorPalettes } = useColorPalettes(appBridge);
    const [frontifyColors, setFrontifyColors]: [FrontifyColor[], (frontifyColors: FrontifyColor[]) => void] = useState(
        [] as FrontifyColor[]
    );
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState(appBridge);

    const [colorPickerPalettes, setColorPickerPalettes]: [Palette[], (color: Palette[]) => void] = useState(
        [] as Palette[]
    );

    const [colorScaleHeight, setColorScaleHeight] = useState(
        blockSettings['customHeight'] ? blockSettings['heightInput'] : blockSettings['heightSlider']
    );

    const [currentlyDraggedColorId, setCurrentlyDraggedColorId]: [
        number | null | undefined,
        (value?: number | null | undefined) => void
    ] = useState();

    const [editedColor, setEditedColor]: [
        BlockColor | null | undefined,
        (color: BlockColor | null | undefined) => void
    ] = useState<Nullable<BlockColor>>();

    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
    const colorScaleBlockRef: { current: HTMLDivElement | null } = useRef(null);
    const draggingId: { current?: number | null | undefined } = useRef(null);
    const dragStartPos: { current?: number | null | undefined } = useRef();
    const dragStartWidth: { current?: number | null | undefined } = useRef();
    const lastDragPos: { current?: number | null | undefined } = useRef();
    const timerToUpdateBlockSettings: { current?: ReturnType<typeof setTimeout> | undefined } = useRef(undefined);
    const minimumNumberOfColors = 1;
    const maximumNumberOfPlaceholderSquares = 6;

    const deleteBlockColorById = (id: number | undefined) => {
        if (!id) {
            return;
        }

        const reorderedList = displayableItems?.filter((item: BlockColor) => item.id !== id);
        setBlockSettings({ ...blockSettings, colorInput: reorderedList });
    };

    const updateBlockColorByColor = (color: Color) => {
        const frontifyColor = findFrontifyColorByColor(color);

        if (!frontifyColor) {
            return;
        }

        const blockColor = createBlockColorByColorAndFrontifyColor(color, frontifyColor);

        const isFirstColor = displayableItems.filter((item) => !item.red || !item.green || !item.blue).length === 0;

        const colors = !isFirstColor ? [...displayableItems] : [];

        if (colors.findIndex((item) => item.id === blockColor.id) > -1) {
            return;
        }

        colors.push(blockColor);

        setBlockSettings({
            ...blockSettings,
            colorInput: calculateWidths(colors, colorScaleBlockRef, isFirstColor),
        });
    };

    const findFrontifyColorByColor = (color: Color): Nullable<FrontifyColor> => {
        const colorMach = frontifyColors.find(
            (frontifyColor: FrontifyColor) =>
                frontifyColor.red === color.red &&
                frontifyColor.green === color.green &&
                frontifyColor.blue === color.blue &&
                frontifyColor.alpha === color.alpha
        );

        return colorMach !== undefined ? colorMach : null;
    };

    const extractColorsByColorPalettes = (frontifyColorPalettes: FrontifyColorPalette[]): void => {
        const colors: FrontifyColor[] = [];

        for (const frontifyColorPalette of frontifyColorPalettes) {
            if (frontifyColorPalette && frontifyColorPalette.colors) {
                for (const frontifyColor of frontifyColorPalette.colors) {
                    colors.push(frontifyColor);
                }
            }
        }

        setFrontifyColors(colors);
    };

    const createBlockColorByColorAndFrontifyColor = (color: Color, frontifyColor: FrontifyColor): BlockColor => {
        return {
            id: frontifyColor.id,
            red: color.red,
            green: color.green,
            blue: color.blue,
            alpha: color.alpha,
            name: color.name,
        };
    };

    const mapFrontifyColorPalettesToPalettes = (frontifyColorPalettes: FrontifyColorPalette[]): Palette[] => {
        const palettes: Palette[] = [];

        for (const frontifyColorPalette of frontifyColorPalettes) {
            if (frontifyColorPalette && frontifyColorPalette.colors) {
                const colors = frontifyColorPalette.colors.map((color) => {
                    return {
                        alpha: color.alpha ?? 0,
                        red: color.red ?? 0,
                        green: color.green ?? 0,
                        blue: color.blue ?? 0,
                        name: color.name ?? '',
                    };
                });

                palettes.push({
                    id: frontifyColorPalette.id,
                    title: frontifyColorPalette.name,
                    colors,
                });
            }
        }
        return palettes;
    };

    const calculateLeftPosition = (index: number, width?: number) => {
        let leftPos = 0;
        const defaultWidth = width ? width : defaultColorSquareWidth;
        displayableItems?.map((color: BlockColor, loopIndex: number) => {
            if (loopIndex < index) {
                leftPos += color && color.width ? color.width : defaultWidth;
            }
            return color;
        });
        return leftPos;
    };

    useEffect(() => {
        setColorPickerPalettes(mapFrontifyColorPalettesToPalettes(frontifyColorPalettes));
        extractColorsByColorPalettes(frontifyColorPalettes);
    }, [frontifyColorPalettes]);

    useEffect(() => {
        const currentHeight = blockSettings['customHeight']
            ? blockSettings['heightInput']
            : blockSettings['heightSlider'];

        if (colorScaleHeight !== currentHeight) {
            setColorScaleHeight(currentHeight);
        }

        if (colorScaleBlockRef && colorScaleBlockRef.current) {
            let addedFirstColor;
            if (blockSettings.colorInput) {
                addedFirstColor = blockSettings.colorInput.filter((item: BlockColor) => !!item.id).length;
            } else {
                addedFirstColor = false;
            }
            const minimumColors = addedFirstColor ? minimumNumberOfColors : maximumNumberOfPlaceholderSquares;

            try {
                if (blockSettings.colorInput && blockSettings.colorInput.length >= minimumColors) {
                    let needToCalculateWidths = false;

                    for (const color of blockSettings.colorInput) {
                        needToCalculateWidths = !color || (color && !color.width);
                    }

                    if (needToCalculateWidths) {
                        const colorsWithNewWidths = calculateWidths(
                            blockSettings.colorInput,
                            colorScaleBlockRef,
                            false
                        );
                        setBlockSettings({
                            ...blockSettings,
                            colorInput: colorsWithNewWidths,
                        });
                        setDisplayableItems(colorsWithNewWidths);
                    } else {
                        return setDisplayableItems(blockSettings.colorInput);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
    }, [blockSettings, colorScaleHeight, setBlockSettings]);

    const handleResizeStop = () => {
        draggingId.current = null;
    };

    const handleResizeStart = (event: MouseEvent, index?: number, currentColor?: BlockColor): void => {
        if (dragStartPos) {
            dragStartPos.current = event.clientX;
            dragStartWidth.current = currentColor?.width;
        }
        draggingId.current = index;
    };

    const handleResize: MouseEventHandler = (event: MouseEvent) => {
        clearTimeout(timerToUpdateBlockSettings.current);

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
                        ?.filter((diValue, diIndex) => id !== undefined && diIndex < id)
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
                        timerToUpdateBlockSettings.current = setTimeout(() => {
                            setBlockSettings({
                                ...blockSettings,
                                colorInput: newDisplayableItems,
                            });
                        }, 1000);
                    }
                }
            }

            if (event.clientX > lastDragPos.current) {
                if (event.clientX - lastDragPos.current >= 8) {
                    lastDragPos.current = event.clientX;

                    let valuesChanged = false;

                    const movementSinceStart = event.clientX - (dragStartPos.current ?? 0);

                    const colorsAfterCurrent = displayableItems?.filter((diValue, diIndex) => !!(id && diIndex > id));

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
                        timerToUpdateBlockSettings.current = setTimeout(() => {
                            setBlockSettings({
                                ...blockSettings,
                                colorInput: newDisplayableItems,
                            });
                        }, 1000);
                    }
                }
            }
        }
    };

    const handleResizeEvenly = () => {
        setBlockSettings({ ...blockSettings, colorInput: resizeEvenly(displayableItems, colorScaleBlockRef) });
    };

    const handleDrop = (targetItem: BlockColor, movedItem: BlockColor, position: DropZonePosition) => {
        let targetItemIndex = 0;
        let movedItemIndex = 0;

        let updatedColors = [...displayableItems];

        movedItemIndex = updatedColors.findIndex((colorItem) => colorItem.id === movedItem.id);

        updatedColors = updatedColors.filter((colorItem, index) => index !== movedItemIndex);

        targetItemIndex = updatedColors.findIndex((colorItem) => colorItem.id === targetItem.id);

        updatedColors.splice(position === 'after' ? targetItemIndex + 1 : targetItemIndex, 0, movedItem);

        setBlockSettings({ ...blockSettings, colorInput: updatedColors });
        setDisplayableItems(updatedColors);
    };

    const handleColorPickerFlyoutTrigger = () => {
        setIsColorPickerOpen(!isColorPickerOpen);
    };

    const [displayableItems, setDisplayableItems] = useState(
        calculateWidths(blockSettings.colorInput, colorScaleBlockRef, false)
    );

    const listId = useMemoizedId();

    return (
        <>
            <div className="tw-w-full tw-p-px tw-mb-4 tw-border tw-border-line tw-rounded">
                <div
                    data-test-id="color-scale-block"
                    className={`tw-overflow-hidden tw-rounded tw-flex tw-h-[${colorScaleHeight}]`}
                    ref={colorScaleBlockRef}
                    // Note: onMouseUp and handleResize are defined here intentionally, instead of being in the DragHandle component.
                    // The reason for this is that the dragging feature stops working if I move these to DragHandle,
                    // perhaps because the component is being destroyed on every re-render and causing issues with dragging.
                    // The 'handleResizeStart' method, on the other hand, needs to stay in DragHandle, because it needs to
                    // identify which color square is being resized.
                    onMouseUp={handleResizeStop}
                    onMouseMove={handleResize}
                    draggable={true}
                >
                    <DndProvider backend={HTML5Backend}>
                        {displayableItems &&
                            displayableItems?.map((color: BlockColor, index: number) => {
                                let width;

                                if (color && color.width) {
                                    width = color.width;
                                } else {
                                    width = calculateDefaultColorWidth(displayableItems.length, colorScaleBlockRef);
                                }

                                const isFirst = index === 0;
                                const isLast = index === displayableItems.length - 1;

                                return (
                                    <div className="tw-flex tw-relative tw-h-full" key={color.id}>
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
                                            isDragging={currentlyDraggedColorId !== null}
                                            setCurrentlyDraggedColorId={setCurrentlyDraggedColorId}
                                            currentColor={color}
                                            totalNumberOfBlocks={displayableItems.length}
                                            onResizeStart={handleResizeStart}
                                            calculateLeftPosition={calculateLeftPosition}
                                            isEditing={isEditing}
                                            editedColor={editedColor}
                                            setEditedColor={setEditedColor}
                                            updateColor={updateBlockColorByColor}
                                            setFormat={() => false}
                                            deleteColor={deleteBlockColorById}
                                            isLast={isLast}
                                            isFirst={isFirst}
                                            handleDrop={handleDrop}
                                            listId={listId}
                                        />
                                    </div>
                                );
                            })}

                        {displayableItems.length === 0 && (
                            <EmptyView
                                height={
                                    blockSettings['customHeight']
                                        ? blockSettings['heightInput']
                                        : blockSettings['heightSlider']
                                }
                            />
                        )}
                    </DndProvider>
                </div>
            </div>

            {isEditing && (
                <div className="tw-text-right">
                    <ButtonGroup size={ButtonSize.Small}>
                        <Button
                            onClick={handleResizeEvenly}
                            style={ButtonStyle.Secondary}
                            size={ButtonSize.Small}
                            icon={<IconArrowStretchBox12 />}
                            disabled={!displayableItems}
                        >
                            Resize Evenly
                        </Button>
                        <ColorPickerFlyout
                            newIndex={displayableItems.length}
                            isColorPickerOpen={isColorPickerOpen}
                            setIsColorPickerOpen={setIsColorPickerOpen}
                            colorPalettes={colorPickerPalettes}
                            updateColor={updateBlockColorByColor}
                        >
                            <Button
                                onClick={handleColorPickerFlyoutTrigger}
                                style={ButtonStyle.Secondary}
                                size={ButtonSize.Small}
                                icon={<IconPlus12 />}
                            >
                                Add Color
                            </Button>
                        </ColorPickerFlyout>
                    </ButtonGroup>
                </div>
            )}
        </>
    );
};
