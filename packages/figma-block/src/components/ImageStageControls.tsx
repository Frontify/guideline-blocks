/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, ButtonStyle, IconArrowExpand, IconCross, IconMinus, IconPlus } from '@frontify/fondue';
import { DrawFullScreenActionButtonProps, DrawZoomInOutButtonsProps } from '../types';

export const DrawFullScreenActionButton = ({ isFullScreen = false, onClick }: DrawFullScreenActionButtonProps) => (
    <div className="tw-invisible group-hover:tw-visible tw-absolute tw-top-4 tw-right-4">
        <Button
            icon={isFullScreen ? <IconCross /> : <IconArrowExpand />}
            style={ButtonStyle.Secondary}
            onClick={onClick}
        />
    </div>
);

export const DrawZoomInOutButtons = ({ onClickZoomIn, onClickZoomOut }: DrawZoomInOutButtonsProps) => (
    <div className="tw-invisible group-hover:tw-visible tw-absolute tw-bottom-4 tw-right-4 tw-rounded tw-bg-black-90">
        <Button icon={<IconPlus />} onClick={onClickZoomOut} data-test-id="zoom-out" />
        <Button icon={<IconMinus />} onClick={onClickZoomIn} data-test-id="zoom-in" />
    </div>
);
