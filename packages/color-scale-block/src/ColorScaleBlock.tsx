/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
    AppBridgeBlock,
    Color as AppBridgeColor,
    useBlockSettings,
    useColorPalettes,
    useEditorState,
} from '@frontify/app-bridge';
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
import { joinClassNames } from '@frontify/guideline-blocks-shared';

import { ColorSquare } from './components/ColorSquare';
import { ColorPickerFlyout } from './components/ColorPickerFlyout';
import { ColorProps, Settings } from './types';
import { EmptyView } from './components/EmptyView';
import { MINIMUM_COLOR_WIDTH, calculateDefaultColorWidth, canExpandColorBlock, resizeEvenly } from './helpers';

export type ColorScaleBlockProps = {
    appBridge: AppBridgeBlock;
};

const COLOR_SQUARE_FIRST_ELEMENT_CLASSES = 'tw-pl-[1px] tw-pr-[1px] tw-rounded-tl tw-rounded-bl';
const COLOR_SQUARE_LAST_ELEMENT_CLASSES = 'tw-rounded-tr tw-rounded-br';

export const ColorScaleBlock = ({ appBridge }: ColorScaleBlockProps) => {
    const { colorPalettes: appBridgePalettes } = useColorPalettes(appBridge);
    const [colorPickerPalettes, setColorPickerPalettes] = useState<Palette[]>([]);
    const isEditing = useEditorState(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const [currentlyDraggedColorId, setCurrentlyDraggedColorId] = useState<Nullable<number>>(null);
    const [isColorPickerOpen, setIsColorPickerOpen] = useState<boolean>(false);
    const [displayableItems, setDisplayableItems] = useState<ColorProps[]>(blockSettings.colorInput ?? []);
    const colorScaleBlockRef = useRef<HTMLDivElement>(null);
    const resizedColorIndex = useRef<Nullable<number>>();
    const resizeStartPos = useRef<Nullable<number>>();
    const resizeStartWidth = useRef<Nullable<number>>();
    const lastDragPos = useRef<Nullable<number>>();
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
        const reorderedList = displayableItems.filter((item) => item.id !== id);
        setBlockSettings({ ...blockSettings, colorInput: reorderedList });
        setDisplayableItems(reorderedList);
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

        if (colorScaleBlockRef.current === null) {
            return;
        }

        const updateColors = displayableItems.map((item) => ({ ...item }));

        const blockWidth = colorScaleBlockRef.current.getBoundingClientRect().width;
        const takenWidth = displayableItems.reduce((prevWidth, item) => prevWidth + item.width, 0);
        const availableSpace = blockWidth - takenWidth;
        let newColorWidth = availableSpace;

        if (availableSpace < MINIMUM_COLOR_WIDTH * 2) {
            // check if sibling color has min width
            const resizedSiblingColorIndex = updateColors.findIndex((color) => color.width >= MINIMUM_COLOR_WIDTH * 2);

            if (resizedSiblingColorIndex === -1) {
                return;
            }

            updateColors[resizedSiblingColorIndex].width -= MINIMUM_COLOR_WIDTH * 2;
            newColorWidth = MINIMUM_COLOR_WIDTH * 2;
        }

        updateColors.push({ ...flyoutColor, width: newColorWidth, id });

        if (updateColors.length === 2 && blockWidth) {
            updateColors[0].width = blockWidth / 2;
            updateColors[1].width = blockWidth / 2;
        }

        setDisplayableItems(updateColors);
        setBlockSettings({
            ...blockSettings,
            colorInput: updateColors,
        });
    };

    const handleResizeStop = () => {
        resizedColorIndex.current = null;

        clearTimeout(timerToUpdateBlockSettings.current);
        timerToUpdateBlockSettings.current = setTimeout(() => {
            setBlockSettings({
                ...blockSettings,
                colorInput: displayableItems,
            });
        }, 500);
    };

    const handleResizeStart = (event: MouseEvent, index: number): void => {
        resizeStartPos.current = event.clientX;

        resizeStartWidth.current = displayableItems[index].width;

        resizedColorIndex.current = index;
    };

    const handleResize = (event: MouseEvent) => {
        const colorIndex = resizedColorIndex.current;

        if (colorIndex === null || colorIndex === undefined) {
            return;
        }

        if (!lastDragPos.current) {
            lastDragPos.current = event.clientX;
        }

        const resizingToTheLeft = event.clientX < lastDragPos.current;
        const resizingToTheRight = event.clientX > lastDragPos.current;

        if (resizingToTheLeft) {
            const displacement = lastDragPos.current - event.clientX;

            lastDragPos.current = event.clientX;

            if (!resizeStartPos.current) {
                return;
            }

            const movementSinceStart = resizeStartPos.current - event.clientX;

            const siblingNeedsShrinking = displayableItems[colorIndex].width <= MINIMUM_COLOR_WIDTH;

            const colorsBeforeCurrent = displayableItems?.filter((_, index) => index < colorIndex);

            const colorsBeforeCurrentColorThatCanBeResized = colorsBeforeCurrent.filter(
                (color) => color.width >= MINIMUM_COLOR_WIDTH
            );

            const resizedSiblingIndex = colorsBeforeCurrentColorThatCanBeResized.length - 1;

            const displayableItemsWithCurrentColorResized = displayableItems.map((color, index) => {
                if (index === colorIndex && !siblingNeedsShrinking && color.width > MINIMUM_COLOR_WIDTH) {
                    color.width = (resizeStartWidth.current ?? 0) - movementSinceStart;
                }
                return color;
            });

            if (!siblingNeedsShrinking) {
                setDisplayableItems(displayableItemsWithCurrentColorResized);

                return;
            }

            setDisplayableItems(
                displayableItemsWithCurrentColorResized.map((siblingColor, index) => {
                    if (siblingNeedsShrinking && index === resizedSiblingIndex) {
                        siblingColor.width -= displacement;
                    }
                    return siblingColor;
                })
            );
        }

        if (resizingToTheRight) {
            const displacement = event.clientX - lastDragPos.current;

            lastDragPos.current = event.clientX;

            const movementSinceStart = event.clientX - (resizeStartPos.current ?? 0);

            const freeSpaceExists = canExpandColorBlock(displayableItems, colorScaleBlockRef);

            const resizedSiblingIndex = displayableItems.findIndex(
                (color, index) => index > colorIndex && color.width >= MINIMUM_COLOR_WIDTH
            );

            const siblingsNeedShrinking = !freeSpaceExists && resizedSiblingIndex !== -1;

            const siblingsCannotBeResized = !freeSpaceExists && resizedSiblingIndex === -1;

            const canExpandCurrentColor = freeSpaceExists || siblingsNeedShrinking;

            const displayableItemsWithCurrentColorResized = displayableItems.map((color, index) => {
                if (canExpandCurrentColor && index === colorIndex) {
                    color.width = (resizeStartWidth.current ?? 0) + movementSinceStart;
                }

                return color;
            });

            if (!siblingsNeedShrinking) {
                setDisplayableItems(displayableItemsWithCurrentColorResized);

                return;
            }

            if (siblingsCannotBeResized) {
                return;
            }

            setDisplayableItems(
                displayableItemsWithCurrentColorResized.map((siblingColor, index) => {
                    if (index === resizedSiblingIndex) {
                        siblingColor.width -= displacement;
                    }

                    return siblingColor;
                })
            );
        }
    };

    const handleResizeEvenly = () => {
        const updatedColors = resizeEvenly(displayableItems, colorScaleBlockRef);
        setBlockSettings({ ...blockSettings, colorInput: updatedColors });
        setDisplayableItems(updatedColors);
    };

    const handleDrop = (targetItem: ColorProps, movedItem: ColorProps, position: DropZonePosition) => {
        const movedItemIndex = displayableItems.findIndex(({ id }) => id === movedItem.id);

        const updatedColors = displayableItems.filter((_, index) => index !== movedItemIndex);

        const targetItemIndex = updatedColors.findIndex(({ id }) => id === targetItem.id);

        updatedColors.splice(position === 'after' ? targetItemIndex + 1 : targetItemIndex, 0, movedItem);

        setBlockSettings({ ...blockSettings, colorInput: updatedColors });
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
            >
                <div
                    style={{
                        height: colorScaleHeight,
                    }}
                    className={'tw-overflow-hidden tw-rounded tw-flex tw-max-w-full'}
                    // Note: onMouseUp and handleResize are defined here intentionally, instead of being in the DragHandle component.
                    // The reason for this is that the dragging feature stops working if I move these to DragHandle,
                    // perhaps because the component is being destroyed on every re-render and causing issues with dragging.
                    // The 'handleResizeStart' method, on the other hand, needs to stay in DragHandle, because it needs to
                    // identify which color square is being resized.
                    onMouseUp={handleResizeStop}
                    onMouseLeave={!blockSettings?.cypressTest ? handleResizeStop : undefined}
                    onMouseMove={handleResize}
                    draggable
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
                                    />
                                </div>
                            );
                        })}

                        {displayableItems.length === 0 && (
                            <EmptyView
                                height={
                                    blockSettings.customHeight ? blockSettings.heightInput : blockSettings.heightSlider
                                }
                            />
                        )}
                    </DndProvider>
                </div>
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
