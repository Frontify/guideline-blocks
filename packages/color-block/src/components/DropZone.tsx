/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useRef } from 'react';
import { XYCoord, useDrag, useDrop } from 'react-dnd';
import { motion } from 'framer-motion';
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

export const DropZone = ({ index, treeId, onDrop, children, colorBlockType, moveCard, isEditing }: DropZoneProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const [, drop] = useDrop({
        accept: treeId,
        drop: (item: { index: number }) => {
            onDrop?.(item.index);
        },
        hover(item: { index: number }, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();

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

    const [{ isDragging, initialOffset, currentOffset, test }, drag] = useDrag({
        type: treeId,
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            initialOffset: monitor.getInitialSourceClientOffset(),
            currentOffset: monitor.getSourceClientOffset(),
            test: monitor.getClientOffset(),
        }),
        canDrag: isEditing,
    });
    console.log('🚀 ~ DropZone ~ test', test);
    console.log('🚀 ~ DropZone ~ initialOffset', initialOffset);
    console.log('🚀 ~ DropZone ~ currentOffset', currentOffset);

    drag(drop(ref));

    const activeOuterDropZoneClassNames = merge([
        'tw-py-0 tw-bg-violet-20 tw-border-2 tw-border-dashed tw-border-violet-60 tw-rounded tw-bg-clip-content',
        colorBlockType === 'list' ? 'tw-h-[60px] tw-my-1 last:tw-border-b last:tw-border-black/[.1]' : 'tw-h-auto',
    ]);

    // if (!currentOffset || !initialOffset) {
    //     return null;
    // }

    // const x = currentOffset?.x - test?.x;
    const x = currentOffset?.x;
    console.log('🚀 ~ DropZone ~ x', x);
    // const y = currentOffset?.y - test?.y;
    const y = currentOffset?.y;
    console.log('🚀 ~ DropZone ~ y', y);

    return (
        <div
            ref={ref}
            className={merge(['tw-transition-all', isDragging ? activeOuterDropZoneClassNames : 'tw-h-auto'])}
        >
            <div data-test-id="drop-zone" className={isDragging ? 'tw-hidden' : ''}>
                <motion.div
                    initial={false}
                    animate={{
                        x,
                        y,
                    }}
                >
                    {children}
                </motion.div>
            </div>
        </div>
    );
};
