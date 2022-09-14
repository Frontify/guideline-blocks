/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from "react";
import { SquareWithoutColorProps } from "../types";
import { EditExistingColorModal } from "./EditExistingColorModal";
import { DragHandle } from "./DragHandle";
import { CustomizationOptionsModal } from "./CustomizationOptionsModal";
import { /*IconDrop, */ IconSize, IconAddSimple } from "@frontify/fondue";
import { DropZone } from "../react-dnd/DropZone";
import { DropZonePosition, ItemDragState } from "@frontify/fondue";
import { useDrag } from "react-dnd";

export const SquareWithoutColor: FC<SquareWithoutColorProps> = ({
    id,
    index,
    placeholderColor,
    totalNumOfBlocks,
    width,
    height,
    currentSquare,
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
    hovered,
    setHovered,
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
        canDrag: isEditing ? true : false,
    });

    return (
        <div
            style={{
                height: height,
                width: `${width}px`,
                left: `${calculateLeftPos(index, width)}px`,
            }}
            id={`row-${id}`}
            className={`hover:tw-z-30 row tw-pb-8 tw-inline-block tw-absolute`}
            onMouseEnter={(evt) => {
                const { id: targetId }: any = evt.target;
                if (hovered !== targetId) {
                    setHovered(parseInt(targetId.split("-")[1]));
                }
            }}
            onDragOver={(val) => {
                const { id: targetId }: any = val.target;
                if (hilite !== targetId) {
                    setHilite(parseInt(targetId.split("-")[1]));
                }
            }}
            key={id}
        >
            <div className="tw-z-0 tw-absolute tw-w-full tw-h-full tw-opacity-0 hover:tw-opacity-100"></div>

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
                // className={`tw-rounded-md tw-group tw-flex tw-justify-center tw-items-center tw-bg-black-10 tw-top-2 tw-absolute tw-border tw-border-white tw-mt-4 tw-mb-4 tw-w-full`}
                className={`tw-group tw-flex tw-justify-center tw-items-center tw-top-2 tw-absolute tw-border tw-border-white tw-w-full`}
            >
                {/* <DragHandle
                    id={id}
                    currentColor={currentSquare}
                    isEditing={isEditing}
                    onResizeStart={onResizeStart}
                /> */}
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
                    >
                        {/* <IconDrop size={IconSize.Size32} /> */}
                    </div>
                    {isEditing ? (
                        <div className="tw-rounded-md tw-hidden group-hover:tw-flex tw-justify-center tw-items-center tw-content-center tw-w-full tw-h-full">
                            {/* <div className="tw-rounded-md group-hover:tw-bg-white group-hover:tw-border group-hover:tw-border-black-30 group-hover:tw-border-dashed tw-hidden group-hover:tw-flex tw-justify-center tw-items-center tw-content-center tw-w-full tw-h-full"> */}
                            {/* <a
                            onClick={() => {
                                setEditedColor(id);
                            }}
                        >
                            <span className="tw-cursor-pointer tw-flex tw-items-center tw-justify-center tx-content-center">
                                <IconAddSimple size={IconSize.Size16} />
                                <span className="tw-font-sans tw-text-xs tw-font-thin">Add color</span>
                            </span>
                        </a>
                        <EditExistingColorModal
                            id={id}
                            index={index}
                            currentColor={currentSquare}
                            isEditing={isEditing}
                            colorPickerRef={colorPickerRef}
                            editedColor={editedColor}
                            setEditedColor={setEditedColor}
                            updateColor={updateColor}
                            setFormat={setFormat}
                        /> */}
                        </div>
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
