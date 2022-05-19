import { SyntheticEvent } from 'react';
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
import { useImageStage } from './useImageStage';
import { DrawFullScreenActionButtonProps, DrawZoomInOutButtonsProps, ImageStageProps } from './types';

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

export const ImageStage = ({
    title,
    url,
    hasBorder = false,
    height = '300px',
    hasBackground = false,
}: ImageStageProps) => {
    const {
        stageRef,
        imageContainerRef,
        onZoomIn,
        onZoomOut,
        onMouseOver,
        onMouseDown,
        setImageBoundingClientRect,
        isFullScreen,
        setIsFullScreen,
    } = useImageStage();
    // console.log('hasBackground | hasBorder | height', hasBackground, hasBorder, height);

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
                    <div className="tw-absolute" ref={imageContainerRef}>
                        <img
                            alt={title}
                            src={url}
                            className="tw-relative"
                            width="100%"
                            height="100%"
                            onMouseDown={onMouseDown}
                            onMouseOver={onMouseOver}
                            onLoad={(event: SyntheticEvent<HTMLImageElement>) =>
                                setImageBoundingClientRect((event.target as HTMLImageElement).getBoundingClientRect())
                            }
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
