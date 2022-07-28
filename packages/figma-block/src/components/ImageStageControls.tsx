/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, ButtonStyle, IconAddSimple, IconExpand, IconMinus, IconReject } from '@frontify/fondue';
import { DrawFullScreenActionButtonProps, DrawZoomInOutButtonsProps } from '../types';

export const DrawFullScreenActionButton = ({ isFullScreen = false, onClick }: DrawFullScreenActionButtonProps) => (
    <div className="tw-absolute tw-top-4 tw-right-4">
        <Button icon={isFullScreen ? <IconReject /> : <IconExpand />} style={ButtonStyle.Secondary} onClick={onClick} />
    </div>
);

export const DrawZoomInOutButtons = ({ onClickZoomIn, onClickZoomOut }: DrawZoomInOutButtonsProps) => (
    <div className="tw-absolute tw-bottom-4 tw-right-4 tw-rounded tw-bg-black-90">
        <Button icon={<IconAddSimple />} onClick={onClickZoomOut} data-test-id="zoom-out" />
        <Button icon={<IconMinus />} onClick={onClickZoomIn} data-test-id="zoom-in" />
    </div>
);
