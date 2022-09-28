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
import { DropZone } from './dragAndDrop/DropZone';
import { EmptyView } from './components/EmptyView';
import {
    DEFAULT_COLOR_SQUARE_WIDTH,
    calculateDefaultColorWidth,
    calculateWidths,
    canExpandColorBlock,
    resizeEvenly,
} from './helpers';

type Props = {
    appBridge: AppBridgeBlock;
};

export const ColorScaleBlock = ({ appBridge }: Props) => {
    const { colorPalettes: frontifyColorPalettes } = useColorPalettes(appBridge);
    const [frontifyColors, setFrontifyColors] = useState<FrontifyColor[]>([] as FrontifyColor[]);
    const isEditing = useEditorState(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const [colorPickerPalettes, setColorPickerPalettes] = useState<Palette[]>([] as Palette[]);

    const [colorScaleHeight, setColorScaleHeight] = useState(
        blockSettings.customHeight ? blockSettings.heightInput : blockSettings.heightSlider
    );
    const [currentlyDraggedColorId, setCurrentlyDraggedColorId] = useState<number | null>();
    const [isColorPickerOpen, setIsColorPickerOpen] = useState<boolean>(false);
    const colorScaleBlockRef: { current: Nullable<HTMLDivElement> } = useRef(null);
    const draggingId: { current?: number | null } = useRef(null);
    const dragStartPos: { current?: number | null } = useRef();
    const dragStartWidth: { current?: number | null } = useRef();
    const lastDragPos: { current?: number | null } = useRef();
    const timerToUpdateBlockSettings: { current?: ReturnType<typeof setTimeout> } = useRef(undefined);

    const [blockColors, setBlockColors] = useState(blockSettings.colorInput ?? ([] as BlockColor[]));

    const deleteBlockColorById = (blockColorId: number) => {
        setBlockSettings({
            ...blockSettings,
            colorInput: blockColors.filter((blockColor: BlockColor) => blockColor.id !== blockColorId),
        });
    };

    const updateBlockColorByColor = (color: Color) => {
        const frontifyColor = findFrontifyColorByColor(color);

        if (!frontifyColor) {
            return;
        }

        const blockColor = createBlockColorByColorAndFrontifyColor(color, frontifyColor);

        if (isBlockColorAlreadyIncluded(blockColor)) {
            return;
        }

        setBlockSettings({
            ...blockSettings,
            colorInput: calculateWidths([...blockColors, blockColor], colorScaleBlockRef),
        });
    };

    const findFrontifyColorByColor = (color: Color): Nullable<FrontifyColor> => {
        const colorMach = frontifyColors.find(
            (frontifyColor) =>
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

    const isBlockColorAlreadyIncluded = (blockColor: BlockColor): boolean => {
        return blockColors.findIndex((existingBlockColor: BlockColor) => existingBlockColor.id === blockColor.id) > -1;
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
        const defaultWidth = width ?? DEFAULT_COLOR_SQUARE_WIDTH;
        blockColors.map((color: BlockColor, loopIndex: number) => {
            if (loopIndex < index) {
                leftPos += color?.width ? color.width : defaultWidth;
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
        setBlockColors(blockSettings.colorInput ?? ([] as BlockColor[]));

        const currentHeight = blockSettings.customHeight ? blockSettings.heightInput : blockSettings.heightSlider;

        if (colorScaleHeight !== currentHeight) {
            setColorScaleHeight(currentHeight);
        }
    }, [blockSettings, colorScaleHeight]);

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

    const handleResize = (event: MouseEvent) => {
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

                    const colorsBeforeCurrent = blockColors
                        .filter((diValue, diIndex) => id !== undefined && diIndex < id)
                        .reverse();

                    const newDisplayableItems = blockColors.map((diValue, diIndex) => {
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
                                for (const adjacentColor of colorsBeforeCurrent) {
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
                                }
                            }
                        }
                        return diValue;
                    });

                    if (valuesChanged) {
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

                    const colorsAfterCurrent = blockColors.filter((diValue, diIndex) => !!(id && diIndex > id));

                    const newDisplayableItems = blockColors.map((diValue, diIndex) => {
                        if (canExpandColorBlock(blockColors, colorScaleBlockRef)) {
                            if (diIndex === id) {
                                diValue.width = (dragStartWidth.current ?? 0) + movementSinceStart;

                                valuesChanged = true;
                            }
                        } else {
                            let needToShrinkColor = true;
                            for (const adjacentColor of colorsAfterCurrent) {
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
                            }
                        }
                        return diValue;
                    });
                    if (valuesChanged) {
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
        setBlockSettings({ ...blockSettings, colorInput: resizeEvenly(blockColors, colorScaleBlockRef) });
    };

    const handleDrop = (targetBlockColor: BlockColor, movedBlockColor: BlockColor, position: DropZonePosition) => {
        const updatedBlockColors = blockColors.filter((blockColor) => blockColor.id !== movedBlockColor.id);
        const targetBlockColorIndex = updatedBlockColors.findIndex(
            (blockColor) => blockColor.id === targetBlockColor.id
        );

        updatedBlockColors.splice(
            position === DropZonePosition.After ? targetBlockColorIndex + 1 : targetBlockColorIndex,
            0,
            movedBlockColor
        );

        setBlockSettings({ ...blockSettings, colorInput: updatedBlockColors });
    };

    const toggleColorPickerFlyout = () => {
        setIsColorPickerOpen(!isColorPickerOpen);
    };

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
                        {blockColors.length > 0 &&
                            blockColors.map((blockColor: BlockColor, index: number) => {
                                let width;

                                if (blockColor?.width) {
                                    width = blockColor.width;
                                } else {
                                    width = calculateDefaultColorWidth(blockColors.length, colorScaleBlockRef);
                                }

                                const isFirst = index === 0;
                                const isLast = index === blockColors.length - 1;

                                return (
                                    <div className="tw-flex tw-relative tw-h-full" key={blockColor.id}>
                                        <DropZone
                                            key={`orderable-list-item-${blockColor.id}-before`}
                                            currentColor={blockColor}
                                            height={parseInt(colorScaleHeight)}
                                            width={width}
                                            isDraggingActive={Number.isInteger(currentlyDraggedColorId)}
                                            data={{
                                                targetItem: blockColor,
                                                position: DropZonePosition.Before,
                                            }}
                                            onDrop={handleDrop}
                                            treeId={listId}
                                            before
                                        />

                                        <SquareWithColor
                                            index={index}
                                            width={currentlyDraggedColorId === blockColor.id ? 0 : width}
                                            height={colorScaleHeight}
                                            isDragging={currentlyDraggedColorId !== null}
                                            setCurrentlyDraggedColorId={setCurrentlyDraggedColorId}
                                            blockColor={blockColor}
                                            onResizeStart={handleResizeStart}
                                            calculateLeftPosition={calculateLeftPosition}
                                            isEditing={isEditing}
                                            deleteColor={deleteBlockColorById}
                                            isLast={isLast}
                                            isFirst={isFirst}
                                            handleDrop={handleDrop}
                                            listId={listId}
                                        />
                                    </div>
                                );
                            })}

                        {blockColors.length === 0 && <EmptyView height={colorScaleHeight} />}
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
                            disabled={blockColors.length === 0}
                        >
                            Resize Evenly
                        </Button>
                        <ColorPickerFlyout
                            newIndex={blockColors.length}
                            isColorPickerOpen={isColorPickerOpen}
                            setIsColorPickerOpen={setIsColorPickerOpen}
                            colorPalettes={colorPickerPalettes}
                            updateColor={updateBlockColorByColor}
                        >
                            <Button
                                onClick={toggleColorPickerFlyout}
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
