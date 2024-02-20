/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useState } from 'react';
import { Settings, ThumbnailItemProps } from '../types';
import { IconArrowCircleUp20, IconImageStack20, IconTrashBin16, LoadingCircle } from '@frontify/fondue';
import { BlockItemWrapper } from '@frontify/guideline-blocks-settings';
import { useAssetChooser, useAssetUpload, useBlockSettings, useFileInput } from '@frontify/app-bridge';
import { getSmallPreviewUrl, thumbnailStyle } from '../helpers';

export const ThumbnailItem = ({
    asset,
    currentAssetsIds,
    isEditing,
    appBridge,
    onRemoveAsset,
    onReplaceAsset,
}: ThumbnailItemProps) => {
    const [isUploading, setIsUploading] = useState(false);
    const [blockSettings] = useBlockSettings<Settings>(appBridge);
    const { openAssetChooser, closeAssetChooser } = useAssetChooser(appBridge);
    const [openFileDialog, { selectedFiles }] = useFileInput({ accept: 'image/*' });
    const [uploadFile, { results: uploadResults, doneAll }] = useAssetUpload({
        onUploadProgress: () => !isUploading && setIsUploading(true),
    });

    const onOpenAssetChooser = () => {
        openAssetChooser(
            async (result) => {
                onReplaceAsset(asset.id, result[0].id);
                closeAssetChooser();
            },
            {
                multiSelection: false,
                selectedValueIds: currentAssetsIds,
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
            toolbarItems={[
                {
                    type: 'button',
                    icon: <IconTrashBin16 />,
                    tooltip: 'Delete Item',
                    onClick: () => onRemoveAsset(asset.id),
                },
                {
                    type: 'menu',
                    items: [
                        [
                            {
                                title: 'Replace with upload',
                                icon: <IconArrowCircleUp20 />,
                                onClick: openFileDialog,
                            },
                            {
                                title: 'Replace with asset',
                                icon: <IconImageStack20 />,
                                onClick: onOpenAssetChooser,
                            },
                        ],
                    ],
                },
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
                        className="tw-object-cover tw-w-full tw-h-full"
                        src={getSmallPreviewUrl(asset.previewUrl)}
                        style={thumbnailStyle(blockSettings)}
                        alt={asset.title}
                        loading="lazy"
                    />
                )}
            </div>
        </BlockItemWrapper>
    );
};
