/* (c) Copyright Frontify Ltd., all rights reserved. */

import { joinClassNames } from '@frontify/guideline-blocks-shared';
import '@frontify/fondue-tokens/styles';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { ReactElement, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { useBlockAssets, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { ASSET_SETTINGS_ID } from './settings';
import { Settings } from './types';
import { AssetGrid, AssetSelection, DownloadMessage, InformationSection } from './components';
import { blockStyle, generateBulkDownload, thumbnailStyle } from './helpers';
import { Button, ButtonEmphasis, ButtonStyle } from '@frontify/fondue';

export const AssetKitBlock = ({ appBridge }: BlockProps): ReactElement => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState(appBridge);
    const { blockAssets, addAssetIdsToKey, deleteAssetIdsFromKey } = useBlockAssets(appBridge);
    const [isUploadingAssets, setIsUploadingAssets] = useState<boolean>(false);
    const [isDownloadingAssets, setIsDownloadingAssets] = useState<boolean>(false);
    const { title, description } = blockSettings;
    const currentAssets = blockAssets[ASSET_SETTINGS_ID] ?? [];
    const { hasBorder_blocks, hasBackground_blocks } = blockSettings;

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
                    <Button
                        emphasis={ButtonEmphasis.Strong}
                        style={ButtonStyle.Default}
                        disabled={
                            isDownloadingAssets ||
                            isUploadingAssets ||
                            currentAssets.length === undefined ||
                            currentAssets.length <= 0
                        }
                        onClick={() =>
                            generateBulkDownload(appBridge.getProjectId(), currentAssets, setIsDownloadingAssets)
                        }
                    >
                        Download package
                    </Button>
                </div>
            </div>

            {isDownloadingAssets ? <DownloadMessage blockStyle={blockStyle(blockSettings)} /> : null}

            <AssetGrid
                currentAssets={currentAssets}
                deleteAssetIdsFromKey={deleteAssetIdsFromKey}
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
