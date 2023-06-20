/* (c) Copyright Frontify Ltd., all rights reserved. */

import { KeyboardCode, KeyboardCoordinateGetter } from '@dnd-kit/core';

const directions: string[] = [KeyboardCode.Down, KeyboardCode.Right, KeyboardCode.Up, KeyboardCode.Left];

export const customCoordinatesGetterFactory =
    (gap: number): KeyboardCoordinateGetter =>
    (event, { currentCoordinates, context: { activeNode } }) => {
        if (directions.includes(event.code)) {
            event.preventDefault();

            const width = activeNode?.offsetWidth ?? 0;
            const height = activeNode?.offsetHeight ?? 0;

            switch (event.code) {
                case KeyboardCode.Right:
                    return {
                        ...currentCoordinates,
                        x: currentCoordinates.x + width + gap,
                    };
                case KeyboardCode.Left:
                    return {
                        ...currentCoordinates,
                        x: currentCoordinates.x - width - gap,
                    };
                case KeyboardCode.Down:
                    return {
                        ...currentCoordinates,
                        y: currentCoordinates.y + height + gap,
                    };
                case KeyboardCode.Up:
                    return {
                        ...currentCoordinates,
                        y: currentCoordinates.y - height - gap,
                    };
            }
        }
        return undefined;
    };
