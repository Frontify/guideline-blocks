/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    AssetChooserObjectType,
    useAssetUpload,
    useBlockAssets,
    useBlockSettings,
    useFileInput,
} from '@frontify/app-bridge';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { IconPlus24, RichTextEditor } from '@frontify/fondue';
import { AddImagesButton, joinClassNames } from '@frontify/guideline-blocks-shared';
import { Settings } from './types';
import { useEffect, useState } from 'react';
import { IMAGE_SETTING_ID } from './settings';

export const BlankState = ({ appBridge }: BlockProps) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
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
        <div data-test-id="image-block-blank-state" className="tw-flex tw-flex-col">
            <div className="tw-h-64">
                <AddImagesButton
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

            <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center tw-mt-3 tw-gap-1">
                <div
                    className={joinClassNames([
                        blockSettings.name
                            ? 'tw-text-text tw-text-[12px] tw-leading-[18px] tw-font-medium'
                            : 'tw-text-blank-state-weak',
                    ])}
                >
                    <RichTextEditor
                        border={false}
                        onTextChange={(value) => setBlockSettings({ ...blockSettings, name: value })}
                        onBlur={(value) => setBlockSettings({ ...blockSettings, name: value })}
                        value={blockSettings.name}
                        placeholder="Asset name"
                    />
                </div>
                <div
                    className={joinClassNames([
                        blockSettings.description
                            ? 'tw-text-text-weak tw-text-[11px] tw-leading-[13px]'
                            : 'tw-text-blank-state-weak',
                    ])}
                >
                    <RichTextEditor
                        border={false}
                        onTextChange={(value) => setBlockSettings({ ...blockSettings, description: value })}
                        onBlur={(value) => setBlockSettings({ ...blockSettings, description: value })}
                        value={blockSettings.description}
                        placeholder="Add a description here"
                    />
                </div>
            </div>
        </div>
    );
};
