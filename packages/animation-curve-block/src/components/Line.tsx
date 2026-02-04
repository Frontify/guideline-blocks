/* (c) Copyright Frontify Ltd., all rights reserved. */

import { toHexString } from '@frontify/guideline-blocks-settings';

import { type LineProps } from '../types';

export const Line = ({
    start,
    end,
    strokeColor,
    strokeWidth = 2,
    dashed = false,
    dashArray = strokeWidth,
}: LineProps) => {
    return (
        <line
            data-test-id="animation-curves-line"
            x1={start.x}
            y1={start.y}
            x2={end.x}
            y2={end.y}
            stroke={toHexString(strokeColor)}
            strokeWidth={strokeWidth}
            strokeDasharray={dashed ? dashArray : 0}
            strokeDashoffset={dashed ? dashArray : 0}
            vectorEffect="non-scaling-stroke"
        />
    );
};
