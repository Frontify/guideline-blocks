/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type AnimationCurveCanvasGridProps } from '../types';

import { Line } from './';

export const AnimationCurveCanvasGrid = ({ viewBox, lineColor }: AnimationCurveCanvasGridProps) => {
    return (
        <g data-test-id="animation-curves-grid">
            <Line
                start={{ x: 0.0, y: viewBox.height }}
                end={{ x: viewBox.width, y: viewBox.height }}
                strokeColor={lineColor}
                strokeWidth={1}
            />
            <Line
                start={{ x: 0.0, y: 0.0 }}
                end={{ x: 0.0, y: viewBox.height }}
                strokeColor={lineColor}
                strokeWidth={1}
            />
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
            {[...Array(5)].map((_, i) => (
                <Line
                    key={`line-${i}`}
                    start={{ x: (viewBox.width / 5) * (i + 1), y: 0.0 }}
                    end={{ x: (viewBox.width / 5) * (i + 1), y: viewBox.height }}
                    strokeColor={lineColor}
                    strokeWidth={1}
                    dashArray={4}
                    dashed
                />
            ))}
        </g>
    );
};
