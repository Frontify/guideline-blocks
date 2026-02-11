/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    AssetBulkDownloadState,
    useAssetBulkDownload,
    useBlockAssets,
    useBlockSettings,
    useEditorState,
} from '@frontify/app-bridge';
import { PluginComposer } from '@frontify/fondue/rte';
import {
    type BlockProps,
    BlockStyles,
    RichTextEditor,
    convertToRteValue,
    hasRichTextValue,
    joinClassNames,
} from '@frontify/guideline-blocks-settings';
import { StyleProvider } from '@frontify/guideline-blocks-shared';
import { type ReactElement, useEffect, useRef, useState } from 'react';

import { AssetGrid, AssetSelection, DownloadMessage, InformationSection } from './components';
import { blockStyle } from './helpers';
import { ASSET_SETTINGS_ID } from './settings';
import { type Settings } from './types';

export const AssetKitBlock = ({ appBridge }: BlockProps): ReactElement | null => {
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
        showThumbnails = true,
        showCount = true,
        assetCountColor,
        countCustomColor,
        buttonText,
    } = blockSettings;

    const hasTitle = title && hasRichTextValue(title);
    const hasDescription = description && hasRichTextValue(description);

    const currentAssets = blockAssets[ASSET_SETTINGS_ID] ?? [];
    const hasAssets = currentAssets.length > 0;
    const shouldDisplayComponent = isEditing || hasTitle || hasDescription || hasAssets;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { generateBulkDownload, status, downloadUrl } = useAssetBulkDownload(appBridge);

    const startDownload = () => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        generateBulkDownload(blockAssets);
    };

    const downloadAssets = (downloadUrl: string) => {
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.target = '_blank';
        a.click();
        announceToScreenReader();
    };

    const announceToScreenReader = () => {
        if (screenReaderRef.current) {
            screenReaderRef.current.textContent = 'Your package has been downloaded.';
        }
    };

    useEffect(() => {
        if (status === AssetBulkDownloadState.Ready && downloadUrl) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            downloadAssets(downloadUrl);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [downloadUrl]);

    const isButtonDisabled =
        [AssetBulkDownloadState.Error, AssetBulkDownloadState.Pending, AssetBulkDownloadState.Started].includes(
            status
        ) || currentAssets.length === 0;

    if (!shouldDisplayComponent) {
        return null;
    }

    return (
        <div className="asset-kit-block">
            <StyleProvider>
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
                                type="button"
                                data-test-id="asset-kit-block-download-button"
                                className="[&>div]:!tw-@container-normal"
                                disabled={isButtonDisabled}
                                onClick={isEditing ? undefined : startDownload}
                                onMouseEnter={() => setButtonHover(true)}
                                onMouseLeave={() => setButtonHover(false)}
                                style={{
                                    ...BlockStyles.buttonPrimary,
                                    ...(buttonHover ? BlockStyles.buttonPrimary?.hover : null),
                                    ...(isButtonDisabled ? { opacity: 0.5 } : null),
                                    overflow: 'visible',
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
                                    onTextChange={(buttonText) => setBlockSettings({ buttonText })}
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
                                currentAssets={currentAssets}
                            />
                        )}
                    </div>
                </div>
            </StyleProvider>
        </div>
    );
};
