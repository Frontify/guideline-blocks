/* (c) Copyright Frontify Ltd., all rights reserved. */

import { KeyboardCoordinateGetter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';

export const useDndSensors = (gap = 0) => {
    const customCoordinatesGetter: KeyboardCoordinateGetter = (event, { currentCoordinates, context }) => {
        const width = context.activeNode?.offsetWidth ?? 0;
        const height = context.activeNode?.offsetHeight ?? 0;

        switch (event.code) {
            case 'ArrowRight':
                return {
                    ...currentCoordinates,
                    x: currentCoordinates.x + width + gap,
                };
            case 'ArrowLeft':
                return {
                    ...currentCoordinates,
                    x: currentCoordinates.x - width - gap,
                };
            case 'ArrowDown':
                return {
                    ...currentCoordinates,
                    y: currentCoordinates.y + height + gap,
                };
            case 'ArrowUp':
                return {
                    ...currentCoordinates,
                    y: currentCoordinates.y - height - gap,
                };
        }
        return undefined;
    };

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: customCoordinatesGetter,
        })
    );

    return sensors;
};
