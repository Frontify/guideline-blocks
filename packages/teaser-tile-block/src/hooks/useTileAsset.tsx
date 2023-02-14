/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock, Asset, useAssetUpload, useBlockAssets, useFileInput } from '@frontify/app-bridge';
import { useEffect, useState } from 'react';

export const IMAGE_SETTING_ID = 'tileAssets';

export const useTileAsset = (appBridge: AppBridgeBlock, index: number) => {
    const { blockAssets, updateAssetIdsFromKey } = useBlockAssets(appBridge);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFiles]);

    useEffect(() => {
        if (doneAll) {
            (async (uploadResults) => {
                const assetsId = uploadResults.map((uploadResult) => uploadResult.id);
                await updateAssetIdsFromKey(IMAGE_SETTING_ID, assetsId);
                setIsAssetLoading(false);
            })(uploadResults);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doneAll, uploadResults]);

    // Asset chooser demo
    const onOpenAssetChooser = () => {
        appBridge.openAssetChooser(
            (result: Asset[]) => {
                const resultId = result[0].id;
                updateAssetIdsFromKey(IMAGE_SETTING_ID, [resultId]);
                appBridge.closeAssetChooser();
            },
            {
                selectedValueId: blockAssets[IMAGE_SETTING_ID]?.[0]?.id,
            }
        );
    };

    const tileAsset = blockAssets[IMAGE_SETTING_ID]?.[index];

    return { tileAsset, isAssetLoading, onOpenAssetChooser, openFileDialog };
};
