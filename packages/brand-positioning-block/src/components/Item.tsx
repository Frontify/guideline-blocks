/* (c) Copyright Frontify Ltd., all rights reserved. */

import { joinClassNames } from '@frontify/guideline-blocks-shared';
import { useDraggable } from '@dnd-kit/core';
import { ItemProps } from '../types';
import { Toolbar } from './Toolbar';
import { LoadingCircle } from '@frontify/fondue';

export const Item = ({ src, xPosition, yPosition, id, deleteItem, isEditing }: ItemProps) => {
    const { attributes, isDragging, listeners, setNodeRef, transform } = useDraggable({
        id,
    });
    const transformStyle = {
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : '',
        zIndex: isDragging ? 2 : 1,
    };

    return (
        <div
            style={{
                left: `${xPosition}%`,
                top: `${yPosition}%`,
                ...transformStyle,
            }}
            ref={setNodeRef}
            className={joinClassNames([
                'tw-h-[50px] tw-w-[50px] tw-bg-white tw-group tw-rounded tw-border tw-border-line tw-p-1 tw-absolute ',
                isEditing &&
                    'hover:tw-outline-offset-1 hover:tw-outline hover:tw-outline-1 hover:tw-outline-box-selected-inverse',
            ])}
        >
            <div
                className={joinClassNames([
                    'tw-absolute tw-z-20 tw-bottom-[calc(100%-4px)] -tw-right-[3px]',
                    isEditing && ' group-hover:tw-visible',
                    isDragging ? 'tw-visible' : 'tw-invisible',
                ])}
            >
                <Toolbar
                    deleteItem={deleteItem}
                    draggableAttributes={attributes}
                    draggableListeners={listeners}
                    isDragging={isDragging}
                />
            </div>
            {src ? (
                <img src={src} className="tw-w-full tw-h-full tw-object-contain" />
            ) : (
                <div className="tw-w-full tw-h-full tw-flex tw-items-center tw-justify-center">
                    <LoadingCircle />
                </div>
            )}
        </div>
    );
};
