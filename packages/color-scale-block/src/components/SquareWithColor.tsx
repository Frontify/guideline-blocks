/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from "react";
import { SquareWithColorProps } from "../types";
import { AddNewColorModal } from "./AddNewColorModal";
import { AddNewColorTooltips } from "./AddNewColorTooltips";
import { EditExistingColorModal } from "./EditExistingColorModal";
import { DragHandle } from "./DragHandle";
import { CustomizationOptionsModal } from "./CustomizationOptionsModal";
import { IconTrash, IconSize, Tooltip } from "@frontify/fondue";
import { DropZone } from "../react-dnd/DropZone";
import { DropZonePosition, ItemDragState, TooltipAlignment, TooltipPosition, } from "@frontify/fondue";
import { useDrag } from "react-dnd";

export const SquareWithColor: FC<SquareWithColorProps> = ({
    id,
    sort,
    index,
    width,
    currentColor,
    backgroundColorRgba,
    totalNumOfBlocks,
    onResizeStart,
    calculateLeftPos,
    hilite,
    setHilite,
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
        item: currentColor,
        collect: (monitor: any) => ({
            componentDragState: monitor.isDragging()
                ? ItemDragState.Dragging
                : ItemDragState.Idle,
        }),
        type: listId,
        canDrag: isEditing ? true : false,
    });

    return (
        <div
            style={{
                height: 115,
                width: `${width}px`,
                left: `${calculateLeftPos(index, width)}px`,
                display: "inline-block",
            }}
            id={`row-${id}`}
            className={`hover:tw-z-30 row tw-absolute tw-overflow-visible tw-pb-8 tw-inline-block`}
            onDragOver={(val) => {
                const { id: targetId }: any = val.target;
                if (hilite !== targetId) {
                    setHilite(parseInt(targetId.split("-")[1]));
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
            <DropZone
                key={`orderable-list-item-${id}-before`}
                data={{
                    targetItem: currentColor,
                    position: DropZonePosition.Before,
                }}
                onDrop={handleDrop}
                treeId={listId}
                before
            />
            <Tooltip
                alignment={TooltipAlignment.Middle}
                content={
                    <span>
                        Click to copy
                    </span>
                }
                flip
                heading=""
                hoverDelay={200}
                position={TooltipPosition.Right}
                triggerElement={
                    <div
                        style={{
                            backgroundColor: `rgba(${backgroundColorRgba})`,
                            height: 93,
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
                        className="tw-group tw-overflow-visible tw-top-2 tw-absolute tw-border tw-border-white tw-mt-4 tw-mb-4 tw-w-full hover:tw-border-black hover:tw-border"
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
            <DropZone
                key={`orderable-list-item-${id}-after`}
                data={{
                    targetItem: currentColor,
                    position: DropZonePosition.After,
                }}
                onDrop={handleDrop}
                after
                treeId={listId}
            />
        </div>
    );
};
