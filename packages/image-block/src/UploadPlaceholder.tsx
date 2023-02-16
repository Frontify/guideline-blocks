/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetChooserObjectType, useAssetUpload, useBlockAssets, useFileInput } from '@frontify/app-bridge';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { IconPlus24 } from '@frontify/fondue';
import { BlockInjectButton } from '@frontify/guideline-blocks-shared';
import { useEffect, useState } from 'react';
import { IMAGE_SETTING_ID } from './settings';

export const UploadPlaceholder = ({ appBridge }: BlockProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const { updateAssetIdsFromKey } = useBlockAssets(appBridge);
    const [openFileDialog, { selectedFiles }] = useFileInput({});
    const [dropedFiles, setDropedFiles] = useState<FileList | null>(null);
    const [uploadFile, { results: uploadResults, doneAll }] = useAssetUpload({
        onUploadProgress: () => !isLoading && setIsLoading(true),
        onUploadDone: () => setIsLoading(false),
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
                setIsLoading(true);
                await updateAssetIdsFromKey(IMAGE_SETTING_ID, [result[0].id]);
                setIsLoading(false);
                appBridge.closeAssetChooser();
            },
            {
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
                label="Add image"
                icon={<IconPlus24 />}
                fillParentContainer={true}
                secondaryLabel="Or drop it here"
                onUploadClick={openFileDialog}
                onAssetChooseClick={openAssetChooser}
                onDrop={setDropedFiles}
                isLoading={isLoading}
            />
        </div>
    );
};
