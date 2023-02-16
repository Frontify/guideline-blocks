import { AssetChooserObjectType, useAssetUpload, useBlockAssets, useFileInput } from '@frontify/app-bridge';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { IconPlus24 } from '@frontify/fondue';
import { BlockInjectButton } from '@frontify/guideline-blocks-shared';
import { useEffect, useState } from 'react';
import { AUDIO_ID, AUDIO_EXTENSIONS } from './settings';

export const UploadPlaceholder = ({ appBridge }: BlockProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const { updateAssetIdsFromKey } = useBlockAssets(appBridge);
    const [openFileDialog, { selectedFiles }] = useFileInput({ multiple: false });
    const [dropedFiles, setDropedFiles] = useState<FileList | null>(null);
    const [uploadFile, {}] = useAssetUpload({
        onUploadProgress: () => !isLoading && setIsLoading(true),
        onUploadDone: () => setIsLoading(false),
    });

    useEffect(() => {
        if (dropedFiles) {
            console.log('dropped files', dropedFiles);
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
                await updateAssetIdsFromKey(AUDIO_ID, [result[0].id]);
                setIsLoading(false);
                appBridge.closeAssetChooser();
            },
            {
                objectTypes: [AssetChooserObjectType.File],
                extensions: AUDIO_EXTENSIONS,
            }
        );
    };

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
