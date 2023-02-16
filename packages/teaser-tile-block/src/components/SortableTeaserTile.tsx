/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useSortable } from '@dnd-kit/sortable';
import { SortableTeaserTileProps } from '../types';
import { TeaserTile } from './TeaserTile';

export const SortableTeaserTile = (props: SortableTeaserTileProps) => {
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
        <TeaserTile
            ref={setNodeRef}
            {...props}
            replaceWithPlaceholder={isDragging}
            transformStyle={transformStyle}
            draggableProps={draggableProps}
        />
    );
};
