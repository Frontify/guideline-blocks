/* (c) Copyright Frontify Ltd., all rights reserved. */

import { joinClassNames, useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';
import '@frontify/fondue-tokens/styles';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { ReactElement, useEffect, useRef, useState } from 'react';
import 'tailwindcss/tailwind.css';
import {
    BulkDownloadState,
    useBlockAssets,
    useBlockSettings,
    useBulkDownload,
    useEditorState,
} from '@frontify/app-bridge';
import { ASSET_SETTINGS_ID } from './settings';
import { Settings } from './types';
import { AssetGrid, AssetSelection, DownloadMessage, InformationSection } from './components';
import { blockStyle } from './helpers';

export const AssetKitBlock = ({ appBridge }: BlockProps): ReactElement => {
    const screenReaderRef = useRef<HTMLDivElement>(null);
    const { designTokens } = useGuidelineDesignTokens();
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState(appBridge);
    const { blockAssets, addAssetIdsToKey, deleteAssetIdsFromKey, updateAssetIdsFromKey } = useBlockAssets(appBridge);
    const [isUploadingAssets, setIsUploadingAssets] = useState<boolean>(false);
    const { title, description, hasBorder_blocks, hasBackgroundBlocks, downloadUrlBlock } = blockSettings;
    const currentAssets = blockAssets[ASSET_SETTINGS_ID] ?? [];
    const { generateBulkDownload, status, downloadUrl } = useBulkDownload(appBridge);

    const startDownload = () => {
        if (downloadUrlBlock) {
            downloadAssets(downloadUrlBlock);
        } else {
            generateBulkDownload(currentAssets.map((asset) => asset.id));
        }
    };

    const downloadAssets = (downloadUrl: string) => {
        window.open(downloadUrl, '_blank');
        announceToScreenReader();
    };

    const saveDownloadUrl = (newDownloadUrlBlock: string) => {
        if (downloadUrlBlock !== newDownloadUrlBlock) {
            setBlockSettings({ downloadUrlBlock: newDownloadUrlBlock });
        }
    };

    const announceToScreenReader = () => {
        if (screenReaderRef.current) {
            screenReaderRef.current.innerText = 'Your package has been downloaded.';
        }
    };

    useEffect(() => {
        if (status === BulkDownloadState.Ready && downloadUrl) {
            downloadAssets(downloadUrl);
            saveDownloadUrl(downloadUrl);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                            ) || currentAssets.length === 0
                        }
                        onClick={() => startDownload()}
                        style={designTokens.buttonPrimary}
                    >
                        Download package
                        <span
                            data-test-id="asset-kit-block-screen-reader"
                            ref={screenReaderRef}
                            role="status"
                            className="tw-absolute -tw-left-[10000px] tw-top-auto tw-w-1 tw-h-1 tw-overflow-hidden"
                        />
                    </button>
                </div>
            </div>

            {![BulkDownloadState.Init, BulkDownloadState.Ready].includes(status) && (
                <DownloadMessage blockStyle={blockStyle(blockSettings)} status={status} />
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
