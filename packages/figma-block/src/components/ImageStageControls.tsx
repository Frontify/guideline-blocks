/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, ButtonEmphasis, IconArrowExpand, IconCross, IconMinus, IconPlus } from '@frontify/fondue';
import { joinClassNames } from '@frontify/guideline-blocks-settings';
import { DrawFullScreenActionButtonProps, DrawZoomInOutButtonsProps } from '../types';

export const DrawFullScreenActionButton = ({ isFullScreen = false, onClick }: DrawFullScreenActionButtonProps) => (
    <div className="tw-invisible group-hover:tw-visible tw-absolute tw-top-4 tw-right-4">
        <Button
            icon={isFullScreen ? <IconCross /> : <IconArrowExpand />}
            emphasis={ButtonEmphasis.Default}
            onClick={onClick}
        />
    </div>
);

export const DrawZoomInOutButtons = ({
    onClickZoomIn,
    onClickZoomOut,
    isFullScreen = false,
}: DrawZoomInOutButtonsProps) => (
    <div
        className={joinClassNames([
            'tw-invisible group-hover:tw-visible tw-absolute tw-right-4 tw-rounded-[4px] tw-cursor-pointer tw-border tw-border-[rgba(255,255,255,0.2)] tw-bg-[#222]',
            isFullScreen ? ' tw-bottom-[50%]' : 'tw-bottom-4',
        ])}
    >
        <button
            data-test-id="zoom-in"
            onClick={onClickZoomIn}
            className="tw-w-[32px] tw-h-[32px] tw-text-white tw-flex tw-justify-center tw-items-center"
        >
            <IconMinus />
        </button>
        <button
            data-test-id="zoom-out"
            onClick={onClickZoomOut}
            className="tw-w-[32px] tw-h-[32px] tw-text-white tw-flex tw-justify-center tw-items-center"
        >
            <IconPlus />
        </button>
    </div>
);
