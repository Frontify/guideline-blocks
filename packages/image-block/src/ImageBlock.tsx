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
    usePrivacySettings,
} from '@frontify/app-bridge';
import {
    BlockItemWrapper,
    BlockProps,
    TextStyles,
    convertToRteValue,
    hasRichTextValue,
    isDownloadable,
    withAttachmentsProvider,
} from '@frontify/guideline-blocks-settings';
import { StyleProvider, getEditAltTextToolbarButton } from '@frontify/guideline-blocks-shared';
import {
    IconArrowCircleUp20,
    IconImageStack20,
    IconTrashBin16,
    IconTrashBin20,
    LoadingCircle,
    MenuItemStyle,
    generateRandomId,
    merge,
} from '@frontify/fondue';
import { useEffect, useState } from 'react';

import { Image } from './components/Image';
import { ImageCaption } from './components/ImageCaption';
import { UploadPlaceholder } from './components/UploadPlaceholder';
import { ALLOWED_EXTENSIONS, ATTACHMENTS_ASSET_ID, IMAGE_ID } from './settings';
import { CaptionPosition, type Settings, imageRatioValues, mapCaptionPositionClasses } from './types';

import { DownloadAndAttachments } from './components/DownloadAndAttachments';

export const ImageBlock = withAttachmentsProvider(({ appBridge }: BlockProps) => {
    const { assetDownloadEnabled, assetViewerEnabled } = usePrivacySettings(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const [titleKey, setTitleKey] = useState(generateRandomId());
    const { openAssetChooser, closeAssetChooser } = useAssetChooser(appBridge);
    const isEditing = useEditorState(appBridge);
    const blockId = String(appBridge.context('blockId').get());
    const { altText, name, positioning, ratio, description } = blockSettings;
    const [localAltText, setLocalAltText] = useState<string | undefined>(altText);
    const [isLoading, setIsLoading] = useState(false);
    const { blockAssets, deleteAssetIdsFromKey, updateAssetIdsFromKey } = useBlockAssets(appBridge);
    const image = blockAssets?.[IMAGE_ID]?.[0];
    const attachmentCount = blockAssets[ATTACHMENTS_ASSET_ID]?.length || 0;
    const isAssetDownloadable = isDownloadable(
        blockSettings.security,
        blockSettings.downloadable,
        assetDownloadEnabled
    );

    const [openFileDialog, { selectedFiles }] = useFileInput({
        accept: getMimeType(ALLOWED_EXTENSIONS).join(','),
    });
    const [uploadFile, { results: uploadResults, doneAll }] = useAssetUpload({
        onUploadProgress: () => !isLoading && setIsLoading(true),
    });

    const updateImage = async (newImage: Asset) => {
        const settings: Partial<Settings> = {};
        const isFirstImageUpload = !image;
        console.log('ImageBlock: updateImage', newImage);
        if (isFirstImageUpload) {
            const defaultImageName = newImage?.title ?? newImage?.fileName ?? '';

            settings.altText = newImage?.alternativeText ?? '';
            setLocalAltText(newImage?.alternativeText ?? '');

            const hasManuallyEditedName = hasRichTextValue(name);
            if (!hasManuallyEditedName) {
                settings.name = convertToRteValue(TextStyles.imageTitle, defaultImageName, 'center');
            }
        }

        if (newImage.backgroundColor) {
            settings.backgroundColor = newImage.backgroundColor;
            settings.hasBackground = true;
        }

        if (Object.keys(settings).length > 0) {
            await setBlockSettings(settings);
        }

        await updateAssetIdsFromKey(IMAGE_ID, [newImage.id]);

        if (settings.name) {
            setTitleKey(generateRandomId());
        }

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
            <StyleProvider>
                <div className="tw-@container">
                    <div
                        data-test-id="image-block"
                        className={`tw-flex tw-h-auto ${mapCaptionPositionClasses[positioning]}`}
                    >
                        <div
                            className={merge([
                                'tw-relative',
                                attachmentCount > 0 && 'tw-min-h-11',
                                positioning === CaptionPosition.Above || positioning === CaptionPosition.Below
                                    ? 'tw-w-full'
                                    : imageRatioValues[ratio],
                            ])}
                        >
                            <DownloadAndAttachments
                                appBridge={appBridge}
                                blockSettings={blockSettings}
                                image={image}
                                isAssetDownloadable={isAssetDownloadable}
                                isEditing={isEditing}
                            />
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
                                            isDownloadable={isAssetDownloadable}
                                            globalAssetViewerEnabled={assetViewerEnabled}
                                        />
                                    )}
                                </BlockItemWrapper>
                            ) : (
                                isEditing && (
                                    <BlockItemWrapper
                                        shouldHideWrapper={attachmentCount === 0}
                                        showAttachments
                                        toolbarItems={[]}
                                    >
                                        <UploadPlaceholder
                                            loading={isLoading}
                                            onUploadClick={openFileDialog}
                                            onFilesDrop={onFilesDrop}
                                            onAssetChooseClick={onOpenAssetChooser}
                                        />
                                    </BlockItemWrapper>
                                )
                            )}
                        </div>

                        <ImageCaption
                            titleKey={titleKey}
                            blockId={blockId}
                            isEditing={isEditing}
                            description={description}
                            name={name}
                            positioning={positioning}
                            appBridge={appBridge}
                            ratio={ratio}
                            setBlockSettings={setBlockSettings}
                        />
                    </div>
                </div>
            </StyleProvider>
        </div>
    );
}, ATTACHMENTS_ASSET_ID);
