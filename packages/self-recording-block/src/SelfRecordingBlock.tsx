/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { useBlockAssets, useBlockSettings, useEditorState } from '@frontify/app-bridge';

import { RecordingMode, Settings } from './types';
import { MaskProps, Player as Player, Recorder as Recorder } from './components';

export const SelfRecordingBlock: FC<BlockProps> = ({ appBridge }) => {
    const [avatarImageUrl, setAvatarImageUrl] = useState<string>('/img/favicon-nook.png');
    const isEditing = useEditorState(appBridge);
    const { blockAssets, updateAssetIdsFromKey } = useBlockAssets(appBridge);
    const [blockSettings] = useBlockSettings<Settings>(appBridge);

    const onRecordingEnd = useCallback(
        async (assetId: number) => {
            await updateAssetIdsFromKey('video', []);
            await updateAssetIdsFromKey('video', [assetId]);
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

    useEffect(() => {
        const getAvatarImageUrl = async () => {
            if (blockAssets.cameraAsset?.[0]?.previewUrl) {
                setAvatarImageUrl(blockAssets.cameraAsset?.[0]?.previewUrl);
            } else {
                const avatar = await appBridge.getCurrentLoggedUser();
                setAvatarImageUrl(avatar.image.image || '/img/favicon-nook.png');
            }
        };

        if (blockSettings.recordingMode === RecordingMode.AudioOnly) {
            getAvatarImageUrl();
        }
    }, [appBridge, blockAssets.cameraAsset, blockSettings.recordingMode]);

    return isEditing ? (
        <Recorder
            recordingMode={blockSettings.recordingMode}
            onRecordingEnd={onRecordingEnd}
            size={blockSettings.size}
            cameraDeviceId={blockSettings.cameraDeviceId}
            microphoneDeviceId={blockSettings.microphoneDeviceId}
            videoOptions={videoOptions}
            maskShape={blockSettings.shape}
            maskBorder={maskBorder}
            avatarImageUrl={avatarImageUrl}
        />
    ) : (
        <Player asset={blockAssets?.video?.[0]} />
    );
};
