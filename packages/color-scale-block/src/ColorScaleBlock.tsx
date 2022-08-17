/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import { FC, Fragment, Key, useEffect, useRef, useState } from 'react';
import { AppBridgeNative, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { filterCompleteItems } from './helpers';
import { SquareWithColor } from './components/SquareWithColor';
import { SquareWithoutColor } from './components/SquareWithoutColor';
import { ColorProps } from './types';


import { DropZonePosition, OrderableListItem, useMemoizedId } from '@frontify/fondue';
import '@frontify/fondue-tokens/styles';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import 'tailwindcss/tailwind.css';
import { Draggable } from './components/Draggable';
import { Resizable } from './components/Resizable';
// import { DropZone } from './react-dnd/DropZone';

type Props = {
    appBridge: AppBridgeNative
};

export const ColorScaleBlock: FC<any> = ({ appBridge }) => {
    const isEditing = useEditorState(appBridge);
    //const [blockSettings, setBlockSettings] = useBlockSettings<any>(appBridge);
    const [blockSettings, setBlockSettings] = useState({ 'color-input': [{ color: { r: 0, g: 0, b: 0, a: 1} }] as ColorProps[] | null });
    const emptyBlockColors: string[] = [
        '#D5D6D6',
        '#DFDFDF',
        '#E8E9E9',
        '#F1F1F1',
        '#FAFAFA',
        '#FFFFFF',
    ];
    const [showCompleted] = useState(true);
    const [calculatedWidths, setCalculatedWidths] = useState(false);
    const [editedColor, setEditedColor]: any = useState();
    const colorOptionsRef: any = useRef();
    const colorScaleBlockRef: any = useRef();
    const colorPickerRef: any = useRef();

    const colorWidth = 100; // default color square width if all other calculations fail

    const calculateDefaultColorWidth = (arrLen: number) => {
        if (colorScaleBlockRef && colorScaleBlockRef.current) {
            const colorScaleBlockWidth = colorScaleBlockRef.current.getBoundingClientRect().width;
            const defaultWidth = colorScaleBlockWidth / arrLen;

            return defaultWidth;
        } else {
            return colorWidth;
        }
    };

    const calculateWidths = (itemList: ColorProps[]) => {
        let emptySpace = 0;
        let usedSpace = 0;
        let emptySquares = 0;
        let emptySquareWidth = 12;

        let itemsWithWidths: ColorProps[] = itemList?.map((value: ColorProps) => {
            if (colorScaleBlockRef && colorScaleBlockRef.current && (!value || (value && !value.width))) {
                emptySquares++;
                return value;
            }
            return value;
        });

        if (colorScaleBlockRef && colorScaleBlockRef.current) {
            const colorBlockWidth = colorScaleBlockRef.current.getBoundingClientRect().width;

            itemsWithWidths.map((value: ColorProps) => {
                if (value && value.width) {
                    usedSpace += value.width;
                }

                return value;
            });

            emptySpace = colorBlockWidth - usedSpace;

            emptySquareWidth = emptySpace / emptySquares;

            itemsWithWidths = itemsWithWidths.map((value: ColorProps) => {
                if (!value || (value && !value.width)) {
                    if (value) {
                        return { ...value, width: emptySquareWidth };
                    }
                    return { width: emptySquareWidth };
                }
                return value;
            });
        }

        if (emptySpace === 0) {
            itemsWithWidths = itemsWithWidths.map((value: ColorProps) => {
                if (!value || (value && !value.width)) {
                    if (value) {
                        return { ...value, width: calculateDefaultColorWidth(itemList.length) };
                    }
                    return { width: calculateDefaultColorWidth(itemList.length) };
                }
                return value;
            });
        }

        return itemsWithWidths || [];
    };

    const [displayableItems, setDisplayableItems] = useState(
        calculateWidths(
            isEditing || showCompleted
                ? blockSettings['color-input']
                : filterCompleteItems(blockSettings['color-input'])
        )
    );

    const [hilite, setHilite]: any = useState(false);
    const [hovered, setHovered]: any = useState(false);
    const [colorOptionsOpen, setColorOptionsOpen] = useState({});

    const dragStartPos: any = useRef();
    const dragStartWidth: any = useRef();
    const lastDragPos: any = useRef();

    const deleteColor = (id: any) => {
        const reorderedList = displayableItems.filter((item: ColorProps, index: Key) => index !== id);
        setBlockSettings({ ...blockSettings, 'color-input': reorderedList });
        setDisplayableItems(reorderedList);
    };

    const updateColor = (newColor: ColorProps, id: any, appearAfter?: boolean) => {
        // If appearAfter is true, it means that this is a new color square being added. The new square will appear after the index provided by `id`.

        let updatedColors = [...displayableItems];
        if (!appearAfter) {
            updatedColors = displayableItems.map((color, index) => {
                if (index === id) {
                    return { ...newColor, width: color.width };
                }
                return color;
            });
        } else {
            updatedColors.splice(id + 1, 0, newColor);
            setEditedColor(null);
        }

        const colorsWithNewWidths = calculateWidths(
            isEditing || showCompleted ? updatedColors : filterCompleteItems(updatedColors)
        );
        setBlockSettings({ ...blockSettings, 'color-input': colorsWithNewWidths });
        setDisplayableItems(colorsWithNewWidths);
    };

    // TODO: Make it possible to close modals by clicking anywhere outside.
    // The reason why these are commented out is because clicking anywhere inside the ColorPicker modal
    // was causing the modal to close, making it impossible to toggle specific settings within the color picker.

    // const handleClickOutside = (event: any) => {
    //     if (colorOptionsRef.current && !colorOptionsRef.current.contains(event.target)) {
    //         setColorOptionsOpen({});
    //     }
    //     return () => {
    //         document.removeEventListener('click', handleClickOutside, true);
    //     };
    // };

    // const handleClickOutsideColorPicker = (event: any) => {
    //     if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
    //         setEditedColor(null);
    //     }
    //     return () => {
    //         document.removeEventListener('click', handleClickOutsideColorPicker, true);
    //     };
    // };

    const calculateLeftPos = (index: number, width?: number) => {
        let leftPos = 0;
        const defaultWidth = width ? width : colorWidth;
        displayableItems.map((value: ColorProps, loopIndex: number) => {
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

        displayableItems.map((value: ColorProps) => {
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

    // This prevents a double image of the dragged element from appearing when drag is happening
    const removeDragGhostImage = (event: any) => {
        const img = new Image();
        // this is a transparent image
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
        event.dataTransfer.setDragImage(img, 0, 0);
    };

    const doesColorHaveRgbValues = (colorValue: ColorProps) => {
        if (colorValue && colorValue.color && colorValue.color.r && colorValue.color.g && colorValue.color.b) {
            return true;
        }
        return false;
    };

    useEffect(() => {
        // This runs every time blockSettings are changed.

        if (colorScaleBlockRef && colorScaleBlockRef.current) {
            let needToCalculateWidths = false;

            // This determines the minimum number of colors, and checks to see if a custom value is defined or if the settings is using slider values.

            // TODO: use real values later
            // const minimumColors = blockSettings['colorInputMinimumSwitch']
            //     ? parseInt(blockSettings['colorInputMinimum'])
            //     : parseInt(blockSettings['colorInputMinimumSlider']);
            const minimumColors = 6;

            try {
                // Check to see if we have the minimum number of color squares as defined in the settings.
                if (blockSettings['color-input'] && blockSettings['color-input'].length >= minimumColors) {
                    blockSettings['color-input'].map((value: ColorProps) => {
                        if (!value || (value && !value.width)) {
                            needToCalculateWidths = true;
                        }
                        return value;
                    });

                    if (needToCalculateWidths) {
                        const colorsWithNewWidths = calculateWidths(
                            isEditing || showCompleted
                                ? blockSettings['color-input']
                                : filterCompleteItems(blockSettings['color-input'])
                        );
                        setBlockSettings({ ...blockSettings, 'color-input': colorsWithNewWidths });
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

                        for (let i = 0; i < missingColors; i++) {
                            colorsArray.push(null);

                            const colorsWithNewWidths = calculateWidths(
                                isEditing || showCompleted ? colorsArray : filterCompleteItems(colorsArray)
                            );
                            setBlockSettings({ ...blockSettings, 'color-input': colorsWithNewWidths });
                            setDisplayableItems(colorsWithNewWidths);
                        }
                    }
                }
            } catch (e: any) {
                throw new Error(e);
            }
        }
    }, [blockSettings]);

    useEffect(() => {
        if (!calculatedWidths && colorScaleBlockRef && colorScaleBlockRef.current) {
            setCalculatedWidths(true);
            setDisplayableItems(
                calculateWidths(
                    isEditing || showCompleted
                        ? blockSettings['color-input']
                        : filterCompleteItems(blockSettings['color-input'])
                )
            );
        }

        // TODO: Make it possible to close modals by clicking anywhere outside.
        // The reason why these are commented out is because clicking anywhere inside the ColorPicker modal
        // was causing the modal to close, making it impossible to toggle specific settings within the color picker.

        // document.addEventListener('click', handleClickOutside, true);
        // document.addEventListener('click', handleClickOutsideColorPicker, true);
        document.addEventListener('dragstart', removeDragGhostImage, false);
        return () => {
            // document.removeEventListener('click', handleClickOutside);
            // document.removeEventListener('click', handleClickOutsideColorPicker);
            document.removeEventListener('dragstart', removeDragGhostImage);
        };
    });

    const draggingId: any = useRef(null);

    const onDragStop = () => {
        draggingId.current = null;
    };

    const onDragStart = (evt: any, id?: number, currentColor?: any) => {
        if (dragStartPos) {
            dragStartPos.current = evt.clientX;
            dragStartWidth.current = currentColor.width;
        }
        draggingId.current = id;
    };

    const onDrag = (evt: any) => {
        if (draggingId.current !== null) {
            const id = draggingId.current;
            if (!lastDragPos.current) {
                lastDragPos.current = evt.clientX;
            }

            if (evt.clientX < lastDragPos.current) {
                if (lastDragPos.current - evt.clientX >= 8) {
                    lastDragPos.current = evt.clientX;

                    let valuesChanged = false;
                    const movementSinceStart = dragStartPos.current - evt.clientX;

                    const colorsBeforeCurrent = displayableItems
                        .filter((diValue, diIndex) => {
                            if (diIndex < id) {
                                return true;
                            }
                            return false;
                        })
                        .reverse();

                    const newDisplayableItems = displayableItems.map((diValue, diIndex) => {
                        if (diValue && diIndex && diIndex === id) {
                            if (diValue.width && diValue.width >= 16) {
                                // need to make sure it's 16 because we're going to decrease width
                                // by 8 pixels, and the minimum width is 8 pixels
                                if (dragStartWidth.current - movementSinceStart >= 8) {
                                    diValue.width = dragStartWidth.current - movementSinceStart;

                                    valuesChanged = true;
                                }
                            } else {
                                let needToShrinkColor = true;
                                colorsBeforeCurrent.map((adjacentColor) => {
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
                    }
                }
            }

            if (evt.clientX > lastDragPos.current) {
                if (evt.clientX - lastDragPos.current >= 8) {
                    lastDragPos.current = evt.clientX;

                    let valuesChanged = false;
                    const movementSinceStart = evt.clientX - dragStartPos.current;

                    const colorsAfterCurrent = displayableItems.filter((diValue, diIndex) => {
                        if (diIndex > id) {
                            return true;
                        }
                        return false;
                    });

                    const newDisplayableItems = displayableItems.map((diValue, diIndex) => {
                        if (canExpandColorBlock()) {
                            if (diIndex === id) {
                                diValue.width = dragStartWidth.current + movementSinceStart;

                                valuesChanged = true;
                            }
                        } else {
                            let needToShrinkColor = true;
                            colorsAfterCurrent.map((adjacentColor) => {
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
                    }
                }
            }
        }
    };

    return (
        // <div>hello world</div>
        <div
            data-test-id="color-scale-block"
            style={{
                height: 140,
            }}
            className={`color-scale-block tw-rounded-md tw-overflow-visible tw-pb-5 tw-pb-8 tw-mb-4 ${
                isEditing ? 'editing' : ''
            } tw-w-full tw-flex`}
            ref={colorScaleBlockRef}
            // Note: onMouseUp and onDrag are defined here intentionally, instead of being in the DragHandle component.
            // The reason for this is that the dragging feature stops working if I move these to DragHandle,
            // perhaps because the component is being destroyed on every re-render and causing issues with dragging.
            // The 'onDragStart' method, on the other hand, needs to stay in DragHandle, because it needs to
            // identify which color square is being resized.
            onMouseUp={onDragStop}
            onDrag={onDrag}
            draggable={true}
        >
            <>
                {displayableItems.map((value: ColorProps, id: number) => {
                    let backgroundColorRgba;

                    if (value && value.color && value.color.r && value.color.g && value.color.b && value.color.a) {
                        backgroundColorRgba = `${value.color.r},${value.color.g},${value.color.b},${value.color.a}`;
                    }

                    let width;

                    if (value && value.width) {
                        width = value.width;
                    } else {
                        width = calculateDefaultColorWidth(displayableItems.length);
                    }

                    return (
                        <div key={id}>
                            {doesColorHaveRgbValues(value) ? (
                                <SquareWithColor
                                    id={id}
                                    width={width}
                                    currentColor={value}
                                    backgroundColorRgba={backgroundColorRgba}
                                    onDragStart={onDragStart}
                                    hilite={hilite}
                                    setHilite={setHilite}
                                    calculateLeftPos={calculateLeftPos}
                                    isEditing={isEditing}
                                    colorPickerRef={colorPickerRef}
                                    editedColor={editedColor}
                                    setEditedColor={setEditedColor}
                                    updateColor={updateColor}
                                    setFormat={() => false}
                                    colorOptionsRef={colorOptionsRef}
                                    colorOptionsOpen={colorOptionsOpen}
                                    setColorOptionsOpen={setColorOptionsOpen}
                                    deleteColor={deleteColor}
                                />
                            ) : (
                                <SquareWithoutColor
                                    id={id}
                                    placeholderColor={emptyBlockColors[id]}
                                    totalNumOfBlocks={displayableItems.length}
                                    width={width}
                                    currentSquare={value}
                                    onDragStart={onDragStart}
                                    hilite={hilite}
                                    setHilite={setHilite}
                                    calculateLeftPos={calculateLeftPos}
                                    isEditing={isEditing}
                                    colorPickerRef={colorPickerRef}
                                    editedColor={editedColor}
                                    setEditedColor={setEditedColor}
                                    updateColor={updateColor}
                                    setFormat={() => false}
                                    colorOptionsRef={colorOptionsRef}
                                    colorOptionsOpen={colorOptionsOpen}
                                    setColorOptionsOpen={setColorOptionsOpen}
                                    deleteColor={deleteColor}
                                    hovered={hovered}
                                    setHovered={setHovered}
                                />
                            )}
                        </div>
                    );
                })}
            </>
        </div>
    );
};
