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

import { DeleteFlyout } from './DeleteFlyout';
import { AVAILABLE_PLAYBACK_SPEEDS } from '../constants';

type PlayerToolbarProps = {
    isPlaying: boolean;
    onPlayPauseClicked: () => void;
    time: string;
    onDeleteClick?: () => void;
    playSpeed: number;
    onPlaySpeedSelected: (playbackSpeed: number) => void;
};

export const PlayerToolbar = ({
    isPlaying,
    onPlayPauseClicked,
    time,
    onDeleteClick,
    playSpeed,
    onPlaySpeedSelected,
}: PlayerToolbarProps) => (
    <div className="tw-flex tw-gap-1 tw-bg-base tw-rounded-lg tw-items-center tw-shadow tw-divide-x tw-divide-box-selected tw-border tw-border-box-selected tw-p-1">
        <div className="tw-flex tw-gap-1 tw-items-center tw-mr-2">
            <div>
                <Button
                    emphasis={ButtonEmphasis.Weak}
                    icon={isPlaying ? <IconPause16 /> : <IconPlay16 />}
                    onClick={onPlayPauseClicked}
                />
            </div>

            <div className="tw-flex tw-w-20">
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
            </div>

            <div className="tw-pl-2 tw-w-12">
                <Text>{time}</Text>
            </div>
        </div>
        {onDeleteClick ? (
            <div className="tw-pl-1">
                <DeleteFlyout onConfirm={onDeleteClick} />
            </div>
        ) : null}
    </div>
);
