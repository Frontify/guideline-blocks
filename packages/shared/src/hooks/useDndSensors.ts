/* (c) Copyright Frontify Ltd., all rights reserved. */

import { KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { customCoordinatesGetterFactory } from '../helpers/customCoordinatesGetterFactory';

export const useDndSensors = (gap = 0) => {
    const customCoordinatesGetter = customCoordinatesGetterFactory(gap);
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: customCoordinatesGetter,
        })
    );

    return sensors;
};
