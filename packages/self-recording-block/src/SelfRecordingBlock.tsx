/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';
import { merge } from '@frontify/fondue';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { useBlockAssets, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { borderStyleMap, toRgbaString } from '@frontify/guideline-blocks-shared';

import { radiusClassMap } from './constants';
import { RecordingMode, Settings } from './types';
import { AudioPlayer, AudioRecorder, VideoPlayer, VideoRecorder } from './components';

export const SelfRecordingBlock: FC<BlockProps> = ({ appBridge }) => {
    const isEditing = useEditorState(appBridge);
    const [blockSettings] = useBlockSettings<Settings>(appBridge);
    const isAudioAndCamera = blockSettings.recordingMode === RecordingMode.CameraAndAudio;
    const { blockAssets, updateAssetIdsFromKey } = useBlockAssets(appBridge);
    const { hasBorder, hasRadius, radiusChoice, radiusValue, borderColor, borderStyle, borderWidth } = blockSettings;
    const onVideoRecordingEnd = (assetIds: number[]) => {
        updateAssetIdsFromKey('video', assetIds);
    };
    const onAudioRecordingEnd = (assetIds: number[]) => {
        updateAssetIdsFromKey('audio', assetIds);
    };
    const mediaRecorder = isAudioAndCamera ? (
        <VideoRecorder
            onRecordingEnd={onVideoRecordingEnd}
            size={blockSettings.size}
            cameraDeviceId={blockSettings.cameraDeviceId}
            microphoneDeviceId={blockSettings.microphoneDeviceId}
            videoOptions={{
                videoMode: blockSettings.videoMode,
                backgroundAssetUrl: blockAssets.customBackgroundAsset?.[0]?.previewUrl,
            }}
        />
    ) : (
        <AudioRecorder onRecordingEnd={onAudioRecordingEnd} microphoneDeviceId={blockSettings.microphoneDeviceId} />
    );
    const mediaPlayer = isAudioAndCamera ? (
        <VideoPlayer asset={blockAssets?.video?.[0]} />
    ) : (
        <AudioPlayer asset={blockAssets?.audio?.[0]} />
    );

    return (
        <div
            style={{
                ...(hasBorder
                    ? { borderStyle: borderStyleMap[borderStyle], borderWidth, borderColor: toRgbaString(borderColor) }
                    : {}),
                borderRadius: hasRadius ? radiusValue : '',
            }}
            className={merge([!hasRadius && radiusClassMap[radiusChoice]])}
        >
            {isEditing ? mediaRecorder : mediaPlayer}
        </div>
    );
};
