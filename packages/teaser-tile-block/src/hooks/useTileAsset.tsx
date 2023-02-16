/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useState } from 'react';
import { AppBridgeBlock, Asset, useAssetUpload, useFileInput } from '@frontify/app-bridge';

export const useTileAsset = (
    appBridge: AppBridgeBlock,
    id: string,
    blockAssets: Record<string, Asset[]>,
    updateAssetIdsFromKey: (key: string, newAssetIds: number[]) => Promise<void> | void
) => {
    const [isAssetLoading, setIsAssetLoading] = useState(false);
    const [openFileDialog, { selectedFiles }] = useFileInput({});
    const [uploadFile, { results: uploadResults, doneAll }] = useAssetUpload({
        onUploadProgress: () => !isAssetLoading && setIsAssetLoading(true),
    });

    useEffect(() => {
        if (selectedFiles) {
            setIsAssetLoading(true);
            uploadFile(selectedFiles);
        }
    }, [selectedFiles]);

    useEffect(() => {
        if (doneAll) {
            (async (uploadResults) => {
                const assetsId = uploadResults.map((uploadResult) => uploadResult.id);
                await updateAssetIdsFromKey(id, assetsId);
                setIsAssetLoading(false);
            })(uploadResults);
        }
    }, [doneAll, uploadResults]);

    // Asset chooser demo
    const onOpenAssetChooser = () => {
        appBridge.openAssetChooser(
            (result: Asset[]) => {
                const resultId = result[0].id;
                updateAssetIdsFromKey(id, [resultId]);
                appBridge.closeAssetChooser();
            },
            {
                selectedValueId: blockAssets[id]?.[0]?.id,
            }
        );
    };

    const tileAsset = blockAssets[id]?.[0];

    return {
        tileAsset,
        isAssetLoading,
        onOpenAssetChooser,
        openFileDialog,
        uploadFile: (files: FileList) => {
            setIsAssetLoading(true);
            uploadFile(files);
        },
    };
};
