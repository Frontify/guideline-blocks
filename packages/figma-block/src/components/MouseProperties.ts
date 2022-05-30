/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Point } from '../types';

export class MouseProperties {
    public static getCurrentPosition(event: MouseEvent): Point {
        return {
            x: event.pageX,
            y: event.pageY,
        };
    }
}
