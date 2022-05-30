import {
    Button,
    ButtonGroup,
    ButtonSize,
    ButtonStyle,
    IconAddSimple,
    IconExpand,
    IconMinus,
    IconReject,
} from '@frontify/arcade';
import { DrawFullScreenActionButtonProps, DrawZoomInOutButtonsProps } from '../types';

export const DrawFullScreenActionButton = ({ isFullScreen, onClick }: DrawFullScreenActionButtonProps) => (
    <div className="tw-absolute tw-top-4 tw-right-4">
        <Button icon={isFullScreen ? <IconReject /> : <IconExpand />} style={ButtonStyle.Secondary} onClick={onClick} />
    </div>
);

export const DrawZoomInOutButtons = ({ onClickZoomIn, onClickZoomOut }: DrawZoomInOutButtonsProps) => (
    <div className="tw-absolute tw-top-4 tw-left-4">
        <ButtonGroup size={ButtonSize.Medium}>
            <Button icon={<IconAddSimple />} onClick={onClickZoomOut} />
            <Button icon={<IconMinus />} onClick={onClickZoomIn} />
        </ButtonGroup>
    </div>
);
