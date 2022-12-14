/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useDrag } from 'react-dnd';
import {
    Button,
    ButtonSize,
    ButtonStyle,
    DropZonePosition,
    IconSize,
    IconTrashBin,
    Tooltip,
    useCopy,
} from '@frontify/fondue';
import { ItemDragState, TooltipAlignment, TooltipPosition } from '@frontify/fondue';
import { joinClassNames, toHex8String } from '@frontify/guideline-blocks-shared';

import { DragHandle } from './DragHandle';
import { TooltipContent } from './TooltipContent';
import { ColorSquareProps } from '../types';
import { DropZone } from '../dragAndDrop/DropZone';
import {
    DROP_ZONE_WIDTH,
    MINIMUM_WIDTH_TO_SHOW_TRASH_ICON_AT_FURTHEST_RIGHT_POSITION,
    MINIMUM_WIDTH_TO_SHOW_TRASH_ICON_AT_NEGATIVE_RIGHT_POSITION,
} from '../helpers';

export const ColorSquare = ({
    index,
    width,
    height,
    className,
    color,
    onDrop,
    onDelete,
    onResizeStart,
    canDragAndDrop,
    isEditing,
    setCurrentlyDraggedColorId,
    currentlyDraggedColorId,
    setDraggedColorWidth,
    draggedColorWidth,
    isLast,
}: ColorSquareProps) => {
    const { copy, status } = useCopy();
    const [, drag] = useDrag({
        item: color,
        collect: (monitor) => {
            return {
                componentDragState: monitor.isDragging() ? ItemDragState.Dragging : ItemDragState.Idle,
            };
        },
        type: 'color',
        canDrag: isEditing && canDragAndDrop,
    });

    const copyColor = () => copy(hexColor ?? '');

    const rgbaValues = [color.red, color.green, color.blue, color.alpha];
    const backgroundColor = `rgba(${rgbaValues.join(',')})`;
    const hexColor = color ? toHex8String(color) : '';

    const handleDrag = () => {
        if (!currentlyDraggedColorId && color !== null) {
            setCurrentlyDraggedColorId(color.id ?? null);
            setDraggedColorWidth(color.width);
        }
    };

    const handleDragEnd = () => {
        setCurrentlyDraggedColorId(null);
        setDraggedColorWidth(null);
    };

    return (
        <>
            <DropZone
                key={`orderable-list-item-${color.id}-before`}
                height={parseInt(height)}
                before
                width={draggedColorWidth}
                isDraggingActive={Number.isInteger(currentlyDraggedColorId)}
                data={{
                    targetItem: color,
                    position: DropZonePosition.Before,
                }}
                onDrop={onDrop}
            />
            <div
                data-test-id="color-scale-block-color-square"
                style={{
                    width: `${width}px`,
                    height,
                }}
                className="hover:tw-z-30 tw-overflow-x-visible tw-overflow-y-hidden tw-pb-8 tw-inline-block"
            >
                {isEditing && !isLast && <DragHandle index={index} onResizeStart={onResizeStart} />}

                <div
                    data-test-id="color-scale-block-color-square-with-background"
                    ref={drag}
                    draggable
                    onDrag={handleDrag}
                    onDragEnd={handleDragEnd}
                    style={{
                        height,
                        background: backgroundColor,
                    }}
                    className={joinClassNames([
                        '[&>div]:tw-h-full tw-group tw-relative tw-w-full tw-h-full tw-overflow-y-hidden tw-overflow-x-visible tw-border-none hover:tw-border hover:tw-border-black',
                        className,
                    ])}
                >
                    {!isEditing && (
                        <Tooltip
                            alignment={TooltipAlignment.Middle}
                            content={
                                <TooltipContent
                                    colorName={color.name ?? ''}
                                    colorValue={hexColor ?? ''}
                                    status={status}
                                />
                            }
                            hoverDelay={0}
                            position={TooltipPosition.Bottom}
                            triggerElement={<div className="tw-w-full tw-h-full" onClick={copyColor} />}
                            withArrow
                        />
                    )}
                </div>
            </div>
            {isEditing && (
                <div
                    data-test-id="delete-color"
                    className={joinClassNames([
                        'tw-z-[99] tw-hidden tw-absolute tw-top-1.5 tw-transition-all tw-right-2',
                        color.width && color.width <= MINIMUM_WIDTH_TO_SHOW_TRASH_ICON_AT_NEGATIVE_RIGHT_POSITION
                            ? 'tw-right-[-2px]'
                            : '',
                        color.width && color.width <= MINIMUM_WIDTH_TO_SHOW_TRASH_ICON_AT_FURTHEST_RIGHT_POSITION
                            ? 'tw-right-[-4px]'
                            : '',
                        isEditing && 'group-hover:tw-block',
                    ])}
                >
                    <Button
                        icon={<IconTrashBin size={IconSize.Size16} />}
                        size={ButtonSize.Small}
                        style={ButtonStyle.Secondary}
                        onClick={() => onDelete(color.id)}
                    />
                </div>
            )}

            <DropZone
                key={`orderable-list-item-${color.id}-after`}
                height={parseInt(height)}
                after
                width={DROP_ZONE_WIDTH}
                isDraggingActive={Number.isInteger(currentlyDraggedColorId)}
                data={{
                    targetItem: color,
                    position: DropZonePosition.After,
                }}
                onDrop={onDrop}
            />
        </>
    );
};
