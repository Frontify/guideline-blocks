/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC, MouseEvent, MouseEventHandler } from 'react';
import { DragHandleProps } from '../types';

export const DragHandle: FC<DragHandleProps> = ({ index, currentColor, onResizeStart }) => {
    const handleMouseDown: MouseEventHandler = (event: MouseEvent) =>
        onResizeStart && onResizeStart(event, index, currentColor);

    return (
        <>
            <div
                className="tw-absolute tw-opacity-0 hover:tw-opacity-100 group-hover:tw-flex tw-w-[8px] tw-flex tw-h-full tw-items-center tw-right-[0px] tw-cursor-move tw-z-[99]"
                // Note: onMouseUp and onDrag are defined here intentionally, instead of being in the DragHandle component.
                // The reason for this is that the dragging feature stops working if I move these to DragHandle,
                // perhaps because the component is being destroyed on every re-render and causing issues with dragging.
                // The 'onResizeStart' method, on the other hand, needs to stay in DragHandle, because it needs to
                // identify which color square is being resized.
                onMouseDown={handleMouseDown}
            >
                <div
                    className={'drag-handle tw-right-[-3px] tw-bg-black-20 tw-absolute tw-rounded-full tw-w-2 tw-h-6'}
                ></div>
            </div>
        </>
    );
};
