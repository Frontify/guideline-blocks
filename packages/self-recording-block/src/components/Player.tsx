/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Asset } from '@frontify/app-bridge';
import { useCallback, useRef, useState } from 'react';
import { cameraSizeToMaskSizeMap } from '../constants';
import { CameraSize, MaskShape } from '../types';
import { getTimeStringFromTimeStamp } from '../utilities/getTimeStringFromTimeStamp';
import { Mask, MaskProps } from './Mask';
import { PlayerToolbar } from './PlayerToolbar';

type PlayerProps = {
    asset?: Asset;
    size: CameraSize;
    maskShape: MaskShape;
    maskBorder: MaskProps['border'];
};

export const Player = ({ asset, size, maskShape, maskBorder }: PlayerProps) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [playTime, setPlayTime] = useState('');

    const toggleVideo = useCallback(() => {
        if (isPlaying) {
            videoRef?.current?.pause();
            setIsPlaying(false);
        } else {
            videoRef?.current?.play();
            setIsPlaying(true);
        }
    }, [isPlaying]);

    return (
        <div className="tw-flex tw-flex-col tw-items-center tw-font-sans">
            <Mask shape={maskShape} size={size} border={maskBorder}>
                {asset !== undefined ? (
                    <video
                        onPlay={() => {
                            setIsPlaying(true);
                        }}
                        onEnded={() => {
                            setIsPlaying(false);
                        }}
                        onTimeUpdate={(event) => {
                            setPlayTime(getTimeStringFromTimeStamp((event.target as HTMLVideoElement).currentTime));
                        }}
                        onLoadedMetadata={(event) => {
                            setPlayTime(getTimeStringFromTimeStamp((event.target as HTMLVideoElement).duration));
                        }}
                        ref={videoRef}
                        style={{
                            width: cameraSizeToMaskSizeMap[size].width,
                            height: cameraSizeToMaskSizeMap[size].height,
                        }}
                        className="tw-max-w-none"
                        src={
                            asset.previewUrl.indexOf('?') > 0
                                ? `${asset.previewUrl}&format=mp4`
                                : `${asset.previewUrl}?format=mp4`
                        }
                    />
                ) : null}
            </Mask>

            <div className="tw-mt-6">
                <PlayerToolbar isPlaying={isPlaying} onPlayPauseClicked={toggleVideo} time={playTime} />
            </div>
        </div>
    );
};
