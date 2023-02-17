/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Padding, paddingStyleMap, useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';
import '@frontify/fondue-tokens/styles';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import React, { FC, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { Asset, useBlockAssets, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { ASSET_SETTINGS_ID } from './settings';
import { Settings } from './types';
import { AssetSelection } from './components';
import { AssetGrid } from './components';
import { DownloadMessage } from './components';
import { InformationSection } from './components';
import { blockStyle, generateBulkDownload, thumbnailStyle } from './utility';

export const AssetKitBlock: FC<BlockProps> = ({ appBridge }) => {
    const { designTokens } = useGuidelineDesignTokens();
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState(appBridge);
    const { blockAssets, addAssetIdsToKey, deleteAssetIdsFromKey } = useBlockAssets(appBridge);
    const [isUploadingAssets, setIsUploadingAssets] = useState<boolean>(false);
    const [isDownloadingAssets, setIsDownloadingAssets] = useState<boolean>(false);
    const { title, description } = blockSettings;
    const currentAssets: Asset[] = blockAssets[ASSET_SETTINGS_ID] ?? [];

    return (
        <div
            data-test-id="asset-kit-block"
            style={{
                ...blockStyle(blockSettings),
                padding: paddingStyleMap[Padding.Medium],
            }}
        >
            <div className="tw-mb-8 sm:tw-flex tw-gap-8 tw-space-y-3 md:tw-space-y-0">
                <InformationSection
                    description={description}
                    isEditing={isEditing}
                    setBlockSettings={setBlockSettings}
                    title={title}
                />
                <div className="tw-flex-none">
                    <button
                        disabled={
                            isDownloadingAssets ||
                            isUploadingAssets ||
                            currentAssets.length === undefined ||
                            currentAssets.length <= 0
                        }
                        onClick={() =>
                            generateBulkDownload(appBridge.getProjectId(), currentAssets, setIsDownloadingAssets)
                        }
                        style={designTokens?.buttonPrimary}
                    >
                        Download package
                    </button>
                </div>
            </div>

            {isDownloadingAssets && <DownloadMessage blockStyle={blockStyle(blockSettings)} />}

            <AssetGrid
                currentAssets={currentAssets}
                deleteAssetIdsFromKey={deleteAssetIdsFromKey}
                isEditing={isEditing}
                thumbnailStyle={thumbnailStyle(blockSettings)}
            />

            {isEditing && (
                <AssetSelection
                    appBridge={appBridge}
                    isUploadingAssets={isUploadingAssets}
                    setIsUploadingAssets={setIsUploadingAssets}
                    addAssetIdsToKey={addAssetIdsToKey}
                    currentAssets={currentAssets}
                />
            )}
        </div>
    );
};
