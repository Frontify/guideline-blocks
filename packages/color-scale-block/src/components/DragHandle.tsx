/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';
import { DragHandleProps } from '../types';

export const DragHandle: FC<DragHandleProps> = ({ index, currentColor, isEditing, onResizeStart }) => (
    <>
        {isEditing ? (
            <div
                style={{ right: '-16px', cursor: 'move', zIndex: 99 }}
                className="tw-absolute tw-opacity-0 hover:tw-opacity-100 group-hover:tw-flex tw-w-8 tw-flex tw-h-full tw-items-center"
                // Note: onMouseUp and onDrag are defined here intentionally, instead of being in the DragHandle component.
                // The reason for this is that the dragging feature stops working if I move these to DragHandle,
                // perhaps because the component is being destroyed on every re-render and causing issues with dragging.
                // The 'onResizeStart' method, on the other hand, needs to stay in DragHandle, because it needs to
                // identify which color square is being resized.
                onMouseDown={(event) => onResizeStart && onResizeStart(event, index, currentColor)}
            >
                <div
                    className={`drag-handle tw-right-3 tw-bg-black-20 tw-absolute tw-rounded-full tw-w-2 tw-h-6`}
                ></div>
            </div>
        ) : (
            <></>
        )}
    </>
);
