/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useDrag } from 'react-dnd';
import { FC } from 'react';
import { ItemDragState } from '@frontify/fondue';

interface DraggableProps {
    item: any;
    listId: any;
    dragDisabled: boolean;
}

export const Draggable: FC<DraggableProps> = ({ item, listId, dragDisabled }) => {
    const [{}, drag] = useDrag({
        item,
        collect: (monitor) => ({
            componentDragState: monitor.isDragging() ? ItemDragState.Dragging : ItemDragState.Idle,
        }),
        type: listId,
        canDrag: dragDisabled,
    });

    return <div ref={drag} className={`tw-w-full tw-h-[96px] tw-bg-black-${item.color}`}></div>;
};
