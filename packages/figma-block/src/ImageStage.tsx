/* (c) Copyright Frontify Ltd., all rights reserved. */

import { toHex8String, radiusStyleMap } from '@frontify/guideline-blocks-settings';

import { FullscreenOverlay } from './FullscreenOverlay';
import { DrawFullScreenActionButton, DrawZoomInOutButtons } from './components/ImageStageControls';
import { getBorderOfBlock } from './helpers/mapCommonStyle';
import { useImageStage } from './hooks/useImageStage';
import { DEFAULT_HEIGHT } from './settings';
import { type ImageStageProps } from './types';

export const ImageStage = ({
    title,
    url,
    hasLimitedOptions = true,
    height = DEFAULT_HEIGHT,
    hasBorder = false,
    hasBackground = false,
    isMobile = false,
    backgroundColor,
    borderColor,
    borderStyle,
    borderWidth,
    hasRadius,
    radiusChoice,
    radiusValue,
    allowFullScreen,
    allowZooming,
}: ImageStageProps) => {
    const { stageRef, containerRef, imageRef, isFullScreen, setIsFullScreen, onZoomIn, onZoomOut, setIsImageLoaded } =
        useImageStage({ height, hasLimitedOptions, isMobile });

    return (
        <FullscreenOverlay isFullScreen={isFullScreen} onClose={() => setIsFullScreen(false)}>
            <div
                style={{
                    border: getBorderOfBlock(hasBorder, borderStyle, borderWidth, borderColor),
                    borderRadius: hasRadius ? radiusValue : radiusStyleMap[radiusChoice],
                    backgroundColor: hasBackground && backgroundColor ? toHex8String(backgroundColor) : 'white',
                }}
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
                            {allowFullScreen && (
                                <DrawFullScreenActionButton
                                    isFullScreen={isFullScreen}
                                    onClick={() => setIsFullScreen(!isFullScreen)}
                                />
                            )}
                            {allowZooming && (
                                <DrawZoomInOutButtons
                                    isFullScreen={isFullScreen}
                                    onClickZoomIn={onZoomIn}
                                    onClickZoomOut={onZoomOut}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>
        </FullscreenOverlay>
    );
};
