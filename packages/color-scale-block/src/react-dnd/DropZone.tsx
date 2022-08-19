import React from 'react';
import { useDrop } from 'react-dnd';
import { DraggableItem, DropZonePosition, merge } from '@frontify/fondue';

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
    before?: boolean;
    after?: boolean;
};

export const DropZone = <T extends object>({ data, onDrop, children, treeId, before, after }: DropZoneProps<T>) => {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: treeId,
        drop: (item: any) => {
            onDrop?.(data.targetItem, item, data.position);
        },
        canDrop: (item: any) => {
            // can't drop an item on itself
            if (item.id === data.targetItem.id) {
                return false;
            }
            // otherwise anything can be dropped anywhere ATM
            return true;
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    const isActive = isOver && canDrop;
    const outerDropZoneClassNames = 'tw-w-[10px] tw-py-1 tw-outline-none tw-z-20';
    const activeOuterDropZoneClassNames = 'tw-border-violet-60 tw-border-2 tw-h-[96px] tw-w-7 tw-bg-clip-content';
    const bgColorClassName = 'tw-bg-violet-20';

    return (
        <div
            aria-hidden={!isActive}
            data-test-id="drop-zone"
            className={merge([
                'tw-transition-all tw-absolute tw-top-0 tw-bottom-0',
                before ? 'tw-left-0' : '',
                after ? 'tw-right-0' : '',
                data.position !== DropZonePosition.Within ? outerDropZoneClassNames : 'tw-h-auto',
                isActive && data.position !== DropZonePosition.Within ? activeOuterDropZoneClassNames : '',
                isActive && data.position === DropZonePosition.Within ? bgColorClassName : '',
            ])}
            ref={drop}
        >
            {children}
        </div>
    );
};
