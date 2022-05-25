import { joinClassNames } from '@frontify/guideline-blocks-shared';
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
import { useMediaStage } from './useMediaStage';
import { DEFAULT_HEIGHT } from './settings';
import { DrawFullScreenActionButtonProps, DrawZoomInOutButtonsProps, MediaStageProps } from './types';

const DrawFullScreenActionButton = ({ isFullScreen, onClick }: DrawFullScreenActionButtonProps) => (
    <div className="tw-absolute tw-top-4 tw-right-4">
        <Button icon={isFullScreen ? <IconReject /> : <IconExpand />} style={ButtonStyle.Secondary} onClick={onClick} />
    </div>
);

const DrawZoomInOutButtons = ({ onClickZoomIn, onClickZoomOut }: DrawZoomInOutButtonsProps) => (
    <div className="tw-absolute tw-top-4 tw-left-4">
        <ButtonGroup size={ButtonSize.Medium}>
            <Button icon={<IconAddSimple />} onClick={onClickZoomOut} />
            <Button icon={<IconMinus />} onClick={onClickZoomIn} />
        </ButtonGroup>
    </div>
);

export const MediaStage = ({
    title,
    url,
    height = DEFAULT_HEIGHT,
    hasBorder = false,
    hasBackground = false,
}: MediaStageProps) => {
    const { stageRef, containerRef, imageRef, isFullScreen, setIsFullScreen, onZoomIn, onZoomOut, setIsImageLoaded } =
        useMediaStage({ height });

    return (
        <div
            className={joinClassNames([
                'tw-border',
                isFullScreen && 'tw-fixed tw-top-0 tw-left-0 tw-w-full tw-h-full tw-z-[10000]',
                hasBackground ? 'tw-bg-black-20' : 'tw-bg-white',
                hasBorder ? 'tw-border-black-40' : 'tw-border-transparent',
            ])}
        >
            <div className="tw-w-full tw-relative tw-overflow-hidden">
                <div ref={stageRef} className="tw-relative tw-overflow-hidden" style={{ height }}>
                    <div className="tw-absolute" ref={containerRef}>
                        <img
                            ref={imageRef}
                            alt={title}
                            src={url}
                            className="tw-relative"
                            width="100%"
                            height="100%"
                            onLoad={() => setIsImageLoaded(true)}
                        />
                    </div>
                </div>
                <DrawFullScreenActionButton
                    isFullScreen={isFullScreen}
                    onClick={() => setIsFullScreen(!isFullScreen)}
                />
                <DrawZoomInOutButtons onClickZoomIn={onZoomIn} onClickZoomOut={onZoomOut} />
            </div>
        </div>
    );
};
