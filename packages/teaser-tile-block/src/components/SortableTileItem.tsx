/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useSortable } from '@dnd-kit/sortable';
import { SortableTileItemProps } from '../types';
import { TileItem } from './TileItem';

export const SortableTeaserTile = (props: SortableTileItemProps) => {
    const { id, isEditing } = props;
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id,
    });

    const transformStyle = {
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : '',
        transition,
        zIndex: isDragging ? 2 : 1,
    };

    const draggableProps = isEditing ? { ...attributes, ...listeners } : {};

    return (
        <TileItem
            ref={setNodeRef}
            {...props}
            replaceWithPlaceholder={isDragging}
            transformStyle={transformStyle}
            draggableProps={draggableProps}
        />
    );
};
