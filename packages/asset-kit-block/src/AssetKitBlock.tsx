/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    AssetBulkDownloadState,
    useAssetBulkDownload,
    useBlockAssets,
    useBlockSettings,
    useEditorState,
} from '@frontify/app-bridge';
import { PluginComposer } from '@frontify/fondue';

import {
    BlockProps,
    BlockStyles,
    RichTextEditor,
    convertToRteValue,
    hasRichTextValue,
    joinClassNames,
} from '@frontify/guideline-blocks-settings';
import { ReactElement, useEffect, useRef, useState } from 'react';
import 'tailwindcss/tailwind.css';
import '@frontify/guideline-blocks-settings/styles';
import { AssetGrid, AssetSelection, DownloadMessage, InformationSection } from './components';
import { blockStyle } from './helpers';
import { ASSET_SETTINGS_ID } from './settings';
import { Settings } from './types';

export const AssetKitBlock = ({ appBridge }: BlockProps): ReactElement => {
    const screenReaderRef = useRef<HTMLDivElement>(null);
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState(appBridge);
    const { blockAssets, addAssetIdsToKey, deleteAssetIdsFromKey, updateAssetIdsFromKey } = useBlockAssets(appBridge);
    const [isUploadingAssets, setIsUploadingAssets] = useState<boolean>(false);
    const [buttonHover, setButtonHover] = useState<boolean>(false);
    const {
        title,
        description,
        hasBorder_blocks,
        hasBackgroundBlocks,
        downloadUrlBlock,
        downloadExpiration,
        showThumbnails = true,
        showCount = true,
        assetCountColor,
        countCustomColor,
        buttonText,
    } = blockSettings;

    const currentAssets = blockAssets[ASSET_SETTINGS_ID] ?? [];
    const { generateBulkDownload, status, downloadUrl } = useAssetBulkDownload(appBridge);

    const startDownload = () => {
        if (downloadUrlBlock && downloadExpiration && downloadExpiration > Math.floor(Date.now() / 1000)) {
            return downloadAssets(downloadUrlBlock);
        }
        generateBulkDownload(blockAssets);
    };

    const downloadAssets = (downloadUrl: string) => {
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.target = '_blank';
        a.click();
        announceToScreenReader();
    };

    const getExpirationTimestamp = (downloadUrl: string) => {
        const expirationTimestamp = downloadUrl.split('X-Amz-Expires=')[1]?.split('&')[0] ?? 0;
        return parseInt(expirationTimestamp, 10) + Math.floor(Date.now() / 1000);
    };

    const saveDownloadUrl = (newDownloadUrlBlock: string) => {
        if (downloadUrlBlock !== newDownloadUrlBlock) {
            setBlockSettings({ downloadUrlBlock: newDownloadUrlBlock });
            setBlockSettings({ downloadExpiration: getExpirationTimestamp(newDownloadUrlBlock) });
        }
    };

    const announceToScreenReader = () => {
        if (screenReaderRef.current) {
            screenReaderRef.current.innerText = 'Your package has been downloaded.';
        }
    };

    useEffect(() => {
        if (status === AssetBulkDownloadState.Ready && downloadUrl) {
            downloadAssets(downloadUrl);
            saveDownloadUrl(downloadUrl);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [downloadUrl]);

    const isButtonDisabled =
        [AssetBulkDownloadState.Error, AssetBulkDownloadState.Pending, AssetBulkDownloadState.Started].includes(
            status,
        ) || currentAssets.length === 0;

    return (
        <div className="asset-kit-block">
            <div
                data-test-id="asset-kit-block"
                className={joinClassNames([
                    'tw-w-full tw-space-y-8',
                    (hasBorder_blocks || hasBackgroundBlocks) && 'tw-p-5 sm:tw-p-8',
                ])}
                style={{
                    ...blockStyle(blockSettings),
                }}
            >
                <div className="sm:tw-flex tw-gap-8 tw-space-y-3 md:tw-space-y-0">
                    <InformationSection
                        description={description}
                        isEditing={isEditing}
                        setBlockSettings={setBlockSettings}
                        title={title}
                        appBridge={appBridge}
                    />
                    <div className="tw-flex-none">
                        <button
                            data-test-id="asset-kit-block-download-button"
                            disabled={isButtonDisabled}
                            onClick={isEditing ? undefined : startDownload}
                            onMouseEnter={() => setButtonHover(true)}
                            onMouseLeave={() => setButtonHover(false)}
                            style={{
                                ...BlockStyles.buttonPrimary,
                                ...(buttonHover ? BlockStyles.buttonPrimary?.hover : null),
                                ...(isButtonDisabled ? { opacity: 0.5 } : null),
                            }}
                        >
                            <RichTextEditor
                                id={`asset-kit-block-download-button-text-${appBridge.context('blockId').get()}`}
                                value={
                                    hasRichTextValue(buttonText)
                                        ? buttonText
                                        : convertToRteValue('p', 'Download package')
                                }
                                isEditing={isEditing}
                                plugins={new PluginComposer({ noToolbar: true }).setPlugin()}
                                onTextChange={(newButtonText) => setBlockSettings({ buttonText: newButtonText })}
                            />
                            <span
                                data-test-id="asset-kit-block-screen-reader"
                                ref={screenReaderRef}
                                role="status"
                                className="tw-absolute -tw-left-[10000px] tw-top-auto tw-w-1 tw-h-1 tw-overflow-hidden"
                            />
                        </button>
                    </div>
                </div>

                {![AssetBulkDownloadState.Init, AssetBulkDownloadState.Ready].includes(status) && (
                    <DownloadMessage blockStyle={blockStyle(blockSettings)} status={status} />
                )}

                <div>
                    <AssetGrid
                        appBridge={appBridge}
                        currentAssets={currentAssets}
                        deleteAssetIdsFromKey={deleteAssetIdsFromKey}
                        updateAssetIdsFromKey={updateAssetIdsFromKey}
                        saveDownloadUrl={saveDownloadUrl}
                        isEditing={isEditing}
                        showThumbnails={showThumbnails}
                        showCount={showCount}
                        countColor={assetCountColor === 'override' ? countCustomColor : undefined}
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
            </div>
        </div>
    );
};
