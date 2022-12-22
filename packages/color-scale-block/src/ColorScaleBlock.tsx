/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import { FC, MouseEvent, useEffect, useRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Color as AppBridgeColor, useBlockSettings, useColorPalettes, useEditorState } from '@frontify/app-bridge';
import {
    Button,
    ButtonEmphasis,
    ButtonGroup,
    ButtonSize,
    ButtonStyle,
    ButtonType,
    Color,
    DropZonePosition,
    IconArrowStretchBox12,
    IconPlus12,
    Palette,
} from '@frontify/fondue';
import '@frontify/fondue-tokens/styles';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { joinClassNames } from '@frontify/guideline-blocks-shared';

import { ColorSquare } from './components/ColorSquare';
import { ColorPickerFlyout } from './components/ColorPickerFlyout';
import { ColorProps, Settings } from './types';
import { EmptyView } from './components/EmptyView';
import {
    COLOR_SCALE_BLOCK_BORDER_WIDTH,
    COLOR_SCALE_BLOCK_OUTER_HORIZONTAL_PADDING,
    COLOR_SQUARE_SPACING,
    MINIMUM_COLOR_WIDTH,
    calculateDefaultColorWidth,
    resizeEvenly,
} from './helpers';

const COLOR_SQUARE_FIRST_ELEMENT_CLASSES = 'tw-pl-[1px] tw-pr-[1px] tw-rounded-tl tw-rounded-bl';
const COLOR_SQUARE_LAST_ELEMENT_CLASSES = 'tw-rounded-tr tw-rounded-br';

