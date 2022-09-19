/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useDrag } from 'react-dnd';
import { FC } from 'react';
import { DropZonePosition, ItemDragState } from '@frontify/fondue';
import { SquareWithoutColorProps } from '../types';
import { DropZone } from '../react-dnd/DropZone';

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
            componentDragState: monitor.isDragging() ? ItemDragState.Dragging : ItemDragState.Idle,
        }),
        type: listId,
        canDrag: isEditing,
    });

    return (
        <div
            style={{
                height,
                width: `${width}px`,
                left: 0,
            }}
            id={`row-${id}`}
            className={'hover:tw-z-30 row tw-pb-8 tw-inline-block'}
            key={id}
        >
            <div className="tw-z-0 tw-absolute tw-w-full tw-h-full tw-opacity-0 hover:tw-opacity-100"></div>

            <div
                className={`tw-group tw-flex tw-justify-center tw-items-center tw-absolute tw-border tw-border-white tw-w-full tw-h-[${height}] tw-pt-[1px] tw-pb-[1px] tw-border-[#efecec]
                    tw-pl-[${index === 0 ? '1px' : '0px'}] tw-pr-[${index === totalNumberOfBlocks - 1 ? '1px' : '0px'}]
                     tw-rounded-tl-[${index === 0 ? '3px' : '0px'}]
                    tw-rounded-bl-[${index === 0 ? '3px' : '0px'}]
                    tw-rounded-tr-[${index === totalNumberOfBlocks - 1 ? '3px' : '0px'}]
                    tw-rounded-br-[${index === totalNumberOfBlocks - 1 ? '3px' : '0px'}]
                    tw-border-l-[${index === 0 ? '1px' : '0px'}]
                    tw-border-r-[${index === totalNumberOfBlocks - 1 ? '1px' : '0px'}]`}
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
                    <div className={`${!isEditing ? 'tw-hidden' : ''} group-hover:tw-hidden tw-text-black-20`}></div>
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
