/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    DragEndEvent,
    DragStartEvent,
    KeyboardSensor,
    PointerSensor,
    UniqueIdentifier,
    closestCenter,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useState } from 'react';
import { Nullable, Tile } from '../types';

export const useDraggableGrid = (tiles: Tile[], updateTiles: (tiles: Tile[]) => void) => {
    const [draggingTileId, setDraggingTileId] = useState<Nullable<UniqueIdentifier>>(null);
    const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor));

    const onDragStart = (event: DragStartEvent) => {
        const { active } = event;
        setDraggingTileId(active.id);
    };

    const onDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = tiles?.findIndex((tile) => tile.id === active.id);
            const newIndex = tiles?.findIndex((tile) => tile.id === over.id);
            let sortedItems = tiles;
            if (oldIndex !== undefined && newIndex !== undefined) {
                sortedItems = arrayMove(tiles ?? [], oldIndex, newIndex);
            }
            updateTiles(sortedItems ?? []);
            setDraggingTileId(null);
        }
    };

    const draggedBlock = tiles?.find((block) => block.id === draggingTileId);

    return {
        dragContextProps: {
            onDragEnd,
            onDragStart,
            sensors,
            collisionDetection: closestCenter,
        },
        draggedBlock,
        draggingTileId,
    };
};
