/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetChooserObjectType, useAssetUpload, useBlockAssets, useFileInput } from '@frontify/app-bridge';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { IconPlus24 } from '@frontify/fondue';
import { BlockInjectButton } from '@frontify/guideline-blocks-shared';
import { useEffect, useState } from 'react';
import { IMAGE_SETTING_ID } from '../settings';

export const UploadPlaceholder = ({ appBridge }: BlockProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const { updateAssetIdsFromKey, blockAssets } = useBlockAssets(appBridge);
    const [openFileDialog, { selectedFiles }] = useFileInput({});
    const [dropedFiles, setDropedFiles] = useState<FileList | null>(null);
    const [uploadFile, { results: uploadResults, doneAll }] = useAssetUpload({
        onUploadProgress: () => !isLoading && setIsLoading(true),
    });

    useEffect(() => {
        if (dropedFiles) {
            setIsLoading(true);
            uploadFile(dropedFiles);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dropedFiles]);

    useEffect(() => {
        if (selectedFiles) {
            setIsLoading(true);
            uploadFile(selectedFiles);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFiles]);

    const openAssetChooser = () => {
        appBridge.openAssetChooser(
            async (result) => {
                await updateAssetIdsFromKey(IMAGE_SETTING_ID, [result[0].id]);
                appBridge.closeAssetChooser();
            },
            {
                selectedValueId: blockAssets[IMAGE_SETTING_ID]?.[0]?.id,
                objectTypes: [AssetChooserObjectType.ImageVideo],
            }
        );
    };

    useEffect(() => {
        if (doneAll && uploadResults) {
            (async (uploadResults) => {
                const resultId = uploadResults[0].id;
                await updateAssetIdsFromKey(IMAGE_SETTING_ID, [resultId]);
                setIsLoading(false);
            })(uploadResults);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doneAll, uploadResults]);

    return (
        <div className="tw-h-64">
            <BlockInjectButton
                label="Add or drop your image here"
                icon={<IconPlus24 />}
                fillParentContainer={true}
                onUploadClick={openFileDialog}
                onAssetChooseClick={openAssetChooser}
                onDrop={setDropedFiles}
                isLoading={isLoading}
            />
        </div>
    );
};
