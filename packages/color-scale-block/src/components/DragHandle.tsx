/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';
import { DragHandleProps } from '../types';

export const DragHandle: FC<DragHandleProps> = ({ id, currentColor, isEditing, onDragStart }) => (
    <>
        {isEditing ? (
            <div
                style={{ right: '-4px', cursor: 'move', zIndex: 1 }}
                className="tw-absolute tw-opacity-0 hover:tw-opacity-100 tw-hidden group-hover:tw-flex tw-h-full tw-w-8"
                // Note: onMouseUp and onDrag are defined here intentionally, instead of being in the DragHandle component.
                // The reason for this is that the dragging feature stops working if I move these to DragHandle,
                // perhaps because the component is being destroyed on every re-render and causing issues with dragging.
                // The 'onDragStart' method, on the other hand, needs to stay in DragHandle, because it needs to
                // identify which color square is being resized.
                onMouseDown={(evt) => onDragStart && onDragStart(evt, id, currentColor)}
            >
                <div
                    className={`drag-handle tw-right-0 tw-bg-black-20 tw-absolute tw-rounded-full tw-top-6 tw-mt-2 tw-w-2 tw-h-6`}
                ></div>
            </div>
        ) : (
            <></>
        )}
    </>
);
