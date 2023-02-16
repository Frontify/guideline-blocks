/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useDraggable } from '@dnd-kit/core';
import { joinClassNames } from '@frontify/guideline-blocks-shared';
import { ItemProps } from '../types';
import { Toolbar } from './Toolbar';
import { itemStyleSettingssToCss } from '../utilities/settingsToCss';
import { LoadingCircle } from '@frontify/fondue';

export const Item = ({ src, xPosition, yPosition, id, deleteItem, isEditing, style }: ItemProps) => {
    const { attributes, isDragging, listeners, setNodeRef, transform } = useDraggable({
        id,
    });
    const transformStyle = {
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : '',
        zIndex: isDragging ? 2 : 1,
    };
    const itemStyle = itemStyleSettingssToCss(style);

    return (
        <div
            data-test-id="brandpositioning-item"
            style={{
                left: `${xPosition}%`,
                top: `${yPosition}%`,
                ...transformStyle,
                ...itemStyle,
            }}
            ref={setNodeRef}
            className={joinClassNames([
                'tw-bg-white tw-group tw-rounded tw-border tw-border-line tw-p-1 tw-absolute ',
                isEditing &&
                    'hover:tw-outline-offset-1 hover:tw-outline hover:tw-outline-1 hover:tw-outline-box-selected-inverse',
            ])}
        >
            <div
                data-test-id="brandpositioning-toolbar"
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
                <img
                    {...(isEditing ? attributes : {})}
                    {...(isEditing ? listeners : {})}
                    src={src}
                    className={joinClassNames([
                        'tw-w-full tw-h-full tw-object-contain',
                        isDragging && isEditing && 'tw-cursor-grabbing',
                        !isDragging && isEditing && 'tw-cursor-grab',
                    ])}
                />
            ) : (
                <div className="tw-w-full tw-h-full tw-flex tw-items-center tw-justify-center">
                    <LoadingCircle />
                </div>
            )}
        </div>
    );
};
