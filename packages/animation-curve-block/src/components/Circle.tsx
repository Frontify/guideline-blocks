/* (c) Copyright Frontify Ltd., all rights reserved. */

import { toHexString } from '@frontify/guideline-blocks-settings';

import { type CircleProps } from '../types';

export const Circle = ({
    center,
    radius,
    scale = 1,
    fillColor,
    isDraggable = false,
    testId = 'animation-curves-circle',
    onPointerDown,
}: CircleProps) => {
    return (
        <circle
            data-test-id={testId}
            cx={center.x}
            cy={center.y}
            r={radius / scale}
            fill={toHexString(fillColor)}
            className={isDraggable ? 'tw-cursor-move' : ''}
            onPointerDown={onPointerDown && onPointerDown}
            vectorEffect="non-scaling-stroke"
        />
    );
};
