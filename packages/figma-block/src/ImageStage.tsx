/* (c) Copyright Frontify Ltd., all rights reserved. */

import { toHex8String, radiusStyleMap } from '@frontify/guideline-blocks-settings';

import { FullscreenOverlay } from './components/FullscreenOverlay';
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

    const resolvedBorderRadius = hasRadius ? radiusValue : radiusStyleMap[radiusChoice];
    const resolvedBackgroundColor = hasBackground && backgroundColor ? toHex8String(backgroundColor) : 'white';
    const resolvedBorder = getBorderOfBlock(hasBorder, borderStyle, borderWidth, borderColor);

    return (
        <FullscreenOverlay isFullScreen={isFullScreen} onClose={() => setIsFullScreen(false)}>
            <div
                className="tw-relative tw-overflow-visible"
                style={{
                    backgroundColor: resolvedBackgroundColor,
                    borderRadius: resolvedBorderRadius,
                }}
            >
                <div className="tw-group tw-relative tw-w-full tw-overflow-visible">
                    <div
                        ref={stageRef}
                        className="tw-relative tw-z-0 tw-overflow-hidden"
                        style={{
                            borderRadius: resolvedBorderRadius,
                            backgroundColor: resolvedBackgroundColor,
                        }}
                    >
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

                        <div
                            className="tw-pointer-events-none tw-absolute tw-inset-0 tw-z-10"
                            style={{
                                border: resolvedBorder,
                                borderRadius: resolvedBorderRadius,
                            }}
                        />
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
