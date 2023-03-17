/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useState, useEffect } from 'react';
import { Settings, ThumbnailItemProps } from '../types';
import { IconImageStack20, LoadingCircle, IconTrashBin16, IconTrashBin20, IconArrowCircleUp20 } from '@frontify/fondue';
import { BlockItemWrapper } from '@frontify/guideline-blocks-shared';
import { AssetChooserObjectType, useBlockSettings, useFileInput, useAssetUpload } from '@frontify/app-bridge';
import { thumbnailStyle } from '../helpers';

export const ThumbnailItem = ({ asset, isEditing, appBridge, onRemoveAsset, onReplaceAsset }: ThumbnailItemProps) => {
    const [isUploading, setIsUploading] = useState(false);
    const [blockSettings] = useBlockSettings<Settings>(appBridge);
    const [openFileDialog, { selectedFiles }] = useFileInput({ accept: 'image/*' });
    const [uploadFile, { results: uploadResults, doneAll }] = useAssetUpload({
        onUploadProgress: () => !isUploading && setIsUploading(true),
    });

    const openAssetChooser = () => {
        appBridge.openAssetChooser(
            async (result) => {
                onReplaceAsset(asset.id, result[0].id);
                appBridge.closeAssetChooser();
            },
            {
                objectTypes: [AssetChooserObjectType.ImageVideo],
            }
        );
    };

    useEffect(() => {
        if (selectedFiles) {
            uploadFile(selectedFiles);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFiles]);

    useEffect(() => {
        if (doneAll && uploadResults) {
            onReplaceAsset(asset.id, uploadResults[0].id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doneAll, uploadResults]);

    return (
        <BlockItemWrapper
            shouldHideWrapper={!isEditing}
            toolbarFlyoutItems={[
                [
                    {
                        title: 'Replace with upload',
                        icon: <IconArrowCircleUp20 />,
                        onClick: openFileDialog,
                    },
                    {
                        title: 'Replace with asset',
                        icon: <IconImageStack20 />,
                        onClick: openAssetChooser,
                    },
                ],
                [
                    {
                        title: 'Delete',
                        icon: <IconTrashBin20 />,
                        onClick: () => onRemoveAsset(asset.id),
                    },
                ],
            ]}
            toolbarItems={[
                { icon: <IconTrashBin16 />, tooltip: 'Delete Item', onClick: () => onRemoveAsset(asset.id) },
            ]}
        >
            <div data-test-id="block-thumbnail" className="tw-aspect-square">
                {isUploading ? (
                    <div className="tw-relative tw-w-full tw-h-full" style={thumbnailStyle(blockSettings)}>
                        <div className="tw-absolute tw-top-1/2 tw-left-1/2 -tw-translate-y-1/2 -tw-translate-x-1/2">
                            <LoadingCircle />
                        </div>
                    </div>
                ) : (
                    <img
                        data-test-id="block-thumbnail-image"
                        className="tw-object-scale-down tw-w-full tw-h-full"
                        src={asset.previewUrl}
                        style={thumbnailStyle(blockSettings)}
                        alt={asset.title}
                    />
                )}
            </div>
        </BlockItemWrapper>
    );
};
