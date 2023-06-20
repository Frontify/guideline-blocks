/* (c) Copyright Frontify Ltd., all rights reserved. */

import { KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { customCoordinatesGetterFactory } from '../helpers/customCoordinatesGetterFactory';

const keyboardCodes = {
    start: ['Space', 'Enter'],
    cancel: [],
    end: ['Space', 'Enter', 'Escape'],
};

export const useDndSensors = (gap = 0) => {
    const customCoordinatesGetter = customCoordinatesGetterFactory(gap);
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: customCoordinatesGetter,
            keyboardCodes,
        })
    );

    return sensors;
};
