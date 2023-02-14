/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    Button,
    ButtonEmphasis,
    ButtonRounding,
    IconArrowRoundAntiClockwise16,
    IconPause16,
    IconPlay16,
    IconTrashBin16,
    LoadingCircle,
    LoadingCircleSize,
    Tooltip,
    TooltipPosition,
} from '@frontify/fondue';
import { ReactElement } from 'react';

type VideoRecorderToolbarProps = {
    state: 'idle' | 'recording' | 'paused' | 'previewing' | 'uploading';
    onStartClick: () => void;
    onDeleteClick: () => void;
    onRestartClick: () => void;
    onResumeClick: () => void;
    onPauseClick: () => void;
    onStopClick: () => void;
};

export const VideoRecorderToolbar = ({
    state,
    onStartClick,
    onDeleteClick,
    onRestartClick,
    onResumeClick,
    onPauseClick,
    onStopClick,
}: VideoRecorderToolbarProps): ReactElement => {
    return (
        <div className="tw-flex tw-gap-2 tw-px-2 tw-py-1 tw-bg-box-neutral tw-rounded-lg">
            {state === 'idle' ? (
                <Tooltip
                    content="Start recording"
                    position={TooltipPosition.Top}
                    enterDelay={800}
                    triggerElement={
                        <Button
                            rounding={ButtonRounding.Full}
                            emphasis={ButtonEmphasis.Weak}
                            icon={
                                <div className="tw-min-h-[16px] tw-min-w-[16px] tw-h-4 tw-w-4 tw-rounded-full tw-cursor-pointer tw-bg-box-negative-strong group-hover:tw-bg-box-negative-strong-hover group-active:tw-bg-box-negative-strong-pressed" />
                            }
                            onClick={onStartClick}
                            aria-label="Start recording"
                        />
                    }
                />
            ) : null}

            {state === 'uploading' ? (
                <div className="tw-inline-flex tw-items-center tw-justify-center tw-px-2">
                    <LoadingCircle size={LoadingCircleSize.Small} />
                </div>
            ) : null}

            {['recording', 'paused'].includes(state) ? (
                <Tooltip
                    content="Stop recording"
                    position={TooltipPosition.Top}
                    enterDelay={800}
                    triggerElement={
                        <Button
                            rounding={ButtonRounding.Full}
                            emphasis={ButtonEmphasis.Weak}
                            icon={
                                <div className="tw-min-h-[16px] tw-min-w-[16px] tw-h-4 tw-w-4 tw-rounded tw-cursor-pointer tw-bg-button-icon group-hover:tw-bg-button-icon-hover group-active:tw-bg-button-icon-pressed" />
                            }
                            onClick={onStopClick}
                            aria-label="Stop recording"
                        />
                    }
                />
            ) : null}

            <Tooltip
                content="Restart recording"
                position={TooltipPosition.Top}
                enterDelay={800}
                disabled={!['recording', 'paused'].includes(state) || state === 'uploading'}
                triggerElement={
                    <Button
                        rounding={ButtonRounding.Full}
                        emphasis={ButtonEmphasis.Weak}
                        icon={<IconArrowRoundAntiClockwise16 />}
                        disabled={!['recording', 'paused'].includes(state) || state === 'uploading'}
                        onClick={onRestartClick}
                        aria-label="Restart recording"
                    />
                }
            />

            {state === 'paused' ? (
                <Tooltip
                    content="Resume recording"
                    position={TooltipPosition.Top}
                    enterDelay={800}
                    triggerElement={
                        <Button
                            rounding={ButtonRounding.Full}
                            emphasis={ButtonEmphasis.Weak}
                            icon={<IconPlay16 />}
                            onClick={onResumeClick}
                            aria-label="Resume recording"
                        />
                    }
                />
            ) : (
                <Tooltip
                    content="Pause recording"
                    position={TooltipPosition.Top}
                    enterDelay={800}
                    disabled={['idle', 'paused', 'uploading'].includes(state)}
                    triggerElement={
                        <Button
                            rounding={ButtonRounding.Full}
                            emphasis={ButtonEmphasis.Weak}
                            icon={<IconPause16 />}
                            onClick={onPauseClick}
                            disabled={['idle', 'paused', 'uploading'].includes(state)}
                            aria-label="Pause recording"
                        />
                    }
                />
            )}

            {state === 'previewing' ? (
                <Tooltip
                    content="Delete saved recording"
                    position={TooltipPosition.Top}
                    enterDelay={800}
                    triggerElement={
                        <Button
                            rounding={ButtonRounding.Full}
                            emphasis={ButtonEmphasis.Weak}
                            icon={<IconTrashBin16 />}
                            onClick={onDeleteClick}
                            aria-label="Delete saved recording"
                        />
                    }
                />
            ) : null}
        </div>
    );
};
