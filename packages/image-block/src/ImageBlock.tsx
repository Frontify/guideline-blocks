/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    Asset,
    getMimeType,
    useAssetChooser,
    useAssetUpload,
    useBlockAssets,
    useBlockSettings,
    useEditorState,
    useFileInput,
} from '@frontify/app-bridge';
import {
    BlockItemWrapper,
    BlockProps,
    TextStyles,
    convertToRteValue,
    hasRichTextValue,
    withAttachmentsProvider,
} from '@frontify/guideline-blocks-settings';
import { getEditAltTextToolbarButton } from '@frontify/guideline-blocks-shared';
import {
    IconArrowCircleUp20,
    IconImageStack20,
    IconTrashBin16,
    IconTrashBin20,
    LoadingCircle,
    MenuItemStyle,
    generateRandomId,
} from '@frontify/fondue';
import { useEffect, useState } from 'react';

import { Image } from './components/Image';
import { ImageCaption } from './components/ImageCaption';
import { UploadPlaceholder } from './components/UploadPlaceholder';
import { ALLOWED_EXTENSIONS, ATTACHMENTS_ASSET_ID, IMAGE_ID } from './settings';
import { CaptionPosition, Settings, mapCaptionPositionClasses, ratioValues } from './types';

import 'tailwindcss/tailwind.css';
import '@frontify/guideline-blocks-settings/styles';
import '@frontify/fondue/style';

export const ImageBlock = withAttachmentsProvider(({ appBridge }: BlockProps) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const [titleKey, setTitleKey] = useState(generateRandomId());
    const { openAssetChooser, closeAssetChooser } = useAssetChooser(appBridge);
    const isEditing = useEditorState(appBridge);
    const blockId = String(appBridge.context('blockId').get());
    const [localAltText, setLocalAltText] = useState<string | undefined>(blockSettings.altText);
    const [isLoading, setIsLoading] = useState(false);
    const { blockAssets, deleteAssetIdsFromKey, updateAssetIdsFromKey } = useBlockAssets(appBridge);
    const image = blockAssets?.[IMAGE_ID]?.[0];
    const [openFileDialog, { selectedFiles }] = useFileInput({
        accept: getMimeType(ALLOWED_EXTENSIONS).join(','),
    });
    const [uploadFile, { results: uploadResults, doneAll }] = useAssetUpload({
        onUploadProgress: () => !isLoading && setIsLoading(true),
    });

    const updateImage = async (newImage: Asset) => {
        const isFirstImageUpload = !image;

        if (isFirstImageUpload) {
            const altText = newImage?.title ?? newImage?.fileName ?? '';
            setBlockSettings({ altText });
            setLocalAltText(altText);

            const hasManuallyEditedName = hasRichTextValue(blockSettings.name);
            if (!hasManuallyEditedName) {
                await setBlockSettings({ name: convertToRteValue(TextStyles.imageTitle, newImage?.title, 'center') });
                setTitleKey(generateRandomId());
            }
        }

        await updateAssetIdsFromKey(IMAGE_ID, [newImage.id]);
        setIsLoading(false);
    };

    const onOpenAssetChooser = () => {
        openAssetChooser(
            async (result) => {
                setIsLoading(true);
                updateImage(result[0]);
                closeAssetChooser();
            },
            {
                selectedValueId: blockAssets[IMAGE_ID]?.[0]?.id,
                extensions: ALLOWED_EXTENSIONS,
            }
        );
    };

    const onFilesDrop = (files: FileList) => {
        setIsLoading(true);
        uploadFile(files[0]);
    };

    useEffect(() => {
        if (selectedFiles) {
            setIsLoading(true);
            uploadFile(selectedFiles[0]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFiles]);

    useEffect(() => {
        if (doneAll && uploadResults) {
            updateImage(uploadResults[0]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doneAll, uploadResults]);

    const onRemoveAsset = () => {
        setBlockSettings({ altText: undefined });
        setLocalAltText(undefined);
        deleteAssetIdsFromKey(IMAGE_ID, [image?.id]);
    };

    return (
        <div className="image-block">
            <div
                data-test-id="image-block"
                className={`tw-flex tw-h-auto tw-gap-3 ${mapCaptionPositionClasses[blockSettings.positioning]}`}
            >
                <div
                    className={
                        blockSettings.positioning === CaptionPosition.Above ||
                        blockSettings.positioning === CaptionPosition.Below
                            ? 'tw-w-full'
                            : ratioValues[blockSettings.ratio]
                    }
                >
                    {image ? (
                        <BlockItemWrapper
                            shouldHideWrapper={!isEditing}
                            showAttachments
                            toolbarItems={[
                                image
                                    ? getEditAltTextToolbarButton({
                                          localAltText,
                                          setLocalAltText,
                                          blockSettings,
                                          setBlockSettings,
                                      })
                                    : undefined,
                                {
                                    type: 'button',
                                    icon: <IconTrashBin16 />,
                                    onClick: onRemoveAsset,
                                    tooltip: 'Delete',
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
                                        [
                                            {
                                                title: 'Delete',
                                                icon: <IconTrashBin20 />,
                                                style: MenuItemStyle.Danger,
                                                onClick: onRemoveAsset,
                                            },
                                        ],
                                    ],
                                },
                            ]}
                        >
                            {isLoading ? (
                                <div className="tw-flex tw-items-center tw-justify-center tw-h-64">
                                    <LoadingCircle />
                                </div>
                            ) : (
                                <Image
                                    appBridge={appBridge}
                                    blockSettings={blockSettings}
                                    isEditing={isEditing}
                                    image={image}
                                />
                            )}
                        </BlockItemWrapper>
                    ) : (
                        isEditing && (
                            <UploadPlaceholder
                                loading={isLoading}
                                onUploadClick={openFileDialog}
                                onFilesDrop={onFilesDrop}
                                onAssetChooseClick={onOpenAssetChooser}
                            />
                        )
                    )}
                </div>
                <ImageCaption titleKey={titleKey} blockId={blockId} isEditing={isEditing} appBridge={appBridge} />
            </div>
        </div>
    );
}, ATTACHMENTS_ASSET_ID);
