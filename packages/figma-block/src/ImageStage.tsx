/* (c) Copyright Frontify Ltd., all rights reserved. */

import { joinClassNames } from '@frontify/guideline-blocks-shared';
import { DrawFullScreenActionButton, DrawZoomInOutButtons } from './components';
import { getBorderOfBlock } from './helpers';
import { DEFAULT_HEIGHT } from './settings';
import { ImageStageProps } from './types';
import { useImageStage } from './useImageStage';

export const ImageStage = ({
    title,
    url,
    hasLimitedOptions = true,
    height = DEFAULT_HEIGHT,
    hasBorder = false,
    hasBackground = false,
    isMobile = false,
    borderColor,
    borderStyle,
    borderWidth,
}: ImageStageProps) => {
    const { stageRef, containerRef, imageRef, isFullScreen, setIsFullScreen, onZoomIn, onZoomOut, setIsImageLoaded } =
        useImageStage({ height, hasLimitedOptions, isMobile });

    return (
        <div
            style={{
                border: getBorderOfBlock(hasBorder, borderStyle, borderWidth, borderColor),
            }}
            className={joinClassNames([
                isFullScreen && 'tw-fixed tw-border-do tw-top-0 tw-left-0 tw-w-full tw-h-full tw-z-[200]',
                hasBackground ? 'tw-bg-black-5' : 'tw-bg-white',
            ])}
        >
            <div className="tw-group tw-w-full tw-relative tw-overflow-hidden">
                <div ref={stageRef} className="tw-relative tw-overflow-hidden">
                    <div ref={containerRef}>
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
                {!hasLimitedOptions && (
                    <>
                        <DrawFullScreenActionButton
                            isFullScreen={isFullScreen}
                            onClick={() => setIsFullScreen(!isFullScreen)}
                        />
                        <DrawZoomInOutButtons onClickZoomIn={onZoomIn} onClickZoomOut={onZoomOut} />
                    </>
                )}
            </div>
        </div>
    );
};
