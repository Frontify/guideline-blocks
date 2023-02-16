/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, ButtonEmphasis, IconPause16, IconPlay16 } from '@frontify/fondue';

type PlayerToolbarProps = {
    isPlaying: boolean;
    onPlayPauseClicked: () => void;
    time: string;
};

export const PlayerToolbar = ({ isPlaying, onPlayPauseClicked, time }: PlayerToolbarProps) => {
    return (
        <div className="tw-flex tw-gap-1 tw-p-1 tw-bg-base tw-rounded-lg tw-items-center tw-shadow tw-divide-x tw-divide-box-selected tw-border tw-border-box-selected">
            <Button
                emphasis={ButtonEmphasis.Weak}
                icon={isPlaying ? <IconPause16 /> : <IconPlay16 />}
                onClick={onPlayPauseClicked}
            />
            <div>{time}</div>
        </div>
    );
};
