/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    Button,
    ButtonEmphasis,
    ButtonSize,
    IconCross16,
    IconPause16,
    IconPlay16,
    IconTrashBin16,
    Tooltip,
    TooltipPosition,
} from '@frontify/fondue';
import { ReactElement } from 'react';
import { RecorderState } from '../types';

type RecorderToolbarProps = {
    state: RecorderState;
    onStartRecordingClick: () => void;
    onStopRecordingClick: () => void;
    onPauseClick: () => void;
    onResumeClick: () => void;
    onDeleteClick: () => void;
    onCancelClick: () => void;
};

export const RecorderToolbar = ({
    state,
    onStartRecordingClick,
    onStopRecordingClick,
    onPauseClick,
    onResumeClick,
    onDeleteClick,
    onCancelClick,
}: RecorderToolbarProps): ReactElement => {
    return (
        <div className="tw-flex tw-gap-1 tw-p-1 tw-bg-base tw-rounded-lg tw-items-center tw-shadow tw-divide-x tw-divide-box-selected tw-border tw-border-box-selected">
            {state === 'idle' ? (
                <Button
                    emphasis={ButtonEmphasis.Weak}
                    icon={
                        <div className="tw-min-h-[8px] tw-min-w-[8px] tw-h-2 tw-w-2 tw-rounded-full tw-cursor-pointer tw-bg-box-negative-strong group-hover:tw-bg-box-negative-strong-hover group-active:tw-bg-box-negative-strong-pressed" />
                    }
                    onClick={onStartRecordingClick}
                    aria-label="Start recording"
                    size={ButtonSize.Medium}
                >
                    Start recording
                </Button>
            ) : null}

            {state === 'uploading' ? (
                <Button disabled emphasis={ButtonEmphasis.Weak} aria-label="Uploading..." size={ButtonSize.Medium}>
                    Uploading...
                </Button>
            ) : null}

            {['recording', 'paused'].includes(state) ? (
                <Button
                    emphasis={ButtonEmphasis.Weak}
                    icon={
                        <div className="tw-min-h-[8px] tw-min-w-[8px] tw-h-2 tw-w-2 tw-rounded-[2px] tw-cursor-pointer tw-bg-box-negative-strong group-hover:tw-bg-box-negative-strong-hover group-active:tw-bg-box-negative-strong-pressed" />
                    }
                    onClick={onStopRecordingClick}
                    aria-label="Stop recording"
                    size={ButtonSize.Medium}
                >
                    Stop recording
                </Button>
            ) : null}

            <div className="first:tw-pl-2 tw-flex tw-gap-1">
                {state === 'idle' ? (
                    <Tooltip
                        withArrow
                        content="Cancel"
                        position={TooltipPosition.Bottom}
                        enterDelay={800}
                        triggerElement={
                            <Button
                                emphasis={ButtonEmphasis.Weak}
                                icon={<IconCross16 />}
                                onClick={onCancelClick}
                                aria-label="Cancel"
                            />
                        }
                    />
                ) : null}

                {state === 'recording' ? (
                    <Tooltip
                        withArrow
                        content="Pause"
                        position={TooltipPosition.Bottom}
                        enterDelay={800}
                        triggerElement={
                            <Button
                                emphasis={ButtonEmphasis.Weak}
                                icon={<IconPause16 />}
                                onClick={onPauseClick}
                                aria-label="Pause"
                            />
                        }
                    />
                ) : null}

                {state === 'paused' ? (
                    <Tooltip
                        withArrow
                        content="Resume"
                        position={TooltipPosition.Bottom}
                        enterDelay={800}
                        triggerElement={
                            <Button
                                emphasis={ButtonEmphasis.Weak}
                                icon={<IconPlay16 />}
                                onClick={onResumeClick}
                                aria-label="Resume"
                            />
                        }
                    />
                ) : null}

                {['countdown', 'recording', 'paused', 'previewing'].includes(state) ? (
                    <Tooltip
                        withArrow
                        content="Delete"
                        position={TooltipPosition.Bottom}
                        enterDelay={800}
                        triggerElement={
                            <Button
                                emphasis={ButtonEmphasis.Weak}
                                icon={<IconTrashBin16 />}
                                onClick={onDeleteClick}
                                aria-label="Delete"
                            />
                        }
                    />
                ) : null}
            </div>
        </div>
    );
};
