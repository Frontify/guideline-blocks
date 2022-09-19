import React from "react";
import { useDrop } from "react-dnd";
import { DraggableItem, DropZonePosition, merge } from "@frontify/fondue";

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
    isDraggingActive: boolean;
    currentColor: any;
    children?: JSX.Element;
    before?: boolean;
    after?: boolean;
    width: number;
    height: number;
};

export const DropZone = <T extends object>({
    data,
    currentColor,
    isDraggingActive,
    onDrop,
    children,
    treeId,
    height,
    before,
    after,
}: DropZoneProps<T>) => {
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

    const width =
        currentColor && currentColor.width !== undefined
            ? currentColor.width
            : "100";

    const isActive = isOver && canDrop;

    // When dragging is active but this square is not being hovered over
    const isDraggingActiveClassNames = `tw-absolute tw-w-full tw-z-[100]`;

    // When no dragging is happening
    const outerDropZoneClassNames = `tw-absolute tw-w-full tw-py-1 tw-outline-none`;
    const isDraggingNotActiveClassNames = `tw-z-[-1] tw-border-0`;

    // When dragging is happening and another square is hovered over this one
    const activeOuterDropZoneClassNames = `tw-absolute tw-z-[100] tw-h-[96px] tw-w-full tw-bg-clip-content`;
    const bgColorClassName = "tw-bg-violet-20";

    return (
        <>
            <div
                className={`drop-zone-offset tw-relative tw-transition-all ${isActive ? `tw-border-violet-60 tw-border-dashed tw-border-2 tw-top-[2px] tw-m-[1px]` : ''}`}
                style={{
                    width: isActive ? `${parseInt(width)}px` : `0px`,
                    height: `${height - 5}px`,
                    backgroundColor: '#E3E8F6',
                    borderRadius: '3px',
                }}
            ></div>

            <div
                aria-hidden={!isActive}
                data-test-id="drop-zone"
                className={merge([
                    "tw-top-[0px] tw-bottom-0",
                    data.position !== DropZonePosition.Within
                        ? outerDropZoneClassNames
                        : "tw-h-auto",
                    isActive && data.position !== DropZonePosition.Within
                        ? activeOuterDropZoneClassNames
                        : "",
                    isActive && data.position === DropZonePosition.Within
                        ? bgColorClassName
                        : "",
                    isDraggingActive ? isDraggingActiveClassNames : isDraggingNotActiveClassNames,
                ])}
                ref={drop}
            >
                {children}
            </div>
        </>
    );
};
