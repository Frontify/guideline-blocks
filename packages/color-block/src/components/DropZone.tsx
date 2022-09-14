import { XYCoord, useDrag, useDrop } from 'react-dnd';
import { merge } from '@frontify/fondue';
import { ColorBlockType } from '../types';
import { useRef } from 'react';

export type DropZoneProps = {
    onDrop?: (index: number) => void;
    treeId: string;
    children?: JSX.Element;
    colorBlockType: ColorBlockType;
    index: number;
    moveCard: (dragIndex: number, hoverIndex: number) => void;
    isEditing: boolean;
};

export const DropZone = ({ index, onDrop, children, colorBlockType, moveCard, isEditing }: DropZoneProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const [, drop] = useDrop({
        accept: 'test',
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

    const [{ isDragging }, drag] = useDrag({
        type: 'test',
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        canDrag: isEditing,
    });

    drag(drop(ref));

    const activeOuterDropZoneClassNames = merge([
        'tw-py-0 tw-bg-violet-20 tw-border-2 tw-border-dashed tw-border-violet-60 tw-rounded tw-bg-clip-content',
        colorBlockType === 'list' ? 'tw-h-[60px] tw-my-1 last:tw-border-b last:tw-border-black/[.1]' : 'tw-h-auto',
    ]);

    return (
        <div
            ref={ref}
            className={merge(['tw-transition-all', isDragging ? activeOuterDropZoneClassNames : 'tw-h-auto'])}
        >
            <div className={isDragging ? 'tw-hidden' : ''}>{children}</div>
        </div>
    );
};
