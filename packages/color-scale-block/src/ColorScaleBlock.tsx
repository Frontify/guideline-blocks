/* (c) Copyright Frontify Ltd., all rights reserved. */

import "tailwindcss/tailwind.css";
import { FC, Fragment, Key, useEffect, useRef, useState } from "react";
import {
    AppBridgeBlock,
    useBlockSettings,
    useEditorState,
    useColorPalettes,
} from "@frontify/app-bridge";
import { filterCompleteItems } from "./helpers";
import { SquareWithColor } from "./components/SquareWithColor";
import { SquareWithoutColor } from "./components/SquareWithoutColor";
import { AddNewColor } from "./components/AddNewColor";
import { ColorProps } from "./types";

import {
    ButtonGroup,
    IconArrowStretchBox12,
    IconPlus12,
    DropZonePosition,
    OrderableListItem,
    useMemoizedId,
    Button,
    ButtonStyle,
    ButtonSize,
} from "@frontify/fondue";
import "@frontify/fondue-tokens/styles";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "tailwindcss/tailwind.css";
import { Draggable } from "./components/Draggable";
import { Resizable } from "./components/Resizable";
import { DropZone } from "./react-dnd/DropZone";

import { uuid } from "uuidv4";

type Props = {
    appBridge: AppBridgeBlock;
};

