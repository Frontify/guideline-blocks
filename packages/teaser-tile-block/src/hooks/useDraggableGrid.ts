/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    DragEndEvent,
    DragStartEvent,
    KeyboardSensor,
    PointerSensor,
    closestCenter,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useState } from 'react';
import { Nullable, Tile } from '../types';

export const useDraggableGrid = (tiles: Tile[], updateTiles: (tiles: Tile[]) => void) => {
    const [draggedTile, setDraggingTile] = useState<Nullable<Tile>>(null);
    const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor));

    const onDragStart = (event: DragStartEvent) => {
        const { active } = event;
        setDraggingTile(tiles.find((tile) => tile.id === active.id) ?? null);
    };

    const onDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = tiles.findIndex((tile) => tile.id === active.id);
            const newIndex = tiles.findIndex((tile) => tile.id === over.id);
            const sortedItems = arrayMove(tiles, oldIndex, newIndex);
            updateTiles(sortedItems);
            setDraggingTile(null);
        }
    };

    return {
        dragContextProps: {
            onDragEnd,
            onDragStart,
            sensors,
            collisionDetection: closestCenter,
        },
        draggedTile,
    };
};
