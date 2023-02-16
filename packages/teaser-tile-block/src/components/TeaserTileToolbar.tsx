/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconArrowMove16, IconTrashBin16, merge, Tooltip, TooltipPosition } from '@frontify/fondue';

export const TeaserTileToolbar = ({ draggableProps, isDragging, onRemoveSelf }: any) => {
    return (
        <div className="tw-absolute tw-top-0 tw-right-0 tw-flex tw-divide-x tw-divide-x-line tw-border tw-border-line tw-z-[200]">
            <Tooltip
                withArrow
                hoverDelay={0}
                enterDelay={300}
                disabled={isDragging}
                position={TooltipPosition.Top}
                content={<div>Drag to move</div>}
                triggerElement={
                    <button
                        {...draggableProps}
                        className={merge([
                            'tw-bg-base  tw-inline-flex  tw-items-center tw-justify-center tw-w-[24px] tw-h-[24px] tw-rounded-sm',
                            isDragging
                                ? 'tw-cursor-grabbing hover:tw-bg-box-selected-pressed'
                                : 'tw-cursor-grab hover:tw-bg-box-selected-hover',
                        ])}
                    >
                        <IconArrowMove16 />
                    </button>
                }
            />

            <Tooltip
                withArrow
                enterDelay={300}
                hoverDelay={0}
                disabled={isDragging}
                position={TooltipPosition.Top}
                content={<div>Delete item</div>}
                triggerElement={
                    <div
                        onClick={onRemoveSelf}
                        className="tw-bg-base hover:tw-bg-box-selected-hover active:tw-bg-box-selected-pressed tw-cursor-pointer tw-inline-flex  tw-items-center tw-justify-center tw-w-[24px] tw-h-[24px] tw-rounded-sm"
                    >
                        <IconTrashBin16 />
                    </div>
                }
            />
        </div>
    );
};