export const ColorScaleBlock: FC<any> = ({ appBridge }) => {
    const { colorPalettes } = useColorPalettes(appBridge);
    const [colorPickerPalette, setColorPickerPalette]: any = useState([]);
    const isEditing = useEditorState(appBridge);
    const [hoveredSquare, setHoveredSquare]: any = useState();
    const [blockSettings, setBlockSettings] = useBlockSettings<any>(appBridge);
    const [colorScaleHeight, setColorScaleHeight] = useState(
        blockSettings["customHeight"]
            ? blockSettings["heightInput"]
            : blockSettings["heightSlider"]
    );
    const [isDragging, setIsDragging]: any = useState(false);
    const emptyBlockColors: string[] = [
        "#D5D6D6",
        "#DFDFDF",
        "#E8E9E9",
        "#F1F1F1",
        "#FAFAFA",
        "#FFFFFF",
    ];
    const [showCompleted] = useState(true);
    const [calculatedWidths, setCalculatedWidths] = useState(false);
    const [editedColor, setEditedColor] = useState();
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
    const [nextEmptyColorIndex, setNextEmptyColorIndex]: any = useState(0);
    const colorOptionsRef: any = useRef();
    const colorScaleBlockRef: any = useRef();
    const colorPickerRef: any = useRef();

    const colorWidth = 100; // default color square width if all other calculations fail

    const postDrop = (updatedColors: ColorProps[]) => {
        setBlockSettings({ ...blockSettings, "color-input": updatedColors });
        setDisplayableItems(updatedColors);
    };

    const handleDrop = (
        targetItem: OrderableListItem,
        movedItem: OrderableListItem,
        position: DropZonePosition
    ) => {
        let movedItemIndex = 0,
            targetItemIndex = 0;

        let updatedColors = [...displayableItems];

        updatedColors.forEach((colorItem, index) => {
            if (colorItem.id === movedItem.id) {
                movedItemIndex = index;
            }
        });

        updatedColors = updatedColors.filter(
            (colorItem, index) => index !== movedItemIndex
        );

        updatedColors.forEach((colorItem, index) => {
            if (colorItem.id === targetItem.id) {
                targetItemIndex = index;
            }
        });

        if (position === "after") {
            updatedColors.splice(
                targetItemIndex + 1,
                0,
                movedItem as ColorProps
            );
        } else if (position === "before") {
            updatedColors.splice(targetItemIndex, 0, movedItem as ColorProps);
        }

        postDrop(updatedColors);
    };

    const calculateDefaultColorWidth = (arrLen: number) => {
        if (colorScaleBlockRef && colorScaleBlockRef.current) {
            const colorScaleBlockWidth =
                colorScaleBlockRef.current.getBoundingClientRect().width;
            const defaultWidth = colorScaleBlockWidth / arrLen;

            return defaultWidth;
        } else {
            return colorWidth;
        }
    };

    const resizeEvenly = () => {
        if (!displayableItems) {
            return;
        }

        const defaultWidth = calculateDefaultColorWidth(
            displayableItems.length
        );

        const newDisplayableItems = displayableItems.map((item, index) => {
            return { ...item, width: defaultWidth };
        });

        setBlockSettings({
            ...blockSettings,
            "color-input": newDisplayableItems,
        });
        setDisplayableItems(newDisplayableItems);
    };

    const calculateWidths = (itemList: ColorProps[]) => {
        let emptySpace = 0;
        let usedSpace = 0;
        let emptySquares = 0;
        let emptySquareWidth = 12;

        if (!itemList) {
            return;
        }

        let itemsWithWidths: ColorProps[] = itemList?.map(
            (value: ColorProps) => {
                if (
                    colorScaleBlockRef &&
                    colorScaleBlockRef.current &&
                    (!value || (value && !value.width))
                ) {
                    emptySquares++;
                    return value;
                }
                return value;
            }
        );

        if (!itemsWithWidths) {
            return;
        }

        if (colorScaleBlockRef && colorScaleBlockRef.current) {
            const colorBlockWidth =
                colorScaleBlockRef.current.getBoundingClientRect().width;

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
                    return {
                        id: value && value.id ? value.id : uuid(),
                        width: emptySquareWidth,
                        alt: "Click to drag",
                    };
                }
                return value;
            });
        }

        if (emptySpace === 0 && itemsWithWidths) {
            itemsWithWidths = itemsWithWidths?.map((value: ColorProps) => {
                if (!value || (value && !value.width)) {
                    if (value) {
                        return {
                            ...value,
                            width: calculateDefaultColorWidth(itemList.length),
                        };
                    }
                    return {
                        id: value && value.id ? value.id : uuid(),
                        width: calculateDefaultColorWidth(itemList.length),
                        alt: "Click to drag",
                    };
                }
                return value;
            });
        }

        return itemsWithWidths || [];
    };

    const [displayableItems, setDisplayableItems] = useState(
        calculateWidths(
            isEditing || showCompleted
                ? blockSettings["color-input"] || []
                : filterCompleteItems(blockSettings["color-input"])
        )
    );

    const [hilite, setHilite]: any = useState(false);
    const [hovered, setHovered]: any = useState(false);
    const [colorOptionsOpen, setColorOptionsOpen] = useState({});

    const dragStartPos: any = useRef();
    const dragStartWidth: any = useRef();
    const lastDragPos: any = useRef();

    const deleteColor = (id: any) => {
        const reorderedList = displayableItems.filter(
            (item: ColorProps, index: Key) => item.id !== id
        );
        setBlockSettings({ ...blockSettings, "color-input": reorderedList });
        setDisplayableItems(reorderedList);
    };

    const updateColor = (
        newColor: ColorProps,
        index: number,
        appearAfter?: boolean
    ) => {
        // If appearAfter is true, it means that this is a new color square being added. The new square will appear after the index provided by `id`.

        let updatedColors = [...displayableItems];
        if (!appearAfter) {
            updatedColors = displayableItems?.map((color, diindex) => {
                if (index === diindex) {
                    return { ...newColor, width: color.width };
                }
                return color;
            });
        } else {
            updatedColors.splice(index + 1, 0, newColor);
            // setEditedColor(null);
        }

        const colorsWithNewWidths = calculateWidths(
            isEditing || showCompleted
                ? updatedColors
                : filterCompleteItems(updatedColors)
        );

        setBlockSettings({
            ...blockSettings,
            "color-input": colorsWithNewWidths,
        });
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
        displayableItems?.map((value: ColorProps, loopIndex: number) => {
            if (loopIndex < index) {
                leftPos += value && value.width ? value.width : defaultWidth;
            }
            return value;
        });
        return leftPos;
    };

    const canExpandColorBlock = () => {
        const colorScaleBlockWidth =
            colorScaleBlockRef.current.getBoundingClientRect().width;
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

    // This prevents a double image of the dragged element from appearing when drag is happening
    const removeDragGhostImage = (event: any) => {
        const img = new Image();
        // this is a transparent image
        img.src =
            "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
        event.dataTransfer.setDragImage(img, 0, 0);
    };

    const doesColorHaveRgbValues = (colorValue: ColorProps) => {
        if (colorValue && colorValue.color) {
            return true;
        }
        return false;
    };

    const populateColorPickerPalettes = () => {
        const palettes: any[] = [];

        colorPalettes.forEach((palette) => {
            const colors = palette.colors.map((color) => {
                return {
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
                source: "#" + palette.colors[0].hex,
                colors: colors,
            });
        });

        setColorPickerPalette(palettes);
    };

    useEffect(() => {
        // This runs when colorPalettes gets populated.

        populateColorPickerPalettes();
    }, [colorPalettes]);

    useEffect(() => {
        const currentHeight = blockSettings["customHeight"]
            ? blockSettings["heightInput"]
            : blockSettings["heightSlider"];

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
            const minimumColors = 6;

            try {
                // Check to see if we have the minimum number of color squares as defined in the settings.
                if (
                    blockSettings["color-input"] &&
                    blockSettings["color-input"].length >= minimumColors
                ) {
                    blockSettings["color-input"].map((value: ColorProps) => {
                        if (!value || (value && !value.width)) {
                            needToCalculateWidths = true;
                        }
                        return value;
                    });

                    if (needToCalculateWidths) {
                        const colorsWithNewWidths = calculateWidths(
                            isEditing || showCompleted
                                ? blockSettings["color-input"]
                                : filterCompleteItems(
                                      blockSettings["color-input"]
                                  )
                        );
                        setBlockSettings({
                            ...blockSettings,
                            "color-input": colorsWithNewWidths,
                        });
                        setDisplayableItems(colorsWithNewWidths);
                    } else {
                        setDisplayableItems(blockSettings["color-input"]);
                    }
                } else {
                    // If the number of colors is less than the minimum amount defined in settings, add
                    // however many color squares are needed to match the minimum.
                    const colorsArray = blockSettings["color-input"] || [];
                    let missingColors = 0;

                    if (colorsArray.length < minimumColors) {
                        missingColors = minimumColors - colorsArray.length;

                        for (let i = 0; i < missingColors; i++) {
                            colorsArray.push(null);

                            const colorsWithNewWidths = calculateWidths(
                                isEditing || showCompleted
                                    ? colorsArray
                                    : filterCompleteItems(colorsArray)
                            );
                            setBlockSettings({
                                ...blockSettings,
                                "color-input": colorsWithNewWidths,
                            });
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
        let foundNextEmptySquare = false;

        if (displayableItems) {
            displayableItems.map((item, index) => {
                if (item && !item.color && foundNextEmptySquare === false) {
                    foundNextEmptySquare = true;
                    setNextEmptyColorIndex(index);
                }
            });

            if (!foundNextEmptySquare) {
                setNextEmptyColorIndex(false);
            }

            if (
                !calculatedWidths &&
                colorScaleBlockRef &&
                colorScaleBlockRef.current
            ) {
                setCalculatedWidths(true);
                setDisplayableItems(
                    calculateWidths(
                        isEditing || showCompleted
                            ? blockSettings["color-input"]
                            : filterCompleteItems(blockSettings["color-input"])
                    )
                );
            }
        }

        // TODO: Make it possible to close modals by clicking anywhere outside.
        // The reason why these are commented out is because clicking anywhere inside the ColorPicker modal
        // was causing the modal to close, making it impossible to toggle specific settings within the color picker.

        // document.addEventListener('click', handleClickOutside, true);
        // document.addEventListener('click', handleClickOutsideColorPicker, true);
        document.addEventListener("dragstart", removeDragGhostImage, false);
        return () => {
            // document.removeEventListener('click', handleClickOutside);
            // document.removeEventListener('click', handleClickOutsideColorPicker);
            document.removeEventListener("dragstart", removeDragGhostImage);
        };
    });

    const draggingId: any = useRef(null);

    const onResizeStop = () => {
        draggingId.current = null;
    };

    const onResizeStart = (evt: any, index?: number, currentColor?: any) => {
        if (dragStartPos) {
            dragStartPos.current = evt.clientX;
            dragStartWidth.current = currentColor.width;
        }
        draggingId.current = index;
    };

    const onResize = (evt: any) => {
        if (draggingId.current !== null) {
            const id = draggingId.current;
            if (!lastDragPos.current) {
                lastDragPos.current = evt.clientX;
            }

            if (evt.clientX < lastDragPos.current) {
                if (lastDragPos.current - evt.clientX >= 8) {
                    lastDragPos.current = evt.clientX;

                    let valuesChanged = false;
                    const movementSinceStart =
                        dragStartPos.current - evt.clientX;

                    const colorsBeforeCurrent = displayableItems
                        ?.filter((diValue, diIndex) => {
                            if (diIndex < id) {
                                return true;
                            }
                            return false;
                        })
                        .reverse();

                    const newDisplayableItems = displayableItems?.map(
                        (diValue, diIndex) => {
                            if (diValue && diIndex === id) {
                                if (diValue.width && diValue.width >= 16) {
                                    // need to make sure it's 16 because we're going to decrease width
                                    // by 8 pixels, and the minimum width is 8 pixels
                                    if (
                                        dragStartWidth.current -
                                            movementSinceStart >=
                                        8
                                    ) {
                                        diValue.width =
                                            dragStartWidth.current -
                                            movementSinceStart;

                                        valuesChanged = true;
                                    }
                                } else {
                                    let needToShrinkColor = true;
                                    colorsBeforeCurrent?.map(
                                        (adjacentColor) => {
                                            if (needToShrinkColor) {
                                                if (adjacentColor) {
                                                    if (
                                                        adjacentColor.width &&
                                                        adjacentColor.width >=
                                                            16
                                                    ) {
                                                        // need to make sure it's 16 because we're going to decrease width
                                                        // by 8 pixels, and the minimum width is 8 pixels
                                                        adjacentColor.width =
                                                            adjacentColor.width -
                                                            8;

                                                        valuesChanged = true;
                                                        needToShrinkColor =
                                                            false;
                                                    }
                                                }
                                            }
                                        }
                                    );
                                }
                            }
                            return diValue;
                        }
                    );

                    if (valuesChanged) {
                        setDisplayableItems(newDisplayableItems);
                        setBlockSettings({
                            ...blockSettings,
                            "color-input": newDisplayableItems,
                        });
                    }
                }
            }

            if (evt.clientX > lastDragPos.current) {
                if (evt.clientX - lastDragPos.current >= 8) {
                    lastDragPos.current = evt.clientX;

                    let valuesChanged = false;
                    const movementSinceStart =
                        evt.clientX - dragStartPos.current;

                    const colorsAfterCurrent = displayableItems.filter(
                        (diValue, diIndex) => {
                            if (diIndex > id) {
                                return true;
                            }
                            return false;
                        }
                    );

                    const newDisplayableItems = displayableItems.map(
                        (diValue, diIndex) => {
                            if (canExpandColorBlock()) {
                                if (diIndex === id) {
                                    diValue.width =
                                        dragStartWidth.current +
                                        movementSinceStart;

                                    valuesChanged = true;
                                }
                            } else {
                                let needToShrinkColor = true;
                                colorsAfterCurrent.map((adjacentColor) => {
                                    if (needToShrinkColor) {
                                        if (adjacentColor) {
                                            if (
                                                adjacentColor.width &&
                                                adjacentColor.width >= 16
                                            ) {
                                                // need to make sure it's 16 because we're going to decrease width
                                                // by 8 pixels, and the minimum width is 8 pixels
                                                adjacentColor.width =
                                                    adjacentColor.width - 8;

                                                valuesChanged = true;
                                                needToShrinkColor = false;
                                            }
                                        }
                                    }
                                });
                            }
                            return diValue;
                        }
                    );
                    if (valuesChanged) {
                        setDisplayableItems(newDisplayableItems);
                        setBlockSettings({
                            ...blockSettings,
                            "color-input": newDisplayableItems,
                        });
                    }
                }
            }
        }
    };

    const listId = useMemoizedId();

    return (
        <>
            <div
                data-test-id="color-scale-block"
                style={{
                    height: colorScaleHeight,
                }}
                className={`color-scale-block tw-rounded-md tw-overflow-visible tw-mb-4 ${
                    isEditing ? "editing" : ""
                } tw-w-full tw-flex`}
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
                        displayableItems.map(
                            (value: ColorProps, index: number) => {
                                let backgroundColorRgba;

                                if (value && value.color) {
                                    backgroundColorRgba = `${value.color.red},${value.color.green},${value.color.blue},${value.color.alpha}`;
                                }

                                let width;

                                if (value && value.width) {
                                    width = value.width;
                                } else {
                                    width = calculateDefaultColorWidth(
                                        displayableItems.length
                                    );
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
                                                    isHovered={hoveredSquare === value.id && isDragging !== false && isDragging !== value.id}
                                                    data={{
                                                        targetItem: value,
                                                        position:
                                                            DropZonePosition.Before,
                                                    }}
                                                    onDrop={handleDrop}
                                                    treeId={listId}
                                                    before
                                                />
                                                <SquareWithColor
                                                    id={value.id}
                                                    sort={value.sort}
                                                    index={index}
                                                    width={isDragging === value.id ? 0 : width}
                                                    height={colorScaleHeight}
                                                    isDragging={isDragging}
                                                    setIsDragging={setIsDragging}
                                                    currentColor={value}
                                                    backgroundColorRgba={
                                                        backgroundColorRgba
                                                    }
                                                    totalNumOfBlocks={
                                                        displayableItems.length
                                                    }
                                                    onResizeStart={
                                                        onResizeStart
                                                    }
                                                    hilite={hilite}
                                                    setHilite={setHilite}
                                                    calculateLeftPos={
                                                        calculateLeftPos
                                                    }
                                                    isEditing={isEditing}
                                                    colorPickerRef={
                                                        colorPickerRef
                                                    }
                                                    editedColor={editedColor}
                                                    setEditedColor={
                                                        setEditedColor
                                                    }
                                                    updateColor={updateColor}
                                                    setFormat={() => false}
                                                    colorOptionsRef={
                                                        colorOptionsRef
                                                    }
                                                    colorOptionsOpen={
                                                        colorOptionsOpen
                                                    }
                                                    setColorOptionsOpen={
                                                        setColorOptionsOpen
                                                    }
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
                                                placeholderColor={
                                                    emptyBlockColors[index]
                                                }
                                                totalNumOfBlocks={
                                                    displayableItems.length
                                                }
                                                width={width}
                                                height={colorScaleHeight}
                                                currentSquare={value}
                                                onResizeStart={onResizeStart}
                                                hilite={hilite}
                                                setHilite={setHilite}
                                                calculateLeftPos={
                                                    calculateLeftPos
                                                }
                                                isEditing={isEditing}
                                                colorPickerRef={colorPickerRef}
                                                editedColor={editedColor}
                                                setEditedColor={setEditedColor}
                                                updateColor={updateColor}
                                                setFormat={() => false}
                                                colorOptionsRef={
                                                    colorOptionsRef
                                                }
                                                colorOptionsOpen={
                                                    colorOptionsOpen
                                                }
                                                setColorOptionsOpen={
                                                    setColorOptionsOpen
                                                }
                                                deleteColor={deleteColor}
                                                hovered={hovered}
                                                setHovered={setHovered}
                                                handleDrop={handleDrop}
                                                listId={listId}
                                            />
                                        )}
                                    </div>
                                );
                            }
                        )}
                </DndProvider>
            </div>
            {isEditing ? (
                <div className="tw-text-right">
                    <ButtonGroup size={ButtonSize.Small}>
                        <Button
                            onClick={resizeEvenly}
                            style={ButtonStyle.Secondary}
                            size={ButtonSize.Small}
                            icon={<IconArrowStretchBox12 />}
                            disabled={!displayableItems}
                        >
                            Resize Evenly
                        </Button>
                        {nextEmptyColorIndex !== false ? (
                            <Button
                                onClick={() => {
                                    setIsColorPickerOpen(true);
                                }}
                                style={ButtonStyle.Secondary}
                                size={ButtonSize.Small}
                                icon={<IconPlus12 />}
                            >
                                Add Color
                            </Button>
                        ) : (
                            <></>
                        )}
                    </ButtonGroup>

                    <AddNewColor
                        isColorPickerOpen={isColorPickerOpen}
                        setIsColorPickerOpen={setIsColorPickerOpen}
                        editedColor={editedColor}
                        setEditedColor={setEditedColor}
                        colors={colorPickerPalette}
                        colorPickerRef={colorPickerRef}
                        newIndex={nextEmptyColorIndex}
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
