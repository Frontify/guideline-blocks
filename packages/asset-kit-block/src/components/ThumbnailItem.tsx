/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useAssetChooser, useAssetUpload, useBlockSettings, useFileInput } from '@frontify/app-bridge';
import { LoadingCircle } from '@frontify/fondue/components';
import { IconArrowCircleUp, IconImageStack, IconTrashBin } from '@frontify/fondue/icons';
import { BlockItemWrapper } from '@frontify/guideline-blocks-settings';
import { useEffect, useState } from 'react';

import { getSmallPreviewUrl, thumbnailStyle } from '../helpers';
import { useImageLazyLoading } from '../helpers/hooks/useImageLazyLoading';
import { type Settings, type ThumbnailItemProps } from '../types';

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

    const { blobImageSrc } = useImageLazyLoading({ imageUrl: getSmallPreviewUrl(asset.previewUrl) });

    const imageAlt: string =
        typeof asset.alternativeText === 'string'
            ? asset.alternativeText
            : typeof asset.title === 'string'
              ? asset.title
              : '';

    const onOpenAssetChooser = () => {
        openAssetChooser(
            (result) => {
                onReplaceAsset(asset.id, result[0].id).catch((error) =>
                    console.error('Failed to replace asset', error)
                );
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
            onReplaceAsset(asset.id, uploadResults[0].id).catch((error) => console.error(error));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doneAll, uploadResults]);

    return (
        <BlockItemWrapper
            shouldHideWrapper={!isEditing}
            toolbarItems={[
                {
                    type: 'button',
                    icon: <IconTrashBin size={16} />,
                    tooltip: 'Delete Item',
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onClick: () => onRemoveAsset(asset.id),
                },
                {
                    type: 'menu',
                    items: [
                        [
                            {
                                title: 'Replace with upload',
                                icon: <IconArrowCircleUp size={20} />,
                                onClick: openFileDialog,
                            },
                            {
                                title: 'Replace with asset',
                                icon: <IconImageStack size={20} />,
                                onClick: onOpenAssetChooser,
                            },
                        ],
                    ],
                },
            ]}
        >
            <div data-test-id="block-thumbnail" className="tw-aspect-square">
                {isUploading || !blobImageSrc ? (
                    <div className="tw-relative tw-w-full tw-h-full" style={thumbnailStyle(blockSettings)}>
                        <div className="tw-absolute tw-top-1/2 tw-left-1/2 -tw-translate-y-1/2 -tw-translate-x-1/2">
                            <LoadingCircle />
                        </div>
                    </div>
                ) : (
                    <img
                        loading="lazy"
                        decoding="async"
                        data-test-id="block-thumbnail-image"
                        className="tw-object-cover tw-w-full tw-h-full"
                        src={blobImageSrc}
                        style={thumbnailStyle(blockSettings)}
                        alt={imageAlt}
                    />
                )}
            </div>
        </BlockItemWrapper>
    );
};
