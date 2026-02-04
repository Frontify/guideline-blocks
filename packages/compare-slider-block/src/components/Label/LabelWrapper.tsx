/* (c) Copyright Frontify Ltd., all rights reserved. */

import { joinClassNames } from '@frontify/guideline-blocks-settings';

import {
    Alignment,
    type LabelWrapperProps,
    SliderImageSlot,
    horizontalLabelPlacementStyleMap,
    verticalLabelPlacementStyleMap,
} from '../../types';

export const LabelWrapper = ({
    children,
    slot,
    firstAssetLabelPlacementHorizontal,
    firstAssetLabelPlacementVertical,
    secondAssetLabelPlacementHorizontal,
    secondAssetLabelPlacementVertical,
    borderRadius,
    alignment,
}: LabelWrapperProps) => {
    const verticalPlacement =
        slot === SliderImageSlot.First ? firstAssetLabelPlacementVertical : secondAssetLabelPlacementVertical;
    const horizontalPlacement =
        slot === SliderImageSlot.First ? firstAssetLabelPlacementHorizontal : secondAssetLabelPlacementHorizontal;

    let left = alignment === Alignment.Vertical ? verticalLabelPlacementStyleMap[verticalPlacement]?.left : 0;
    let right = alignment === Alignment.Vertical ? verticalLabelPlacementStyleMap[verticalPlacement]?.right : undefined;
    let top = alignment === Alignment.Vertical ? 0 : horizontalLabelPlacementStyleMap[horizontalPlacement]?.top;
    let bottom =
        alignment === Alignment.Vertical ? undefined : horizontalLabelPlacementStyleMap[horizontalPlacement]?.bottom;

    if (slot === SliderImageSlot.Second) {
        left = alignment === Alignment.Vertical ? verticalLabelPlacementStyleMap[verticalPlacement]?.left : undefined;
        right = alignment === Alignment.Vertical ? verticalLabelPlacementStyleMap[verticalPlacement]?.right : 0;
        top = alignment === Alignment.Vertical ? undefined : horizontalLabelPlacementStyleMap[horizontalPlacement]?.top;
        bottom = alignment === Alignment.Vertical ? 0 : horizontalLabelPlacementStyleMap[horizontalPlacement]?.bottom;
    }

    const minPadding = 8;
    const borderRadiusValue = left === 50 || top === 50 ? 0 : +borderRadius?.split('px')[0] || 0;
    const paddingBecauseOfBorderRadius = borderRadiusValue - borderRadiusValue / Math.sqrt(2);
    return (
        <div
            style={{
                right: right !== undefined ? `${right}%` : undefined,
                left: left !== undefined ? `${left}%` : undefined,
                top: top !== undefined ? `${top}%` : undefined,
                bottom: bottom !== undefined ? `${bottom}%` : undefined,
                padding: `${paddingBecauseOfBorderRadius + minPadding}px`,
                transform: `translateX(${left === 50 ? -50 : 0}%) translateY(${top === 50 ? -50 : 0}%)`,
            }}
            className={joinClassNames([
                alignment === Alignment.Horizontal ? 'tw-max-w-[50%]' : 'tw-max-w-full',
                'tw-absolute tw-w-[300px] tw-flex tw-pointer-events-none',
                right === 0 && 'tw-justify-end',
                left === 50 && 'tw-justify-center',
            ])}
        >
            <div className="tw-max-w-full tw-pointer-events-auto">{children}</div>
        </div>
    );
};
