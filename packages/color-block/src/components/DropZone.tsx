/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef, useRef } from 'react';
import { XYCoord, useDrag, useDrop } from 'react-dnd';
import { merge } from '@frontify/fondue';

import { ColorBlockType } from '../types';

export type DropZoneProps = {
    onDrop?: (index: number) => void;
    treeId: string;
    children?: JSX.Element;
    colorBlockType: ColorBlockType;
    index: number;
    moveCard: (dragIndex: number, hoverIndex: number) => void;
    isEditing: boolean;
};

export const DropZone = forwardRef<HTMLDivElement, DropZoneProps>(
    ({ index, treeId, onDrop, children, colorBlockType, moveCard, isEditing }, forwardedRef) => {
        const dropZoneRef = useRef<HTMLDivElement>(null);

        const [, drop] = useDrop({
            accept: treeId,
            drop: (item: { index: number }) => {
                onDrop?.(item.index);
            },
            hover(item: { index: number }, monitor) {
                if (!dropZoneRef.current) {
                    return;
                }
                const dragIndex = item.index;
                const hoverIndex = index;

                // Don't replace items with themselves
                if (dragIndex === hoverIndex) {
                    return;
                }

                // Determine rectangle on screen
                const hoverBoundingRect = dropZoneRef.current?.getBoundingClientRect();

                // Get horizontal middle
                const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

                // Get vertical middle
                const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

                // Determine mouse position
                const clientOffset = monitor.getClientOffset();

                // Get pixels to the left
                const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left;

                // Get pixels to the top
                const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

                if (colorBlockType === 'list') {
                    // Dragging downwards
                    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                        return;
                    }

                    // Dragging upwards
                    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                        return;
                    }
                } else {
                    // Dragging left
                    if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
                        return;
                    }

                    // Dragging right
                    if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
                        return;
                    }
                }

                moveCard(dragIndex, hoverIndex);

                item.index = hoverIndex;
            },
        });

        const [{ isDragging }, drag] = useDrag({
            type: treeId,
            item: { index },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
            canDrag: isEditing,
        });

        drag(drop(dropZoneRef));

        const activeOuterDropZoneClassNames = merge([
            'tw-py-0 tw-bg-violet-20 tw-border-2 tw-border-dashed tw-border-violet-60 tw-rounded tw-bg-clip-content',
            colorBlockType === 'list' ? 'tw-h-[60px] tw-my-1' : 'tw-h-full',
        ]);

        return (
            <div ref={forwardedRef} className="tw-h-full">
                <div
                    ref={dropZoneRef}
                    className={merge(['tw-transition-all', isDragging ? activeOuterDropZoneClassNames : 'tw-h-auto'])}
                >
                    <div data-test-id="drop-zone" className={isDragging ? 'tw-hidden' : ''}>
                        {children}
                    </div>
                </div>
            </div>
        );
    }
);

DropZone.displayName = 'DropZone';
