import { useDrag, useDrop } from 'react-dnd';
import { DraggableItem, DropZonePosition, merge } from '@frontify/fondue';
import { ColorBlockType } from '../types';
import { useRef } from 'react';

export type OnDropCallback<T> = (
    targetItem: DraggableItem<T>,
    sourceItem: DraggableItem<T>,
    position: DropZonePosition
) => void;

type DropZoneData<T> = {
    targetItem: DraggableItem<T>;
    position: DropZonePosition;
};

export type DropZoneProps<T> = {
    data: DropZoneData<T>;
    onDrop?: OnDropCallback<T>;
    treeId: string;
    children?: JSX.Element;
    colorBlockType: ColorBlockType;
    index: number;
    moveCard: (dragIndex: number, hoverIndex: number) => void;
    isEditing: boolean;
};

export const DropZone = <T extends object>({
    data,
    index,
    onDrop,
    children,
    moveCard,
    isEditing,
}: DropZoneProps<T>) => {
    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: 'test',
        drop: (item: any) => {
            console.log(item);
            onDrop?.(data.targetItem, item, data.sourceItem);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
        hover(item, monitor) {
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
            const hoverBoundingRect = ref.current.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
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
        'tw-h-[60px] tw-py-0 tw-my-0 tw-bg-violet-20 tw-border-2 tw-border-dashed tw-border-violet-60 tw-rounded tw-bg-clip-content';

    const opacity = isDragging ? 0 : 1;

    return (
        <div
            ref={ref}
            role="row"
            // className={merge([
            //     'tw-transition-all',
            //     data.position !== DropZonePosition.Within ? outerDropZoneClassNames : 'tw-h-auto',
            //     isActive && data.position !== DropZonePosition.Within ? activeOuterDropZoneClassNames : '',
            // ])}
        >
            {children}
        </div>
    );
};
