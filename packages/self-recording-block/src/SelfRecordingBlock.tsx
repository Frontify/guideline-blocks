/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';
import { merge } from '@frontify/fondue';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { useBlockAssets, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { borderStyleMap, toRgbaString } from '@frontify/guideline-blocks-shared';

import { radiusClassMap } from './constants';
import { Settings } from './types';
import { VideoPlayer, VideoRecorder } from './components';

export const SelfRecordingBlock: FC<BlockProps> = ({ appBridge }) => {
    const editorState = useEditorState(appBridge);
    const [blockSettings] = useBlockSettings<Settings>(appBridge);
    const { blockAssets, updateAssetIdsFromKey } = useBlockAssets(appBridge);
    const { hasBorder, hasRadius, radiusChoice, radiusValue, borderColor, borderStyle, borderWidth } = blockSettings;

    const onRecordingEnd = (assetIds: number[]) => {
        updateAssetIdsFromKey('video', assetIds);
    };

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
            {editorState ? (
                <VideoRecorder
                    onRecordingEnd={onRecordingEnd}
                    size={blockSettings.size}
                    cameraDeviceId={blockSettings.cameraDeviceId}
                    microphoneDeviceId={blockSettings.microphoneDeviceId}
                />
            ) : (
                <VideoPlayer asset={blockAssets?.video?.[0]} />
            )}
        </div>
    );
};
