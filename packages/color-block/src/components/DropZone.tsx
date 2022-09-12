import { XYCoord, useDrag, useDrop } from 'react-dnd';
import { merge } from '@frontify/fondue';
import { ColorBlockType } from '../types';
import { useRef } from 'react';

export type OnDropCallback = (index: number) => void;

type DropZoneData = {
    colorId: number;
    index: number;
};

export type DropZoneProps = {
    data: DropZoneData;
    onDrop?: OnDropCallback;
    treeId: string;
    children?: JSX.Element;
    colorBlockType: ColorBlockType;
    index: number;
    moveCard: (dragIndex: number, hoverIndex: number) => void;
    isEditing: boolean;
};

export const DropZone = ({ index, onDrop, children, moveCard, isEditing }: DropZoneProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const [, drop] = useDrop({
        accept: 'test',
        drop: (item: any) => {
            onDrop?.(item);
        },
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
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

            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            // Determine mouse position
            const clientOffset = monitor.getClientOffset();

            // Get pixels to the top
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex);

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
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

    // const outerDropZoneClassNames = 'tw-my-[-5px] tw-h-[10px] tw-py-1 tw-outline-none tw-relative tw-z-20';
    const activeOuterDropZoneClassNames =
        'tw-h-[60px] tw-py-0 tw-my-1 tw-bg-violet-20 tw-border-2 tw-border-dashed tw-border-violet-60 tw-rounded tw-bg-clip-content';

    return (
        <div
            ref={ref}
            className={merge(['tw-transition-all', isDragging ? activeOuterDropZoneClassNames : 'tw-h-auto'])}
        >
            <div className={isDragging ? 'tw-hidden' : ''}>{children}</div>
        </div>
    );
};
