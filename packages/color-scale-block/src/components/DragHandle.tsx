/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MouseEvent, MouseEventHandler } from 'react';

import { DragHandleProps } from '../types';

export const DragHandle = ({ index, onResizeStart }: DragHandleProps) => {
    const handleMouseDown: MouseEventHandler = (event: MouseEvent) => onResizeStart?.(event, index);

    return (
        <div
            className="tw-absolute tw-opacity-0 hover:tw-opacity-100 group-hover:tw-flex tw-w-2 tw-flex tw-h-full tw-items-center tw-right-[0px] tw-cursor-ew-resize tw-z-[99]"
            // Note: onMouseUp and onDrag are defined here intentionally, instead of being in the DragHandle component.
            // The reason for this is that the dragging feature stops working if I move these to DragHandle,
            // perhaps because the component is being destroyed on every re-render and causing issues with dragging.
            // The 'onResizeStart' method, on the other hand, needs to stay in DragHandle, because it needs to
            // identify which color square is being resized.
            onMouseDown={handleMouseDown}
        >
            <div
                data-test-id="drag-handle"
                className="tw-right-[-3px] tw-bg-black-20 tw-absolute tw-rounded-full tw-w-2 tw-h-6"
                draggable
            />
        </div>
    );
};
