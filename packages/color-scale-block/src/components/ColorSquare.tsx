/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    Button,
    ButtonEmphasis,
    ButtonSize,
    ButtonStyle,
    IconSize,
    IconTrashBin,
    Tooltip,
    TooltipAlignment,
    TooltipPosition,
    useCopy,
} from '@frontify/fondue';
import { joinClassNames, toHex8String, toRgbaString } from '@frontify/guideline-blocks-shared';
import { LegacyRef, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ColorProps, ColorSquareProps } from '../types';
import { TooltipContent } from './TooltipContent';

export const ColorSquare = ({
    color,
    blockId,
    totalWidth,
    setDisplayableItems,
    isEditing,
    roundedClassNames,
    width,
    onDelete,
    onDrop,
}: ColorSquareProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const { copy, status } = useCopy();
    const hexColor = (color: ColorProps) => (color ? toHex8String(color) : '');
    const [{ isDragging }, drag] = useDrag({
        type: `color-${blockId}`,
        item: { ...color, width },
        canDrag: isEditing,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: `color-${blockId}`,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),

        hover: (item: ColorProps, monitor) => {
            if (color.id === item.id) {
                return;
            }
            const rect = ref.current?.getBoundingClientRect() ?? { width: 0, x: 0 };
            const x = monitor.getClientOffset()?.x ?? 0;
            const right = rect?.x + rect?.width / 2 < x;
            setDisplayableItems((prev: ColorProps[]) => {
                const newColors = prev.filter((currentColor) => currentColor.id !== item.id);
                const newIndex = newColors.findIndex((currentColor: ColorProps) => currentColor.id === color.id);
                newColors.splice(newIndex + (right ? 1 : 0), 0, item);
                return newColors;
            });
        },

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        drop: (item: ColorProps) => {
            onDrop();
        },
    });

    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <>
            <div
                data-test-id="color-wrapper"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onDragStart={() => setShowTooltip(false)}
                className={joinClassNames([
                    'tw-relative [&>div]:tw-h-full',
                    isDragging && 'tw-transition-all tw-bg-violet-20 tw-border-violet-60 tw-border-dashed tw-border-2',
                    roundedClassNames,
                ])}
                draggable
                ref={drop(drag(ref)) as LegacyRef<HTMLDivElement>}
                style={{
                    backgroundColor: isDragging ? '' : toRgbaString(color),
                    width: `${(width / totalWidth) * 100}%`,
                    cursor: isDragging ? 'grabbing' : 'pointer',
                }}
            >
                {isEditing ? (
                    showTooltip && (
                        <div
                            data-test-id="delete-color"
                            className={joinClassNames([
                                'tw-absolute tw-top-1.5 tw-right-2 tw-h-full',
                                isDragging ? 'tw-transition-all' : '',
                            ])}
                        >
                            <Button
                                icon={<IconTrashBin size={IconSize.Size16} />}
                                size={ButtonSize.Small}
                                style={ButtonStyle.Default}
                                emphasis={ButtonEmphasis.Default}
                                onClick={() => onDelete(color)}
                            />
                        </div>
                    )
                ) : (
                    <Tooltip
                        alignment={TooltipAlignment.Middle}
                        content={
                            <TooltipContent colorName={color.name ?? ''} colorValue={hexColor(color)} status={status} />
                        }
                        hoverDelay={0}
                        position={TooltipPosition.Bottom}
                        triggerElement={
                            <div className="tw-w-full tw-h-full" onClick={() => copy(hexColor(color) ?? '')} />
                        }
                        withArrow
                    />
                )}
            </div>
        </>
    );
};
