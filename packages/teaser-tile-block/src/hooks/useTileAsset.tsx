/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock, Asset, useAssetUpload, useBlockAssets, useFileInput } from '@frontify/app-bridge';
import { useEffect, useState } from 'react';

export const IMAGE_SETTING_ID = 'tileAssets';

export const useTileAsset = (appBridge: AppBridgeBlock, id: string) => {
    const { blockAssets, updateAssetIdsFromKey } = useBlockAssets(appBridge);
    const [isAssetLoading, setIsAssetLoading] = useState(false);
    const [openFileDialog, { selectedFiles }] = useFileInput({});
    const [uploadFile, { results: uploadResults, doneAll }] = useAssetUpload({
        onUploadProgress: () => !isAssetLoading && setIsAssetLoading(true),
    });

    console.log(blockAssets);

    useEffect(() => {
        if (selectedFiles) {
            console.log('uploading');
            setIsAssetLoading(true);
            uploadFile(selectedFiles);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFiles]);

    useEffect(() => {
        if (doneAll) {
            console.log('doneall');
            (async (uploadResults) => {
                console.log('updateAssetIds');
                const assetsId = uploadResults.map((uploadResult) => uploadResult.id);
                await updateAssetIdsFromKey(id, assetsId);

                console.log('updated');
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
                updateAssetIdsFromKey(id, [resultId]);
                appBridge.closeAssetChooser();
            },
            {
                selectedValueId: blockAssets[id]?.[0]?.id,
            }
        );
    };

    const tileAsset = blockAssets[id]?.[0];

    return { tileAsset, isAssetLoading, onOpenAssetChooser, openFileDialog };
};
