/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useDrag } from 'react-dnd';
import { DragSourceMonitor } from 'react-dnd';
import { FC, MouseEvent, MouseEventHandler, useState } from 'react';
import { Tooltip } from '@frontify/fondue';
import { ItemDragState, TooltipAlignment, TooltipPosition } from '@frontify/fondue';
import { ColorProps, SquareWithColorProps } from '../types';
import { DragHandle } from './DragHandle';
import { CustomizationOptionsModal } from './CustomizationOptionsModal';

const rgbaToHex = (rgba: string, forceRemoveAlpha = false) => {
    return `#${rgba
        .replace(/^rgba?\(|\s+|\)$/g, '') // Get's rgba / rgb string values
        .split(',') // splits them at ","
        .filter((string: string, index: number) => !forceRemoveAlpha || index !== 3)
        .map((string: string) => parseFloat(string)) // Converts them to numbers
        .map((number: number) => number.toString(16)) // Converts numbers to hex
        .map((string: string) => (string.length === 1 ? `0${string}` : string)) // Adds 0 when length of one number is 1
        .join('')}`; // Puts the array to together to a string
};

const getRgbaString = (currentColor: ColorProps) => {
    if (!(currentColor && currentColor.color)) {
        return '';
    }

    return rgbaToHex(
        `rgba(${currentColor.color.red}, ${currentColor.color.green}, ${currentColor.color.blue}, ${currentColor.color.alpha})`
    ).toUpperCase();
};

export const SquareWithColor: FC<SquareWithColorProps> = ({
    id,
    index,
    width,
    height,
    currentColor,
    backgroundColorRgba,
    totalNumberOfBlocks,
    onResizeStart,
    calculateLeftPosition,
    isEditing,
    deleteColor,
    listId,
    setCurrentlyDraggedColorId,
    isDragging,
}) => {
    const isFirst = index === 0;
    const isLast = totalNumberOfBlocks - 1;

    const onDrag = () => {
        if (isDragging !== !!currentColor.id) {
            setCurrentlyDraggedColorId(currentColor.id);
        }
    };

    const onDragEnd = () => {
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

    const [copied, setCopied] = useState(false);

    const copyToClipboard = async (text?: string) => {
        try {
            const toCopy = text || location.href;
            await navigator.clipboard.writeText(toCopy);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    const onTooltipClick: MouseEventHandler = (event: MouseEvent) => {
        event.preventDefault();

        copyToClipboard(getRgbaString(currentColor));

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    const bgColor = `rgba(${backgroundColorRgba}`;

    return (
        <div
            id={`row-id-${id}-index-${index}`}
            style={{
                width: `${width}px`,
                left: `${calculateLeftPosition(index, width)}px`,
                height,
            }}
            className={'hover:tw-z-30 row tw-overflow-x-visible tw-overflow-y-hidden tw-pb-8 tw-inline-block'}
        >
            <DragHandle index={index} currentColor={currentColor} isEditing={isEditing} onResizeStart={onResizeStart} />
            <div
                ref={drag}
                draggable
                onDrag={onDrag}
                onDragEnd={onDragEnd}
                style={{
                    height,
                    width: `${width}px`,
                }}
                className={
                    'tw-group tw-overflow-y-hidden tw-overflow-x-visible tw-top-2 tw-border-[0px] tw-border-white tw-w-full hover:tw-border-black hover:tw-border-[1px]'
                }
            >
                <Tooltip
                    alignment={TooltipAlignment.Middle}
                    content={
                        <div>
                            <div>{currentColor && currentColor.color && currentColor.color.name}</div>
                            <div>{getRgbaString(currentColor)}</div>
                            <a href="#" rel="noop noreferrer" onClick={onTooltipClick} className="tw-opacity-50">
                                {copied ? 'Copied' : 'Click to copy'}
                            </a>
                        </div>
                    }
                    flip
                    heading=""
                    hoverDelay={200}
                    position={TooltipPosition.Bottom}
                    triggerElement={
                        <div
                            style={{
                                backgroundColor: bgColor,
                                height,
                                width: `${width}px`,
                            }}
                            className={` tw-top-0 tw-left-0
                            ${isFirst ? 'tw-pl-[1px]' : ''} 
                            ${isLast ? 'tw-pr-[1px]' : ''}
                            ${isFirst ? 'tw-rounded-tl' : ''}
                            ${isFirst ? 'tw-rounded-bl' : ''}
                            ${isLast ? 'tw-rounded-tr' : ''}
                            ${isLast ? 'tw-rounded-br' : ''}`}
                        >
                            <CustomizationOptionsModal id={id} isEditing={isEditing} deleteColor={deleteColor} />
                        </div>
                    }
                    withArrow
                />
            </div>
        </div>
    );
};