export const ColorScaleBlock: FC<BlockProps> = ({ appBridge }) => {
    const { colorPalettes: appBridgePalettes } = useColorPalettes(appBridge);
    const [colorPickerPalettes, setColorPickerPalettes] = useState<Palette[]>([]);
    const isEditing = useEditorState(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const [currentlyDraggedColorId, setCurrentlyDraggedColorId] = useState<Nullable<number>>(null);
    const [isColorPickerOpen, setIsColorPickerOpen] = useState<boolean>(false);
    const [displayableItems, setDisplayableItems] = useState<ColorProps[]>(blockSettings.colorInput ?? []);
    const colorScaleBlockRef = useRef<HTMLDivElement>(null);
    const colorScaleBlockInnerRef = useRef<HTMLDivElement>(null);
    const resizedColorIndex = useRef<Nullable<number>>();
    const resizeStartPos = useRef<Nullable<number>>();
    const resizeStartWidth = useRef<Nullable<number>>();
    const lastDragPos = useRef<Nullable<number>>();
    const [addColorDisabled, setAddColorDisabled] = useState(false);
    const positionWhereSiblingColorNeededResizing = useRef<number>(0);
    const originalSiblingColorWidthBeforeResizing = useRef<number>(0);
    const [draggedColorWidth, setDraggedColorWidth] = useState<Nullable<number>>(null);
    const resizedSiblingIndex = useRef<Nullable<number>>();
    const timerToUpdateBlockSettings = useRef<ReturnType<typeof setTimeout> | undefined>();

    useEffect(() => {
        setColorPickerPalettes(
            appBridgePalettes.map((palette) => {
                const colors = palette.colors.map((color) => {
                    return {
                        alpha: color.alpha ? color.alpha / 255 : 1,
                        red: color.red ?? 0,
                        green: color.green ?? 0,
                        blue: color.blue ?? 0,
                        name: color.name ?? '',
                    };
                });

                return {
                    id: palette.id,
                    title: palette.name,
                    colors,
                };
            })
        );
    }, [appBridgePalettes, appBridge]);

    const { customHeight, heightInput, heightSlider } = blockSettings;

    const getColorId = (selectedColor: Color) => {
        let color: AppBridgeColor | undefined;

        for (const palette of appBridgePalettes) {
            if (color) {
                break;
            }

            color = palette.colors.find(
                (paletteColor) =>
                    paletteColor.red === selectedColor.red &&
                    paletteColor.blue === selectedColor.blue &&
                    paletteColor.green === selectedColor.green
            );
        }

        // disabling it here because Flyout can not have color
        // that is outside of colorPalettes scope
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return color!.id;
    };

    const handleColorSquareDelete = (id: number) => {
        const colorListWithoutDeletedColor = displayableItems.filter((item) => item.id !== id);

        const newWidthForUnresizedColors = calculateNewWidthForColors(colorListWithoutDeletedColor);

        detectIfAddColorShouldBeDisabled(colorListWithoutDeletedColor);

        const updatedColors = colorListWithoutDeletedColor.map((color) => {
            if (!color.resized) {
                return {
                    ...color,
                    width: !color.resized && newWidthForUnresizedColors ? newWidthForUnresizedColors : color.width,
                };
            }
            return color;
        });

        setBlockSettings({ colorInput: updatedColors });
        setDisplayableItems(updatedColors);
    };

    const handleColorPickerClose = () => {
        setIsColorPickerOpen(false);
    };

    const handleAddNewColorToBlockSettings = (flyoutColor: Color) => {
        const id = getColorId(flyoutColor);

        const ColorExists = blockSettings.colorInput
            ? blockSettings.colorInput.some((color) => color.id === id)
            : false;

        if (ColorExists) {
            console.warn("can't add new color as color already exists");
            return;
        }

        const colorListWithNewColor = displayableItems.filter((color) => color);

        colorListWithNewColor.push({
            ...flyoutColor,
            width: MINIMUM_COLOR_WIDTH,
            resized: false,
            id,
        });

        const newWidthForUnresizedColors = calculateNewWidthForColors(colorListWithNewColor);

        detectIfAddColorShouldBeDisabled(colorListWithNewColor);

        const updatedColors = colorListWithNewColor.map((color) => {
            return {
                ...color,
                width: !color.resized && newWidthForUnresizedColors ? newWidthForUnresizedColors : color.width,
            };
        });

        setDisplayableItems(updatedColors);
        setBlockSettings({
            colorInput: updatedColors,
        });
    };

    const handleResizeStop = () => {
        resizedColorIndex.current = null;

        clearTimeout(timerToUpdateBlockSettings.current);
        timerToUpdateBlockSettings.current = setTimeout(() => {
            setBlockSettings({
                colorInput: displayableItems,
            });
        }, 500);

        positionWhereSiblingColorNeededResizing.current = 0;
        originalSiblingColorWidthBeforeResizing.current = 0;
    };

    const fillEmptySpace = (colorArray: ColorProps[]) => {
        const colorScaleBlockWidth =
            (colorScaleBlockRef?.current?.getBoundingClientRect().width ?? 0) -
            COLOR_SCALE_BLOCK_BORDER_WIDTH -
            COLOR_SCALE_BLOCK_OUTER_HORIZONTAL_PADDING;

        let pixelsTakenByColorSquares = 0;

        return colorArray.map((color, index) => {
            const lastColorInBlock = index === colorArray.length - 1;

            if (!lastColorInBlock) {
                pixelsTakenByColorSquares += color.width;
            } else {
                return {
                    ...color,
                    resized: color.resized,
                    width:
                        colorScaleBlockWidth -
                        pixelsTakenByColorSquares -
                        COLOR_SCALE_BLOCK_BORDER_WIDTH -
                        COLOR_SCALE_BLOCK_OUTER_HORIZONTAL_PADDING,
                };
            }

            return color;
        });
    };

    const handleResizeStart = (event: MouseEvent, index: number): void => {
        resizeStartPos.current = event.clientX;

        resizeStartWidth.current = displayableItems[index].width;

        resizedColorIndex.current = index;
    };

    const detectIfSquaresTooWide = (colorArray: ColorProps[]) => {
        const colorScaleBlockWidth =
            (colorScaleBlockRef?.current?.getBoundingClientRect().width ?? 0) -
            COLOR_SCALE_BLOCK_BORDER_WIDTH -
            COLOR_SCALE_BLOCK_OUTER_HORIZONTAL_PADDING -
            5;

        let pixelsTakenByColorSquares = 0;

        for (const color of colorArray) {
            pixelsTakenByColorSquares += color.width;
        }

        if (pixelsTakenByColorSquares >= colorScaleBlockWidth) {
            return true;
        }

        return false;
    };

    const getBlockWidthExcludingResizedColors = (colorArray: ColorProps[]) => {
        if (colorScaleBlockRef.current === null) {
            return;
        }

        let resizedColorsTotalWidth = 0;

        for (const color in colorArray) {
            if (colorArray[color].resized) {
                resizedColorsTotalWidth += colorArray[color].width + COLOR_SQUARE_SPACING;
            }
        }

        const blockWidth =
            colorScaleBlockRef.current.getBoundingClientRect().width - COLOR_SCALE_BLOCK_OUTER_HORIZONTAL_PADDING;

        const blockWidthExcludingResizedColors = blockWidth - resizedColorsTotalWidth;

        return blockWidthExcludingResizedColors;
    };

    const calculateNewWidthForColors = (colorArray: ColorProps[]) => {
        const blockWidthExcludingResizedColors = getBlockWidthExcludingResizedColors(colorArray);

        const unresizedColors = colorArray.filter((color) => !color.resized);

        const numberOfUnresizedColors = unresizedColors.length;

        const calculatedNewWidth = (blockWidthExcludingResizedColors ?? 0) / numberOfUnresizedColors;

        return calculatedNewWidth;
    };

    const handleResize = (event: MouseEvent) => {
        const colorIndex = resizedColorIndex.current;

        if (colorIndex === null || colorIndex === undefined) {
            return;
        }

        if (!lastDragPos.current) {
            lastDragPos.current = event.clientX;
        }

        if (resizeStartWidth.current === null || resizeStartWidth.current === undefined) {
            resizeStartWidth.current = MINIMUM_COLOR_WIDTH;
        }

        if (resizeStartWidth.current < MINIMUM_COLOR_WIDTH) {
            resizeStartWidth.current = MINIMUM_COLOR_WIDTH;
        }

        const resizingToTheLeft = event.clientX < lastDragPos.current;
        const resizingToTheRight = event.clientX > lastDragPos.current;

        if (resizingToTheLeft) {
            lastDragPos.current = event.clientX;

            if (!resizeStartPos.current) {
                return;
            }

            // const movementSinceStart = resizeStartPos.current - event.clientX;

            const siblingNeedsShrinking = displayableItems[colorIndex].width <= MINIMUM_COLOR_WIDTH;

            const colorsBeforeCurrent = displayableItems?.filter((_, index) => index < colorIndex);

            const colorsBeforeCurrentColorThatCanBeResized = colorsBeforeCurrent.filter(
                (color) => color.width >= MINIMUM_COLOR_WIDTH
            );

            const nextResizeableSiblingIndex = colorsBeforeCurrentColorThatCanBeResized.length - 1;

            if (nextResizeableSiblingIndex !== resizedSiblingIndex.current) {
                positionWhereSiblingColorNeededResizing.current = 0;
                originalSiblingColorWidthBeforeResizing.current = 0;
                resizedSiblingIndex.current = nextResizeableSiblingIndex;
            }

            // let movementSinceSiblingNeededResizing = 0;

            if (siblingNeedsShrinking && !positionWhereSiblingColorNeededResizing.current) {
                positionWhereSiblingColorNeededResizing.current = event.clientX;
                originalSiblingColorWidthBeforeResizing.current = displayableItems[nextResizeableSiblingIndex].width;
            }

            // movementSinceSiblingNeededResizing = positionWhereSiblingColorNeededResizing.current - event.clientX;

            const displayableItemsWithCurrentColorResized = displayableItems.map((color, index) => {
                if (index === colorIndex && !siblingNeedsShrinking && color.width > MINIMUM_COLOR_WIDTH) {
                    color.resized = true;

                    // const newWidth = (resizeStartWidth.current ?? 0) - movementSinceStart;

                    color.width -= 2;
                }

                return color;
            });

            detectIfAddColorShouldBeDisabled(displayableItemsWithCurrentColorResized);

            if (!siblingNeedsShrinking) {
                setDisplayableItems(fillEmptySpace(displayableItemsWithCurrentColorResized));

                return;
            }

            const displayableItemsWithLeftSiblingResized = displayableItemsWithCurrentColorResized.map(
                (siblingColor, index) => {
                    if (siblingNeedsShrinking && index === nextResizeableSiblingIndex) {
                        // const siblingWidth =
                        //     siblingColor.width >= MINIMUM_COLOR_WIDTH
                        //         ? originalSiblingColorWidthBeforeResizing.current - movementSinceSiblingNeededResizing
                        //         : MINIMUM_COLOR_WIDTH;
                        return {
                            ...siblingColor,
                            resized: false,
                            width: siblingColor.width - 2,
                        };
                    }

                    return siblingColor;
                }
            );

            setDisplayableItems(fillEmptySpace(displayableItemsWithLeftSiblingResized));
        }

        if (resizingToTheRight) {
            lastDragPos.current = event.clientX;

            // const movementSinceStart = event.clientX - (resizeStartPos.current ?? 0);

            // const colorScaleBlockInnerWidth = colorScaleBlockInnerRef?.current?.getBoundingClientRect().width ?? 0;

            // const colorScaleBlockWidth =
            //     (colorScaleBlockRef?.current?.getBoundingClientRect().width ?? 0) -
            //     COLOR_SCALE_BLOCK_BORDER_WIDTH -
            //     COLOR_SCALE_BLOCK_OUTER_HORIZONTAL_PADDING;

            const freeSpaceExists = detectIfSquaresTooWide(displayableItems) ? false : true;

            const nextResizeableSiblingIndex = displayableItems.findIndex(
                (color, index) => index > colorIndex && color.width >= MINIMUM_COLOR_WIDTH
            );

            if (nextResizeableSiblingIndex !== resizedSiblingIndex.current) {
                positionWhereSiblingColorNeededResizing.current = 0;
                originalSiblingColorWidthBeforeResizing.current = 0;
                resizedSiblingIndex.current = nextResizeableSiblingIndex;
            }

            const siblingNeedsShrinking = !freeSpaceExists && nextResizeableSiblingIndex !== -1;

            // let movementSinceSiblingNeededResizing = 0;

            if (siblingNeedsShrinking && !positionWhereSiblingColorNeededResizing.current) {
                positionWhereSiblingColorNeededResizing.current = event.clientX;
                originalSiblingColorWidthBeforeResizing.current = displayableItems[nextResizeableSiblingIndex].width;
            }

            // movementSinceSiblingNeededResizing = event.clientX - positionWhereSiblingColorNeededResizing.current;

            const siblingsCannotBeResized = !freeSpaceExists && nextResizeableSiblingIndex === -1;

            const canResizeToTheRight = freeSpaceExists || siblingNeedsShrinking;

            // if (!canResizeToTheRight) {
            //     return;
            // }

            const displayableItemsWithCurrentColorResized = displayableItems.map((color, index) => {
                if (canResizeToTheRight && index === colorIndex) {
                    // color.width = (resizeStartWidth.current ?? 0) + movementSinceStart;
                    color.width += 2;
                    color.resized = true;
                }

                return color;
            });

            detectIfAddColorShouldBeDisabled(displayableItemsWithCurrentColorResized);

            if (!siblingNeedsShrinking) {
                // if (detectIfSquaresTooWide(displayableItemsWithCurrentColorResized)) {
                //     handleResizeStop();
                //     return;
                // }

                setDisplayableItems(displayableItemsWithCurrentColorResized);

                return;
            }

            if (siblingsCannotBeResized) {
                return;
            }

            const displayableItemsWithRightSiblingResized = displayableItemsWithCurrentColorResized.map(
                (siblingColor, index) => {
                    if (index === nextResizeableSiblingIndex) {
                        // const siblingWidth =
                        //     siblingColor.width >= MINIMUM_COLOR_WIDTH
                        //         ? originalSiblingColorWidthBeforeResizing.current -
                        //           movementSinceSiblingNeededResizing -
                        //           COLOR_SQUARE_SPACING
                        //         : MINIMUM_COLOR_WIDTH;
                        return {
                            ...siblingColor,
                            resized: false,
                            width: siblingColor.width - 2,
                        };
                    }

                    return siblingColor;
                }
            );

            // if (detectIfSquaresTooWide(displayableItemsWithRightSiblingResized)) {
            //     handleResizeStop();
            //     return;
            // }

            setDisplayableItems(displayableItemsWithRightSiblingResized);
        }
    };

    const detectIfAddColorShouldBeDisabled = (colorArray: ColorProps[]) => {
        const blockWidthExcludingResizedColors = getBlockWidthExcludingResizedColors(colorArray) ?? 0;

        const noMoreRoomForAdditionalColor =
            blockWidthExcludingResizedColors / (colorArray.length + 1) < MINIMUM_COLOR_WIDTH;

        if (noMoreRoomForAdditionalColor && addColorDisabled === false) {
            setAddColorDisabled(true);
        }

        if (!noMoreRoomForAdditionalColor && addColorDisabled === true) {
            setAddColorDisabled(false);
        }
    };

    const handleResizeEvenly = () => {
        const updatedColors = resizeEvenly(displayableItems, colorScaleBlockRef);
        setBlockSettings({ colorInput: updatedColors });
        setDisplayableItems(updatedColors);
    };

    const handleDrop = (targetItem: ColorProps, movedItem: ColorProps, position: DropZonePosition) => {
        const movedItemIndex = displayableItems.findIndex(({ id }) => id === movedItem.id);

        const updatedColors = displayableItems.filter((_, index) => index !== movedItemIndex);

        const targetItemIndex = updatedColors.findIndex(({ id }) => id === targetItem.id);

        updatedColors.splice(position === 'after' ? targetItemIndex + 1 : targetItemIndex, 0, movedItem);

        setBlockSettings({ colorInput: updatedColors });
        setDisplayableItems(updatedColors);
    };

    const handleColorPickerFlyoutTrigger = () => {
        setIsColorPickerOpen(!isColorPickerOpen);
    };

    const colorScaleHeight = customHeight ? heightInput : heightSlider;

    return (
        <>
            <div
                ref={colorScaleBlockRef}
                data-test-id="color-scale-block"
                className="tw-w-full tw-p-px tw-mb-4 tw-border tw-border-line tw-rounded"
                style={{
                    height: `${parseInt(colorScaleHeight) + COLOR_SCALE_BLOCK_BORDER_WIDTH * 2}px`,
                }}
                onMouseLeave={!blockSettings?.cypressTest ? handleResizeStop : undefined}
                onMouseUp={handleResizeStop}
                onMouseMove={handleResize}
                draggable
            >
                {displayableItems.length > 0 && (
                    <div
                        ref={colorScaleBlockInnerRef}
                        style={{
                            height: colorScaleHeight,
                        }}
                        className="tw-rounded tw-w-full tw-flex"
                        // Note: onMouseUp and handleResize are defined here intentionally, instead of being in the DragHandle component.
                        // The reason for this is that the dragging feature stops working if I move these to DragHandle,
                        // perhaps because the component is being destroyed on every re-render and causing issues with dragging.
                        // The 'handleResizeStart' method, on the other hand, needs to stay in DragHandle, because it needs to
                        // identify which color square is being resized.
                    >
                        <DndProvider backend={HTML5Backend}>
                            {displayableItems.map((color: ColorProps, index: number) => {
                                const width = color.width
                                    ? color.width
                                    : calculateDefaultColorWidth(displayableItems.length, colorScaleBlockRef);

                                const isFirst = index === 0;
                                const isLast = index === displayableItems.length - 1;

                                return (
                                    <div
                                        data-test-id="color-wrapper"
                                        className="tw-pr-[1px] tw-flex tw-group tw-relative tw-h-full"
                                        key={color.id}
                                    >
                                        <ColorSquare
                                            id={color.id}
                                            index={index}
                                            width={currentlyDraggedColorId === color.id ? 0 : width}
                                            height={colorScaleHeight}
                                            className={joinClassNames([
                                                isFirst ? COLOR_SQUARE_FIRST_ELEMENT_CLASSES : '',
                                                isLast ? COLOR_SQUARE_LAST_ELEMENT_CLASSES : '',
                                            ])}
                                            color={color}
                                            onDrop={handleDrop}
                                            onDelete={handleColorSquareDelete}
                                            onResizeStart={handleResizeStart}
                                            canDragAndDrop={!resizedColorIndex.current}
                                            isEditing={isEditing}
                                            setCurrentlyDraggedColorId={setCurrentlyDraggedColorId}
                                            currentlyDraggedColorId={currentlyDraggedColorId}
                                            isLast={index === displayableItems.length - 1}
                                            setDraggedColorWidth={setDraggedColorWidth}
                                            draggedColorWidth={draggedColorWidth}
                                        />
                                    </div>
                                );
                            })}
                        </DndProvider>
                    </div>
                )}
                {displayableItems.length === 0 && (
                    <EmptyView
                        height={blockSettings.customHeight ? blockSettings.heightInput : blockSettings.heightSlider}
                    />
                )}
            </div>

            {isEditing && (
                <div data-test-id="color-scale-block-editor-mode-buttons" className="tw-text-right">
                    <ButtonGroup size={ButtonSize.Small}>
                        <Button
                            type={ButtonType.Button}
                            solid
                            inverted={false}
                            emphasis={ButtonEmphasis.Default}
                            onClick={handleResizeEvenly}
                            style={ButtonStyle.Default}
                            size={ButtonSize.Small}
                            icon={<IconArrowStretchBox12 />}
                            disabled={blockSettings?.colorInput?.length < 2}
                        >
                            Resize Evenly
                        </Button>
                        <ColorPickerFlyout
                            onAdd={handleAddNewColorToBlockSettings}
                            isOpen={isColorPickerOpen}
                            onClose={handleColorPickerClose}
                            colorPickerFlyoutPalettes={colorPickerPalettes}
                        >
                            <Button
                                type={ButtonType.Button}
                                solid
                                emphasis={ButtonEmphasis.Default}
                                onClick={handleColorPickerFlyoutTrigger}
                                style={ButtonStyle.Default}
                                inverted={false}
                                size={ButtonSize.Small}
                                icon={<IconPlus12 />}
                                disabled={addColorDisabled}
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
