/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useDrop } from 'react-dnd';
import { joinClassNames } from '@frontify/guideline-blocks-shared';
import { DropZonePosition } from '@frontify/fondue';

import { ColorProps } from '../types';
import { DropZoneProps } from '../types';
import { DROP_ZONE_WIDTH } from '../helpers';

export const DropZone = ({
    data,
    isDraggingActive,
    onDrop,
    width = DROP_ZONE_WIDTH,
    height,
    before,
    after,
}: DropZoneProps) => {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: 'color',
        drop: (item: ColorProps) => {
            onDrop?.(data.targetItem, item, data.position);
        },
        canDrop: (item: ColorProps) => {
            return item.id !== data.targetItem.id;
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    const isActive = isOver && canDrop;

    // When dragging is active but this square is not being hovered over
    const isDraggingActiveClassNames = 'tw-absolute tw-w-1/2 tw-z-[100]';

    // When no dragging is happening
    const outerDropZoneClassNames = 'tw-absolute tw-w-1/2 tw-py-1 tw-outline-none';
    const isDraggingNotActiveClassNames = 'tw-z-[-1] tw-border-0 tw-border-dashed tw-border-2 tw-m-[1px]';

    // When dragging is happening and another square is hovered over this one
    const activeOuterDropZoneClassNames = 'tw-absolute tw-z-[100] tw-h-[96px] tw-w-1/2 tw-bg-clip-content';
    const bgColorClassName = 'tw-bg-violet-20';

    const rightSideDropZoneClassNames = 'tw-right-0';

    const visibleDropZonePersistentClasses = 'drop-zone-offset tw-relative tw-rounded-[3px]';
    const visibleDropZoneActiveClasses = 'tw-border-violet-60 tw-border-dashed tw-border-2 tw-top-[0px] tw-m-[1px]';

    const invisibleDropZonePersistentClasses = 'tw-top-[0px] tw-bottom-0 tw-h-full';

    const visibleDropZoneClassNames = joinClassNames([
        visibleDropZonePersistentClasses,
        bgColorClassName,
        isActive && visibleDropZoneActiveClasses,
    ]);

    const invisiblePersistentDropZone = joinClassNames([
        invisibleDropZonePersistentClasses,
        data.position !== DropZonePosition.Within ? outerDropZoneClassNames : 'tw-h-auto',
        isActive && data.position !== DropZonePosition.Within && activeOuterDropZoneClassNames,
        isActive && data.position === DropZonePosition.Within && bgColorClassName,
        isDraggingActive ? isDraggingActiveClassNames : isDraggingNotActiveClassNames,
    ]);

    const DROP_ZONE_BOTTOM_SPACING = 2;

    return (
        <>
            {before && (
                <>
                    <div
                        style={{
                            width: isActive ? `${width}px` : '0px',
                            height: `${height - DROP_ZONE_BOTTOM_SPACING}px`,
                        }}
                        className={visibleDropZoneClassNames}
                    />
                    <div
                        aria-hidden={!isActive}
                        data-test-id="drop-zone"
                        className={invisiblePersistentDropZone}
                        ref={drop}
                    />
                </>
            )}
            {after && (
                <>
                    <div
                        aria-hidden={!isActive}
                        data-test-id="drop-zone"
                        className={joinClassNames([rightSideDropZoneClassNames, invisiblePersistentDropZone])}
                        ref={drop}
                    />
                    <div
                        style={{
                            width: isActive ? `${width}px` : '0px',
                            height: `${height - DROP_ZONE_BOTTOM_SPACING}px`,
                        }}
                        className={visibleDropZoneClassNames}
                    />
                </>
            )}
        </>
    );
};
