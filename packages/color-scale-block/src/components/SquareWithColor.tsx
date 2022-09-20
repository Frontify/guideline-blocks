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
    setIsDragging,
    isDragging,
}) => {
    const onDrag = () => {
        if (isDragging !== !!currentColor.id) {
            setIsDragging(!!currentColor.id);
        }
    };

    const onDragEnd = () => {
        setIsDragging(false);
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

        copyToClipboard(
            rgbaToHex(
                `rgba(${currentColor.color.red}, ${currentColor.color.green}, ${currentColor.color.blue}, ${currentColor.color.alpha})`
            ).toUpperCase()
        );

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
            }}
            className={`hover:tw-z-30 row tw-overflow-visible tw-pb-8 tw-inline-block tw-h-[${height}]`}
            key={id}
        >
            <DragHandle index={index} currentColor={currentColor} isEditing={isEditing} onResizeStart={onResizeStart} />
            <div
                ref={drag}
                draggable
                onDrag={onDrag}
                onDragEnd={onDragEnd}
                className={`tw-group tw-overflow-y-hidden tw-overflow-x-visible tw-top-2 tw-border-[0px] tw-border-white tw-w-full hover:tw-border-black hover:tw-border-[1px] tw-h-[${height}]
                tw-pl-[${index === 0 ? '1px' : '0px'}] tw-pr-[${index === totalNumberOfBlocks - 1 ? '1px' : '0px'}]
                 tw-rounded-tl-[${index === 0 ? '3px' : '0px'}]
                tw-rounded-bl-[${index === 0 ? '3px' : '0px'}]
                tw-rounded-tr-[${index === totalNumberOfBlocks - 1 ? '3px' : '0px'}]
                tw-rounded-br-[${index === totalNumberOfBlocks - 1 ? '3px' : '0px'}]
                tw-border-l-[${index === 0 ? '1px' : '0px'}]
                tw-border-r-[${index === totalNumberOfBlocks - 1 ? '1px' : '0px'}]`}
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
                                width: `${width - 2}px`,
                                height: `${parseInt(height)}px`,
                                backgroundColor: bgColor,
                            }}
                            className={`tw-w-full tw-top-0 tw-left-0`}
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
