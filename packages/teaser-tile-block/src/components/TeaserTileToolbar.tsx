/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    FOCUS_VISIBLE_STYLE,
    FlyoutPlacement,
    IconArrowMove16,
    IconCog16,
    IconTrashBin16,
    Tooltip,
    TooltipPosition,
    merge,
} from '@frontify/fondue';
import { MutableRefObject, useState } from 'react';
import { TeaserTileToolbarProps } from '../types';
import { TileSettingsFlyout } from './TileSettingsFlyout';

export const TeaserTileToolbar = ({
    type,
    isDragging,
    onRemoveSelf,
    onToolbarBlur,
    draggableProps,
    onToolbarFocus,
    isToolbarFocused,
    tileSettingsFlyoutProps,
}: TeaserTileToolbarProps) => {
    const [isTopSettingsFlyoutOpen, setIsTopSettingsFlyoutOpen] = useState(false);

    return (
        <div
            className={merge([
                'tw-absolute tw--top-4 tw-bg-base tw-right-0 tw-flex tw-gap-[2px] tw-p-0.5 tw-border tw-z-[200] tw-rounded tw-border-box-selected-inverse tw-text-box-selected-inverse group-hover:tw-opacity-100',
                isToolbarFocused || isDragging ? 'tw-opacity-100' : 'tw-opacity-0',
            ])}
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
                            'tw-inline-flex tw-items-center active:tw-bg-box-selected-pressed tw-justify-center tw-w-[24px] tw-h-[24px] tw-rounded-sm',
                            isDragging
                                ? 'tw-cursor-grabbing tw-bg-box-selected-pressed'
                                : 'tw-cursor-grab hover:tw-bg-box-selected-hover',
                            FOCUS_VISIBLE_STYLE,
                        ])}
                    >
                        <IconArrowMove16 />
                    </button>
                }
            />
            <div className="tw-relative">
                <TileSettingsFlyout
                    {...tileSettingsFlyoutProps[type]}
                    isOpen={isTopSettingsFlyoutOpen}
                    setIsOpen={setIsTopSettingsFlyoutOpen}
                    placement={FlyoutPlacement.BottomRight}
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
                                        aria-label={
                                            isTopSettingsFlyoutOpen ? 'Close tile settings' : 'Open tile settings'
                                        }
                                        ref={triggerRef}
                                        className={merge([
                                            'tw-relative active:tw-bg-box-selected-pressed tw-inline-flex tw-items-center tw-justify-center tw-w-[24px] tw-h-[24px] tw-rounded-sm tw-z-[3]',
                                            isDragging
                                                ? ' hover:tw-bg-box-selected-pressed'
                                                : ' hover:tw-bg-box-selected-hover',
                                            FOCUS_VISIBLE_STYLE,
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
                        aria-label="Delete Tile"
                        onClick={onRemoveSelf}
                        className={merge([
                            'hover:tw-bg-box-selected-hover active:tw-bg-box-selected-pressed tw-cursor-pointer tw-inline-flex tw-items-center tw-justify-center tw-w-[24px] tw-h-[24px] tw-rounded-sm',
                            FOCUS_VISIBLE_STYLE,
                        ])}
                    >
                        <IconTrashBin16 />
                    </button>
                }
            />
        </div>
    );
};
