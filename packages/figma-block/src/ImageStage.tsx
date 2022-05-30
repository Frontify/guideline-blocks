import { joinClassNames } from '@frontify/guideline-blocks-shared';
import { DrawFullScreenActionButton, DrawZoomInOutButtons } from './components';
import { useImageStage } from './useImageStage';
import { DEFAULT_HEIGHT } from './settings';
import { ImageStageProps } from './types';

export const ImageStage = ({
    title,
    url,
    isImageTypeVector = true,
    height = DEFAULT_HEIGHT,
    hasBorder = false,
    hasBackground = false,
}: ImageStageProps) => {
    const { stageRef, containerRef, imageRef, isFullScreen, setIsFullScreen, onZoomIn, onZoomOut, setIsImageLoaded } =
        useImageStage({ height, isImageTypeVector });

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
                            className="tw-relative tw-invisible"
                            width="100%"
                            height="100%"
                            onLoad={() => setIsImageLoaded(true)}
                        />
                    </div>
                </div>
                {isImageTypeVector && (
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
