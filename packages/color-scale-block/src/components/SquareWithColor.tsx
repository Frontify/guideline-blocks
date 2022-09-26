/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useDrag } from 'react-dnd';
import { DragSourceMonitor } from 'react-dnd';
import { Button, ButtonSize, ButtonStyle, IconSize, IconTrashBin, Tooltip, useCopy } from '@frontify/fondue';
import { ItemDragState, TooltipAlignment, TooltipPosition } from '@frontify/fondue';
import { SquareWithColorProps } from '../types';
import { DragHandle } from './DragHandle';
import { TooltipContent } from './TooltipContent';
import { joinClassNames, toHex8String } from '@frontify/guideline-blocks-shared';

export const SquareWithColor = ({
    id,
    index,
    width,
    height,
    isFirst,
    isLast,
    currentColor,
    onResizeStart,
    calculateLeftPosition,
    isEditing,
    deleteColor,
    listId,
    setCurrentlyDraggedColorId,
    isDragging,
}: SquareWithColorProps) => {
    const handleDrag = () => {
        if (isDragging !== !!currentColor.id) {
            setCurrentlyDraggedColorId(currentColor.id ?? null);
        }
    };

    const handleDragEnd = () => {
        setCurrentlyDraggedColorId(null);
    };

    const [{}, drag] = useDrag({
        item: currentColor,
        collect: (monitor: DragSourceMonitor) => {
            return {
                componentDragState: monitor.isDragging() ? ItemDragState.Dragging : ItemDragState.Idle,
            };
        },
        type: listId,
        canDrag: isEditing,
    });

    const { copy, status } = useCopy();

    const rgbaValues = [
        currentColor.red,
        currentColor.green,
        currentColor.blue,
        ...(currentColor.alpha ? [currentColor.alpha / 255] : []),
    ];

    const backgroundColor = `rgba(${rgbaValues.join(',')})`;
    const hexColor = currentColor ? toHex8String(currentColor) : '';

    const firstElementClasses = 'first:tw-pl-[1px] last:tw-pr-[1px] first:tw-rounded-tl first:tw-rounded-bl';
    const lastElementClasses = 'last:tw-rounded-tr last:tw-rounded-br';

    return (
        <div
            style={{
                width: `${width}px`,
                left: `${calculateLeftPosition(index, width)}px`,
                height,
            }}
            className="hover:tw-z-30 tw-overflow-x-visible tw-overflow-y-hidden tw-pb-8 tw-inline-block"
        >
            {isEditing ? <DragHandle index={index} currentColor={currentColor} onResizeStart={onResizeStart} /> : <></>}

            <div
                ref={drag}
                draggable
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
                style={{
                    height,
                    backgroundColor,
                }}
                className={`
                    merge(
                        ${isFirst ? firstElementClasses : ''},
                        ${isLast ? lastElementClasses : ''},
                        [&>div]:tw-h-full tw-group tw-relative tw-w-full tw-h-full tw-overflow-y-hidden tw-overflow-x-visible tw-border-none hover:tw-border hover:tw-border-black
                    )
                `}
            >
                {isEditing ? (
                    <div
                        className={joinClassNames([
                            'tw-hidden tw-absolute tw-top-1.5 tw-right-[3%] tw-transition-all',
                            isEditing && 'group-hover:tw-block',
                        ])}
                    >
                        <Button
                            icon={<IconTrashBin size={IconSize.Size16} />}
                            size={ButtonSize.Small}
                            style={ButtonStyle.Secondary}
                            onClick={() => deleteColor(id)}
                        />
                    </div>
                ) : (
                    <Tooltip
                        alignment={TooltipAlignment.Middle}
                        content={<TooltipContent colorValue={hexColor ?? ''} status={status} />}
                        hoverDelay={0}
                        position={TooltipPosition.Right}
                        triggerElement={
                            <div className="tw-w-full tw-h-full" onClick={() => copy(hexColor ?? '')}></div>
                        }
                        withArrow
                    />
                )}
            </div>
        </div>
    );
};
