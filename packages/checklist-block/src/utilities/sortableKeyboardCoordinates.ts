import { closestCenter, KeyboardCode, rectIntersection } from '@dnd-kit/core';
import type { CollisionDetection, KeyboardCoordinateGetter } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

enum Direction {
    Down = 1,
    Up = -1,
}

const keycodes: string[] = [KeyboardCode.Down, KeyboardCode.Right, KeyboardCode.Up, KeyboardCode.Left];

export const collisionDetection: CollisionDetection = (entries, target) => {
    return rectIntersection(entries, target) ?? closestCenter(entries, target);
};

export const sortableKeyboardCoordinates: KeyboardCoordinateGetter = (
    event,
    { context: { active, over, droppableContainers, translatedRect } }
) => {
    if (keycodes.includes(event.code)) {
        event.preventDefault();

        if (!translatedRect || !active || !active.data || !active.data.current) {
            return undefined;
        }

        const items: string[] = active.data.current.sortable.items;
        const overId = over?.id || active.id;
        const overIndex = items.indexOf(overId);
        const activeIndex = items.indexOf(active.id);
        let nextIndex = overIndex;
        let direction = Direction.Down;

        switch (event.code) {
            case KeyboardCode.Right:
            case KeyboardCode.Down:
                nextIndex = Math.min(overIndex + 1, items.length - 1);
                break;
            case KeyboardCode.Left:
            case KeyboardCode.Up:
                nextIndex = Math.max(0, overIndex - 1);
                direction = Direction.Up;
                break;
        }

        let nextId: string | null = null;

        if (overIndex !== nextIndex) {
            nextId = items[nextIndex];
        }

        if (nextId) {
            const activeNode = droppableContainers[active.id]?.node.current;
            const sortedItems = arrayMove(items, activeIndex, overIndex);
            const currentNodeIdAtNextIndex = sortedItems[nextIndex];
            const newNode = droppableContainers[currentNodeIdAtNextIndex]?.node.current;

            if (newNode && activeNode) {
                const activeRect = activeNode.getBoundingClientRect();
                const newRect = newNode.getBoundingClientRect();
                const offset =
                    direction === Direction.Down ? newRect.top - activeRect.bottom : activeRect.top - newRect.bottom;
                const newCoordinates = {
                    x: translatedRect.left,
                    y: activeRect.top + direction * (newRect.height + offset),
                };

                return newCoordinates;
            }
        }
    }

    return undefined;
};
