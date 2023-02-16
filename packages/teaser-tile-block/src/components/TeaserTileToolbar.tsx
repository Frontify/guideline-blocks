/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    FlyoutPlacement,
    IconArrowMove16,
    IconCog,
    IconCog16,
    IconTrashBin16,
    merge,
    Tooltip,
    TooltipPosition,
} from '@frontify/fondue';
import { MutableRefObject, useState } from 'react';
import { TileSettingsFlyout } from './TileSettingsFlyout';

export const TeaserTileToolbar = ({
    draggableProps,
    isDragging,
    onRemoveSelf,
    tileSettingsFlyoutProps,
    onToolbarBlur,
    onToolbarFocus,
}: any) => {
    const [isTopSettingsFlyoutOpen, setIsTopSettingsFlyoutOpen] = useState(false);
    return (
        <div
            className="tw-absolute tw--top-4 tw-bg-base tw-right-0 tw-flex tw-gap-[2px] tw-p-0.5 tw-border tw-z-[200] tw-rounded tw-border-box-selected-inverse tw-text-box-selected-inverse"
            onFocus={onToolbarFocus}
            onMouseEnter={onToolbarFocus}
            onBlur={onToolbarBlur}
            onMouseLeave={onToolbarBlur}
        >
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
            <div className="tw-relative">
                <TileSettingsFlyout
                    {...tileSettingsFlyoutProps}
                    placement={FlyoutPlacement.BottomRight}
                    isOpen={isTopSettingsFlyoutOpen}
                    setIsOpen={setIsTopSettingsFlyoutOpen}
                >
                    {(triggerProps, triggerRef: MutableRefObject<HTMLButtonElement>) => (
                        <Tooltip
                            withArrow
                            enterDelay={300}
                            hoverDelay={0}
                            disabled={isDragging}
                            position={TooltipPosition.Top}
                            content={<div>Tile Settings</div>}
                            triggerElement={
                                <div>
                                    <button
                                        {...triggerProps}
                                        ref={triggerRef}
                                        className={merge([
                                            'tw-bg-base tw-relative tw-inline-flex  tw-items-center tw-justify-center tw-w-[24px] tw-h-[24px] tw-rounded-sm tw-z-[3]',
                                            isDragging
                                                ? ' hover:tw-bg-box-selected-pressed'
                                                : ' hover:tw-bg-box-selected-hover',
                                        ])}
                                    >
                                        <IconCog16 />
                                    </button>
                                </div>
                            }
                        />
                    )}
                </TileSettingsFlyout>
            </div>

            <Tooltip
                withArrow
                enterDelay={300}
                hoverDelay={0}
                disabled={isDragging}
                position={TooltipPosition.Top}
                content={<div>Delete item</div>}
                triggerElement={
                    <button
                        onClick={onRemoveSelf}
                        className="tw-bg-base hover:tw-bg-box-selected-hover active:tw-bg-box-selected-pressed tw-cursor-pointer tw-inline-flex  tw-items-center tw-justify-center tw-w-[24px] tw-h-[24px] tw-rounded-sm"
                    >
                        <IconTrashBin16 />
                    </button>
                }
            />
        </div>
    );
};
