/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useDrop } from 'react-dnd';
import { DraggableItem, DropZonePosition, OrderableListItem } from '@frontify/fondue';
import { joinClassNames } from '@frontify/guideline-blocks-shared';

import { DropZoneProps } from '../types';

export const DropZone = <T extends object>({
    data,
    currentColor,
    isDraggingActive,
    onDrop,
    children,
    treeId,
    height,
}: DropZoneProps<T>) => {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: treeId,
        drop: (item: OrderableListItem<T>) => {
            onDrop?.(data.targetItem as DraggableItem<T>, item, data.position);
        },
        canDrop: (item: OrderableListItem<T>) => {
            // can't drop an item on itself
            return !(item.id === data.targetItem.id);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    const width = currentColor && currentColor.width;

    const isActive = isOver && canDrop;

    // When dragging is active but this square is not being hovered over
    const isDraggingActiveClassNames = 'tw-absolute tw-w-full tw-z-[100]';

    // When no dragging is happening
    const outerDropZoneClassNames = 'tw-absolute tw-w-full tw-py-1 tw-outline-none';
    const isDraggingNotActiveClassNames = 'tw-z-[-1] tw-border-0';

    // When dragging is happening and another square is hovered over this one
    const activeOuterDropZoneClassNames = 'tw-absolute tw-z-[100] tw-h-[96px] tw-w-full tw-bg-clip-content';
    const bgColorClassName = 'tw-bg-violet-20';

    return (
        <>
            <div
                style={{
                    width: isActive ? `${parseInt(width)}px` : '0px',
                    height: `${height - 2}px`,
                }}
                className={joinClassNames([
                    'drop-zone-offset tw-relative tw-transition-all tw-rounded-[3px]',
                    bgColorClassName,
                    isActive && 'tw-border-violet-60 tw-border-dashed tw-border-2 tw-top-[0px] tw-m-[1px]',
                ])}
            ></div>

            <div
                aria-hidden={!isActive}
                data-test-id="drop-zone"
                className={joinClassNames([
                    'tw-top-[0px] tw-bottom-0 tw-h-full',
                    data.position !== DropZonePosition.Within ? outerDropZoneClassNames : 'tw-h-auto',
                    isActive && data.position !== DropZonePosition.Within && activeOuterDropZoneClassNames,
                    isActive && data.position === DropZonePosition.Within && bgColorClassName,
                    isDraggingActive ? isDraggingActiveClassNames : isDraggingNotActiveClassNames,
                ])}
                ref={drop}
            >
                {children}
            </div>
        </>
    );
};
