/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Alignment, SliderImageSlot, type StrikethroughWrapperProps } from '../../types';

export const StrikethroughWrapper = ({
    children,
    alignment,
    borderRadius,
    slot,
    hasStrikeThrough,
    currentSliderPosition,
}: StrikethroughWrapperProps) => {
    let top = 0;
    let left = 0;
    let height = alignment === Alignment.Horizontal ? 100 : currentSliderPosition;
    let width = alignment === Alignment.Horizontal ? currentSliderPosition : 100;

    if (slot === SliderImageSlot.Second) {
        top = alignment === Alignment.Horizontal ? 0 : currentSliderPosition;
        left = alignment === Alignment.Horizontal ? currentSliderPosition : 0;
        height = alignment === Alignment.Horizontal ? 100 : 100 - currentSliderPosition;
        width = alignment === Alignment.Horizontal ? 100 - currentSliderPosition : 100;
    }
    if (!hasStrikeThrough) {
        return null;
    }

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
