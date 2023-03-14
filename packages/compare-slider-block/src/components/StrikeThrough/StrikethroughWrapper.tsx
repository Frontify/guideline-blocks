/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactNode } from 'react';

export const StrikethroughWrapper = ({
    children,
    width,
    left,
    height,
    top,
    borderRadius,
}: {
    children: ReactNode;
    width: number;
    left: number;
    top: number;
    height: number;
    borderRadius: string;
}) => {
    const minPadding = 8;
    const borderRadiusValue = +borderRadius?.split('px')[0] || 0;
    const paddingBecauseOfBorderRadius = borderRadiusValue - borderRadiusValue / Math.sqrt(2);
    return (
        <div
            data-test-id="compare-slider-block-strikethrough-wrapper"
            style={{
                width: `${width}%`,
                left: `${left}%`,
                top: `${top}%`,
                height: `${height}%`,
                padding: `${paddingBecauseOfBorderRadius + minPadding}px`,
            }}
            className="tw-absolute"
        >
            {children}
        </div>
    );
};
