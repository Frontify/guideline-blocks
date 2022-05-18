import { SyntheticEvent } from 'react';
import { joinClassNames } from '@frontify/guideline-blocks-shared';
import { Button, ButtonGroup, ButtonSize, IconAddSimple, IconMinus } from '@frontify/arcade';
import { useImageStage } from './useImageStage';

type ImageStageProps = {
    title: string | undefined;
    url: string;
    showBorder?: boolean;
};

export const ImageStage = (props: ImageStageProps) => {
    const {
        wrapperRef,
        stageRef,
        imageContainerRef,
        onZoomIn,
        onZoomOut,
        onMouseOver,
        onMouseDown,
        setImageBoundingClientRect,
    } = useImageStage();
    const { title, url, showBorder } = props;

    return (
        <div
            ref={wrapperRef}
            className={joinClassNames([
                'tw-w-full tw-relative tw-overflow-hidden tw-bg-black-20 tw-border',
                showBorder ? 'tw-border-black-40' : 'tw-border-transparent',
            ])}
        >
            <div ref={stageRef} className="tw-relative tw-overflow-hidden tw-h-[400px]">
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
            <div className="tw-absolute tw-top-4 tw-right-4">
                <ButtonGroup size={ButtonSize.Medium}>
                    <Button icon={<IconAddSimple />} onClick={onZoomOut} />
                    <Button icon={<IconMinus />} onClick={onZoomIn} />
                </ButtonGroup>
            </div>
        </div>
    );
};
