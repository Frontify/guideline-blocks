/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC, useState } from "react";
import { SquareWithColorProps } from "../types";
import { AddNewColorModal } from "./AddNewColorModal";
import { AddNewColorTooltips } from "./AddNewColorTooltips";
import { EditExistingColorModal } from "./EditExistingColorModal";
import { DragHandle } from "./DragHandle";
import { CustomizationOptionsModal } from "./CustomizationOptionsModal";
import { IconTrash, IconSize, Tooltip } from "@frontify/fondue";
import { DropZone } from "../react-dnd/DropZone";
import {
    DropZonePosition,
    ItemDragState,
    TooltipAlignment,
    TooltipPosition,
} from "@frontify/fondue";
import { useDrag } from "react-dnd";

export const SquareWithColor: FC<SquareWithColorProps> = ({
    id,
    sort,
    index,
    width,
    height,
    currentColor,
    backgroundColorRgba,
    totalNumOfBlocks,
    onResizeStart,
    calculateLeftPos,
    highlight,
    setHighlight,
    isEditing,
    colorPickerRef,
    editedColor,
    setEditedColor,
    updateColor,
    setFormat,
    colorOptionsRef,
    colorOptionsOpen,
    setColorOptionsOpen,
    deleteColor,
    handleDrop,
    listId,
    setIsDragging,
    isDragging,
}) => {
    const [{}, drag] = useDrag({
        item: currentColor,
        collect: (monitor: any) => {
            return {
            componentDragState: monitor.isDragging()
                ? ItemDragState.Dragging
                : ItemDragState.Idle,
            }
        },
        type: listId,
        canDrag: isEditing ? true : false,
    });

    const rgbaToHex = (rgba: any, forceRemoveAlpha = false) => {
        return (
            "#" +
            rgba
                .replace(/^rgba?\(|\s+|\)$/g, "") // Get's rgba / rgb string values
                .split(",") // splits them at ","
                .filter(
                    (string: string, index: number) =>
                        !forceRemoveAlpha || index !== 3
                )
                .map((string: string) => parseFloat(string)) // Converts them to numbers
                .map((number: number) => number.toString(16)) // Converts numbers to hex
                .map((string: string) =>
                    string.length === 1 ? "0" + string : string
                ) // Adds 0 when length of one number is 1
                .join("")
        ); // Puts the array to togehter to a string
    };

    const copyToClipboard = async (text?: string) => {
        try {
            const toCopy = text || location.href;
            await navigator.clipboard.writeText(toCopy);
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };

    return (
        <div
            style={{
                height: height,
                width: `${width}px`,
                left: `${calculateLeftPos(index, width)}px`,
                display: "inline-block",
            }}
            id={`row-id-${id}-index-${index}`}
            className={`hover:tw-z-30 row tw-overflow-visible tw-pb-8 tw-inline-block`}
            onDragOver={(val) => {
                const { id: targetId }: any = val.target;
                if (highlight !== targetId) {
                    setHighlight(parseInt(targetId.split("-")[1]));
                }
            }}
            key={id}
        >
            <DragHandle
                index={index}
                currentColor={currentColor}
                isEditing={isEditing}
                onResizeStart={onResizeStart}
            />
            <div
                style={{
                    height: height,
                    borderTopLeftRadius: index === 0 ? "3px" : "0px",
                    borderBottomLeftRadius: index === 0 ? "3px" : "0px",
                    borderTopRightRadius:
                        index === totalNumOfBlocks - 1 ? "3px" : "0px",
                    borderBottomRightRadius:
                        index === totalNumOfBlocks - 1 ? "3px" : "0px",
                    borderLeftWidth: index === 0 ? "1px" : "0px",
                    borderRightWidth:
                        index === totalNumOfBlocks - 1 ? "1px" : "0px",
                    paddingTop: "1px",
                    paddingBottom: "1px",
                    paddingLeft: index === 0 ? "1px" : "0px",
                    paddingRight:
                        index === totalNumOfBlocks - 1 ? "1px" : "0px",
                    borderColor: "#efecec",
                }}
                ref={drag}
                draggable={true}
                onDrag={() => {
                    if (isDragging !== currentColor.id) {
                        setIsDragging(currentColor.id);
                    }
                }}
                onDragEnd={() => {
                    setIsDragging(false);
                }}
                className="tw-group tw-overflow-visible tw-top-2 tw-border tw-border-white tw-w-full hover:tw-border-black hover:tw-border"
            >
                <Tooltip
                    alignment={TooltipAlignment.Middle}
                    content={
                        <div>
                            <div>{currentColor.color.name}</div>
                            <div>
                                {rgbaToHex(
                                    `rgba(${currentColor.color.red}, ${currentColor.color.green}, ${currentColor.color.blue}, ${currentColor.color.alpha})`
                                ).toUpperCase()}
                            </div>
                            <a
                                href="#"
                                rel="noop noreferrer"
                                onClick={(evt) => {
                                    evt.preventDefault();

                                    copyToClipboard(
                                        rgbaToHex(
                                            `rgba(${currentColor.color.red}, ${currentColor.color.green}, ${currentColor.color.blue}, ${currentColor.color.alpha})`
                                        ).toUpperCase()
                                    );
                                }}
                                className="tw-opacity-50"
                            >
                                Click to copy
                            </a>
                        </div>
                    }
                    flip
                    heading=""
                    hoverDelay={200}
                    position={TooltipPosition.Bottom}
                    triggerElement={
                        <div
                            style={{
                                backgroundColor: `rgba(${backgroundColorRgba})`,
                                height: `${parseInt(height) - 4}px`
                            }}
                            className="tw-w-full tw-top-0 tw-left-0"
                        >
                            <CustomizationOptionsModal
                                id={id}
                                colorOptionsRef={colorOptionsRef}
                                colorOptionsOpen={colorOptionsOpen}
                                setColorOptionsOpen={setColorOptionsOpen}
                                isEditing={isEditing}
                                setEditedColor={setEditedColor}
                                deleteColor={deleteColor}
                            />
                        </div>
                    }
                    withArrow
                />
            </div>
        </div>
    );
};
