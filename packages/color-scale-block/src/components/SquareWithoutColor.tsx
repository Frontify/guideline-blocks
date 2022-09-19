/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from "react";
import { SquareWithoutColorProps } from "../types";
import { DropZone } from "../react-dnd/DropZone";
import { DropZonePosition, ItemDragState } from "@frontify/fondue";
import { useDrag } from "react-dnd";

export const SquareWithoutColor: FC<SquareWithoutColorProps> = ({
    id,
    index,
    placeholderColor,
    totalNumberOfBlocks,
    width,
    height,
    currentSquare,
    onResizeStart,
    calculateLeftPosition,
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
}) => {
    const [{}, drag] = useDrag({
        item: currentSquare,
        collect: (monitor: any) => ({
            componentDragState: monitor.isDragging()
                ? ItemDragState.Dragging
                : ItemDragState.Idle,
        }),
        type: listId,
        canDrag: isEditing,
    });

    return (
        <div
            style={{
                height: height,
                width: `${width}px`,
                left: 0,
            }}
            id={`row-${id}`}
            className={`hover:tw-z-30 row tw-pb-8 tw-inline-block`}
            key={id}
        >
            <div className="tw-z-0 tw-absolute tw-w-full tw-h-full tw-opacity-0 hover:tw-opacity-100"></div>

            <div
                style={{
                    height: height,
                    borderTopLeftRadius: index === 0 ? "3px" : "0px",
                    borderBottomLeftRadius: index === 0 ? "3px" : "0px",
                    borderTopRightRadius:
                        index === totalNumberOfBlocks - 1 ? "3px" : "0px",
                    borderBottomRightRadius:
                        index === totalNumberOfBlocks - 1 ? "3px" : "0px",
                    borderLeftWidth: index === 0 ? "1px" : "0px",
                    borderRightWidth:
                        index === totalNumberOfBlocks - 1 ? "1px" : "0px",
                    paddingTop: "1px",
                    paddingBottom: "1px",
                    paddingLeft: index === 0 ? "1px" : "0px",
                    paddingRight:
                        index === totalNumberOfBlocks - 1 ? "1px" : "0px",
                    borderColor: "#efecec",
                }}
                className={`tw-group tw-flex tw-justify-center tw-items-center tw-absolute tw-border tw-border-white tw-w-full`}
            >
                <DropZone
                    key={`orderable-list-item-${id}-before`}
                    data={{
                        targetItem: currentSquare,
                        position: DropZonePosition.Before,
                    }}
                    onDrop={handleDrop}
                    treeId={listId}
                    before
                />
                <div
                    className="tw-w-full tw-h-full"
                    style={{
                        backgroundColor: placeholderColor,
                    }}
                >
                    <div
                        className={`${
                            !isEditing ? "tw-hidden" : ""
                        } group-hover:tw-hidden tw-text-black-20`}
                    ></div>
                    {isEditing ? (
                        <div className="tw-rounded-md tw-hidden group-hover:tw-flex tw-justify-center tw-items-center tw-content-center tw-w-full tw-h-full"></div>
                    ) : (
                        <></>
                    )}
                </div>
                <DropZone
                    key={`orderable-list-item-${id}-after`}
                    data={{
                        targetItem: currentSquare,
                        position: DropZonePosition.After,
                    }}
                    onDrop={handleDrop}
                    after
                    treeId={listId}
                />
            </div>
            <div className="tw-h-8 tw-relative"></div>
        </div>
    );
};
