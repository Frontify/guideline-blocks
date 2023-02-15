/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC, useCallback, useMemo } from 'react';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { useBlockAssets, useBlockSettings, useEditorState } from '@frontify/app-bridge';

import { RecordingMode, Settings } from './types';
import { AudioPlayer, AudioRecorder, MaskProps, VideoPlayer, VideoRecorder } from './components';

export const SelfRecordingBlock: FC<BlockProps> = ({ appBridge }) => {
    const isEditing = useEditorState(appBridge);
    const { blockAssets, updateAssetIdsFromKey } = useBlockAssets(appBridge);
    const [blockSettings] = useBlockSettings<Settings>(appBridge);

    const isAudioAndCamera = blockSettings.recordingMode === RecordingMode.CameraAndAudio;

    const onVideoRecordingEnd = useCallback(
        async (assetIds: number[]) => {
            await updateAssetIdsFromKey('video', assetIds);
        },
        [updateAssetIdsFromKey]
    );

    const onAudioRecordingEnd = useCallback(
        async (assetIds: number[]) => {
            await updateAssetIdsFromKey('audio', assetIds);
        },
        [updateAssetIdsFromKey]
    );

    const maskBorder: MaskProps['border'] = {
        hasBorder: blockSettings.hasBorder,
        hasRadius: blockSettings.hasRadius,
        radiusChoice: blockSettings.radiusChoice,
        radiusValue: blockSettings.radiusValue,
        borderColor: blockSettings.borderColor,
        borderStyle: blockSettings.borderStyle,
        borderWidth: blockSettings.borderWidth,
    };

    const videoOptions = useMemo(
        () => ({
            videoMode: blockSettings.videoMode,
            backgroundAssetUrl: blockAssets.customBackgroundAsset?.[0]?.previewUrl,
        }),
        [blockAssets.customBackgroundAsset, blockSettings.videoMode]
    );

    const mediaRecorder = isAudioAndCamera ? (
        <VideoRecorder
            onRecordingEnd={onVideoRecordingEnd}
            size={blockSettings.size}
            cameraDeviceId={blockSettings.cameraDeviceId}
            microphoneDeviceId={blockSettings.microphoneDeviceId}
            videoOptions={videoOptions}
            maskShape={blockSettings.shape}
            maskBorder={maskBorder}
        />
    ) : (
        <AudioRecorder onRecordingEnd={onAudioRecordingEnd} microphoneDeviceId={blockSettings.microphoneDeviceId} />
    );

    const mediaPlayer = isAudioAndCamera ? (
        <VideoPlayer asset={blockAssets?.video?.[0]} />
    ) : (
        <AudioPlayer asset={blockAssets?.audio?.[0]} />
    );

    return isEditing ? mediaRecorder : mediaPlayer;
};
