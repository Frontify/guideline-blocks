/* (c) Copyright Frontify Ltd., all rights reserved. */

import { joinClassNames, useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';
import '@frontify/fondue-tokens/styles';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { ReactElement, useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import {
    useBlockAssets,
    useBlockSettings,
    useEditorState,
    useBulkDownload,
    BulkDownloadState,
} from '@frontify/app-bridge';
import { ASSET_SETTINGS_ID } from './settings';
import { Settings } from './types';
import { AssetGrid, AssetSelection, DownloadMessage, InformationSection } from './components';
import { blockStyle } from './helpers';

export const AssetKitBlock = ({ appBridge }: BlockProps): ReactElement => {
    const { designTokens } = useGuidelineDesignTokens();
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState(appBridge);
    const { blockAssets, addAssetIdsToKey, deleteAssetIdsFromKey, updateAssetIdsFromKey } = useBlockAssets(appBridge);
    const [isUploadingAssets, setIsUploadingAssets] = useState<boolean>(false);
    const { title, description, hasBorder_blocks, hasBackgroundBlocks, downloadUrlBlock } = blockSettings;
    const currentAssets = blockAssets[ASSET_SETTINGS_ID] ?? [];
    const { generateBulkDownload, status, downloadUrl } = useBulkDownload(appBridge);

    const downloadAssets = async () => {
        if (downloadUrlBlock) {
            window.open(downloadUrlBlock, '_blank');
        } else {
            generateBulkDownload(currentAssets.map((asset) => asset.id));
        }
    };

    const saveDownloadUrl = (newDownloadUrlBlock: string) => {
        if (downloadUrlBlock !== newDownloadUrlBlock) {
            setBlockSettings({ downloadUrlBlock: newDownloadUrlBlock });
        }
    };

    useEffect(() => {
        if (status === BulkDownloadState.Ready && downloadUrl) {
            window.open(downloadUrl, '_blank');
            saveDownloadUrl(downloadUrl);
        }
    }, [downloadUrl]);

    return (
        <div
            data-test-id="asset-kit-block"
            className={joinClassNames(['tw-w-full', (hasBorder_blocks || hasBackgroundBlocks) && 'tw-p-5 sm:tw-p-8'])}
            style={{
                ...blockStyle(blockSettings),
            }}
        >
            <div className="tw-mb-8 sm:tw-flex tw-gap-8 tw-space-y-3 md:tw-space-y-0">
                <InformationSection
                    description={description ?? ''}
                    isEditing={isEditing}
                    setBlockSettings={setBlockSettings}
                    title={title ?? ''}
                />
                <div className="tw-flex-none">
                    <button
                        data-test-id="asset-kit-block-download-button"
                        disabled={
                            [BulkDownloadState.Error, BulkDownloadState.Pending, BulkDownloadState.Started].includes(
                                status
                            ) || currentAssets.length <= 0
                        }
                        onClick={() => downloadAssets()}
                        style={designTokens.buttonPrimary}
                    >
                        Download package
                    </button>
                </div>
            </div>

            {![BulkDownloadState.Init, BulkDownloadState.Ready].includes(status) && (
                <DownloadMessage blockStyle={blockStyle(blockSettings)} status={BulkDownloadState.Error} />
            )}

            <AssetGrid
                appBridge={appBridge}
                currentAssets={currentAssets}
                deleteAssetIdsFromKey={deleteAssetIdsFromKey}
                updateAssetIdsFromKey={updateAssetIdsFromKey}
                saveDownloadUrl={saveDownloadUrl}
                isEditing={isEditing}
            />

            {isEditing && (
                <AssetSelection
                    appBridge={appBridge}
                    isUploadingAssets={isUploadingAssets}
                    setIsUploadingAssets={setIsUploadingAssets}
                    addAssetIdsToKey={addAssetIdsToKey}
                    saveDownloadUrl={saveDownloadUrl}
                    currentAssets={currentAssets}
                />
            )}
        </div>
    );
};
