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
    merge,
} from '@frontify/fondue';
import { useEffect, useRef, useState } from 'react';

import { Image } from './components/Image';
import { ImageCaption } from './components/ImageCaption';
import { UploadPlaceholder } from './components/UploadPlaceholder';
import { ALLOWED_EXTENSIONS, ATTACHMENTS_ASSET_ID, IMAGE_ID } from './settings';
import { CaptionPosition, type Settings, imageRatioValues, mapCaptionPositionClasses } from './types';

import '@frontify/guideline-blocks-settings/styles';
import '@frontify/fondue/style';
import 'tailwindcss/tailwind.css';
import { isImageDownloadable } from './helpers/isImageDownloadable';

export const ImageBlock = withAttachmentsProvider(({ appBridge }: BlockProps) => {
    const { assetDownloadEnabled, assetViewerEnabled } = usePrivacySettings(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const [titleKey, setTitleKey] = useState(generateRandomId());
    const { openAssetChooser, closeAssetChooser } = useAssetChooser(appBridge);
    const isEditing = useEditorState(appBridge);
    const blockId = String(appBridge.context('blockId').get());
    const { altText, name, positioning, ratio, description } = blockSettings;
    const [localAltText, setLocalAltText] = useState<string | undefined>(altText);
    // const [isLoading, setIsLoading] = useState(false);
    const [urlIsLoading, setUrlIsLoading] = useState(false);
    const [uploadIsLoading, setUploadIsLoading] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const componentRef = useRef(null);
    const { blockAssets, deleteAssetIdsFromKey, updateAssetIdsFromKey } = useBlockAssets(appBridge);
    const image = blockAssets?.[IMAGE_ID]?.[0];
    const lottieUrl = blockSettings.lottieUrl;
    const attachmentCount = blockAssets[ATTACHMENTS_ASSET_ID]?.length || 0;
    const isDownloadable = isImageDownloadable(
        blockSettings.security,
        blockSettings.downloadable,
        assetDownloadEnabled,
        image
    );
    const [imageBlockKey, setImageBlockKey] = useState(0);
    const [openFileDialog, { selectedFiles }] = useFileInput({
        accept: getMimeType(ALLOWED_EXTENSIONS).join(','),
    });
    const [uploadFile, { results: uploadResults, doneAll }] = useAssetUpload({
        onUploadProgress: () => !uploadIsLoading && setUploadIsLoading(true),
    });

    const updateImage = async (newImage: Asset) => {
        const settings: Partial<Settings> = {};
        const isFirstImageUpload = !image;

        if (isFirstImageUpload) {
            const defaultImageName = newImage?.title ?? newImage?.fileName ?? '';

            setBlockSettings({ altText: defaultImageName });
            setLocalAltText(defaultImageName);

            const hasManuallyEditedName = hasRichTextValue(name);
            if (!hasManuallyEditedName) {
                settings.name = convertToRteValue(TextStyles.imageTitle, defaultImageName, 'center');
                setTitleKey(generateRandomId());
            }
        }

        // if (newImage.backgroundColor) {
        //     settings.backgroundColor = newImage.backgroundColor;
        //     settings.hasBackground = true;
        // }

        if (Object.keys(settings).length > 0) {
            await setBlockSettings(settings);
        }
        await updateAssetIdsFromKey(IMAGE_ID, [newImage.id]);
        setUploadIsLoading(false);
    };

    const onOpenAssetChooser = () => {
        openAssetChooser(
            async (result) => {
                setUploadIsLoading(true);
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
        setUploadIsLoading(true);
        uploadFile(files[0]);
    };

    const addUrlToBlockSettings = async (url: string) => {
        await setBlockSettings({ lottieUrl: url });
        setUrlIsLoading(false);
    };
    const handleUrlSubmit = (url: string) => {
        setUrlIsLoading(true);
        addUrlToBlockSettings(url);
    };

    useEffect(() => {
        if (selectedFiles) {
            setUploadIsLoading(true);
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

    // Intersection Observer to check if image is in view
    // animation is not triggered if image is not in view
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            {
                threshold: 0.01,
            }
        );
        const imageBlock = componentRef.current;
        if (imageBlock) {
            observer.observe(imageBlock);
        }
        return () => {
            if (imageBlock) {
                observer.unobserve(imageBlock);
            }
        };
    }, []);

    const onRemoveAsset = () => {
        setBlockSettings({ altText: undefined, lottieUrl: undefined });
        setLocalAltText(undefined);
        if (image) {
            deleteAssetIdsFromKey(IMAGE_ID, [image?.id]);
        }
        setImageBlockKey((prevKey) => prevKey + 1);
        console.log('image', image);
        console.log('blockAssets', blockAssets);
    };

    return (
        <div className="image-block" ref={componentRef}>
            {isInView && (
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
                            {image || lottieUrl !== undefined ? (
                                <BlockItemWrapper
                                    shouldHideWrapper={!isEditing}
                                    showAttachments={false}
                                    toolbarItems={[
                                        getEditAltTextToolbarButton({
                                            localAltText,
                                            setLocalAltText,
                                            blockSettings,
                                            setBlockSettings,
                                        }),
                                        {
                                            type: 'button',
                                            icon: <IconTrashBin16 />,
                                            onClick: onRemoveAsset,
                                            tooltip: 'Delete',
                                        },
                                        ...(image
                                            ? [
                                                  {
                                                      type: 'menu' as const,
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
                                              ]
                                            : []),
                                    ]}
                                >
                                    {urlIsLoading || uploadIsLoading ? (
                                        <div className="tw-flex tw-items-center tw-justify-center tw-h-64">
                                            <LoadingCircle />
                                        </div>
                                    ) : (
                                        <Image
                                            key={imageBlockKey}
                                            appBridge={appBridge}
                                            blockSettings={blockSettings}
                                            isEditing={isEditing}
                                            imageSource={image || lottieUrl}
                                            isDownloadable={isDownloadable}
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
                                            urlLoading={urlIsLoading}
                                            fileLoading={uploadIsLoading}
                                            onUploadClick={openFileDialog}
                                            onFilesDrop={onFilesDrop}
                                            onAssetChooseClick={onOpenAssetChooser}
                                            onUrlSubmit={(url) => handleUrlSubmit(url)}
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
            )}
        </div>
    );
}, ATTACHMENTS_ASSET_ID);
