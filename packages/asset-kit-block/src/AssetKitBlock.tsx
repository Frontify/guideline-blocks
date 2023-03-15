/* (c) Copyright Frontify Ltd., all rights reserved. */

import { joinClassNames, useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';
import '@frontify/fondue-tokens/styles';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { ReactElement, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { useBlockAssets, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { ASSET_SETTINGS_ID } from './settings';
import { Settings } from './types';
import { AssetGrid, AssetSelection, DownloadMessage, InformationSection } from './components';
import { blockStyle, generateBulkDownload, thumbnailStyle } from './helpers';

export const AssetKitBlock = ({ appBridge }: BlockProps): ReactElement => {
    const { designTokens } = useGuidelineDesignTokens();
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState(appBridge);
    const { blockAssets, addAssetIdsToKey, deleteAssetIdsFromKey, updateAssetIdsFromKey } = useBlockAssets(appBridge);
    const [isUploadingAssets, setIsUploadingAssets] = useState<boolean>(false);
    const [isDownloadingAssets, setIsDownloadingAssets] = useState<boolean>(false);
    const { title, description, hasBorder_blocks, hasBackground_blocks } = blockSettings;
    const currentAssets = blockAssets[ASSET_SETTINGS_ID] ?? [];

    return (
        <div
            data-test-id="asset-kit-block"
            className={joinClassNames(['tw-w-full', (hasBorder_blocks || hasBackground_blocks) && 'tw-p-5 sm:tw-p-8'])}
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
                            isDownloadingAssets ||
                            isUploadingAssets ||
                            currentAssets.length === undefined ||
                            currentAssets.length <= 0
                        }
                        onClick={() =>
                            generateBulkDownload(appBridge.getProjectId(), currentAssets, setIsDownloadingAssets)
                        }
                        style={designTokens.buttonPrimary}
                    >
                        Download package
                    </button>
                </div>
            </div>

            {isDownloadingAssets ? <DownloadMessage blockStyle={blockStyle(blockSettings)} /> : null}

            <AssetGrid
                appBridge={appBridge}
                currentAssets={currentAssets}
                deleteAssetIdsFromKey={deleteAssetIdsFromKey}
                updateAssetIdsFromKey={updateAssetIdsFromKey}
                isEditing={isEditing}
                thumbnailStyle={thumbnailStyle(blockSettings)}
            />

            {isEditing ? (
                <AssetSelection
                    appBridge={appBridge}
                    isUploadingAssets={isUploadingAssets}
                    setIsUploadingAssets={setIsUploadingAssets}
                    addAssetIdsToKey={addAssetIdsToKey}
                    currentAssets={currentAssets}
                />
            ) : null}
        </div>
    );
};
