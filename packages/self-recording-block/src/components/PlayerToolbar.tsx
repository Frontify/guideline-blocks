/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    Button,
    ButtonEmphasis,
    Dropdown,
    DropdownSize,
    IconPause16,
    IconPlay16,
    Text,
    TriggerEmphasis,
} from '@frontify/fondue';
import { AVAILABLE_PLAYBACK_SPEEDS } from '../constants';

type PlayerToolbarProps = {
    isPlaying: boolean;
    onPlayPauseClicked: () => void;
    time: string;
    playSpeed: number;
    onPlaySpeedSelected: (playbackSpeed: number) => void;
};

export const PlayerToolbar = ({
    isPlaying,
    onPlayPauseClicked,
    time,
    playSpeed,
    onPlaySpeedSelected,
}: PlayerToolbarProps) => (
    <div className="tw-flex tw-gap-1 tw-bg-base tw-rounded-lg tw-items-center tw-shadow tw-divide-x tw-divide-box-selected tw-border tw-border-box-selected tw-p-1 tw-pr-3">
        <Button
            emphasis={ButtonEmphasis.Weak}
            icon={isPlaying ? <IconPause16 /> : <IconPlay16 />}
            onClick={onPlayPauseClicked}
        />
        <Dropdown
            emphasis={TriggerEmphasis.Weak}
            menuBlocks={[
                {
                    ariaLabel: 'playback speed',
                    id: 'playbackSpeed',
                    menuItems: AVAILABLE_PLAYBACK_SPEEDS.map((value) => {
                        return {
                            id: value,
                            title: `${value}x`,
                        };
                    }),
                },
            ]}
            activeItemId={playSpeed.toString()}
            onChange={(speed) => {
                onPlaySpeedSelected(parseFloat(speed as string));
            }}
            size={DropdownSize.Small}
        />
        <Text>{time}</Text>
    </div>
);
