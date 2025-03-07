/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BlockInjectButton } from '@frontify/guideline-blocks-settings';
import { IconPlus24 } from '@frontify/fondue';
import { useEffect, useState } from 'react';
import { ASSET_SETTINGS_ID } from '../settings';
import { useAssetChooser, useAssetUpload, useFileInput } from '@frontify/app-bridge';
import { AssetSelectionProps } from '../types';

export const AssetSelection = ({
    appBridge,
    isUploadingAssets,
    setIsUploadingAssets,
    addAssetIdsToKey,
    currentAssets,
}: AssetSelectionProps) => {
    const { openAssetChooser, closeAssetChooser } = useAssetChooser(appBridge);
    const [openFileDialog, { selectedFiles }] = useFileInput({ multiple: true });
    const [droppedFiles, setDroppedFiles] = useState<FileList | null>(null);
    const [uploadFile, { results: uploadResults, doneAll }] = useAssetUpload({
        onUploadProgress: () => !isUploadingAssets && setIsUploadingAssets(true),
    });

    const onOpenAssetChooser = () => {
        openAssetChooser(
            (assetsObject) => {
                setIsUploadingAssets(true);
                const assetsIds = Array.from(assetsObject).map((asset) => asset.id);
                addAssetIdsToKey(ASSET_SETTINGS_ID, assetsIds).then(() => setIsUploadingAssets(false));
                closeAssetChooser();
            },
            {
                multiSelection: true,
                selectedValueIds: currentAssets.map((asset) => asset.id),
            }
        );
    };

    useEffect(() => {
        if (droppedFiles) {
            setIsUploadingAssets(true);
            uploadFile(droppedFiles);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [droppedFiles]);

    useEffect(() => {
        if (selectedFiles) {
            setIsUploadingAssets(true);
            uploadFile(selectedFiles);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFiles]);

    useEffect(() => {
        if (doneAll && uploadResults) {
            (async (assetsObject) => {
                const assetsIds = Array.from(assetsObject).map((asset) => asset.id);
                await addAssetIdsToKey(ASSET_SETTINGS_ID, assetsIds);
                setIsUploadingAssets(false);
            })(uploadResults);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doneAll, uploadResults]);

    return (
        <div className="tw-mt-7">
            <BlockInjectButton
                onAssetChooseClick={onOpenAssetChooser}
                onUploadClick={openFileDialog}
                onDrop={setDroppedFiles}
                isLoading={isUploadingAssets}
                label="Add or drop your assets here"
                icon={<IconPlus24 />}
            />
        </div>
    );
};
