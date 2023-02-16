/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Asset, AssetChooserObjectType, useAssetUpload, useBlockAssets, useFileInput } from '@frontify/app-bridge';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { IconPlus24 } from '@frontify/fondue';
import { BlockInjectButton } from '@frontify/guideline-blocks-shared';
import { useEffect, useState } from 'react';
import { AUDIO_EXTENSIONS, AUDIO_ID } from '../settings';

export const UploadPlaceholder = ({ appBridge }: BlockProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const { updateAssetIdsFromKey } = useBlockAssets(appBridge);
    const [openFileDialog, { selectedFiles }] = useFileInput({ multiple: false });
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
            (result: Asset[]) => {
                setIsLoading(true);
                updateAssetIdsFromKey(AUDIO_ID, [result[0].id]).then(() => {
                    // onChangeItem(id, result[0].id, 'audioId');
                    setIsLoading(false);
                });
                appBridge.closeAssetChooser();
            },
            {
                multiSelection: false,
                objectTypes: [AssetChooserObjectType.File],
                extensions: AUDIO_EXTENSIONS,
            }
        );
    };

    useEffect(() => {
        if (doneAll && uploadResults) {
            (async (uploadResults) => {
                const resultId = uploadResults[0].id;
                await updateAssetIdsFromKey(AUDIO_ID, [resultId]);
                setIsLoading(false);
            })(uploadResults);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doneAll, uploadResults]);

    return (
        <div data-test-id="upload-placeholder" className="tw-h-32">
            <BlockInjectButton
                label="Add audio asset"
                icon={<IconPlus24 />}
                secondaryLabel="Or drop it here"
                onUploadClick={openFileDialog}
                fillParentContainer
                onAssetChooseClick={openAssetChooser}
                onDrop={setDropedFiles}
                isLoading={isLoading}
            />
        </div>
    );
};
