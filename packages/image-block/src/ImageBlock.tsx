/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type Asset,
    getMimeType,
    useAssetChooser,
    useAssetUpload,
    useBlockAssets,
    useBlockSettings,
    useEditorState,
    useFileInput,
    usePrivacySettings,
} from '@frontify/app-bridge';
import { generateRandomId, merge } from '@frontify/fondue';
import { LoadingCircle } from '@frontify/fondue/components';
import { IconArrowCircleUp, IconImageStack, IconTrashBin } from '@frontify/fondue/icons';
import {
    AttachmentOperationsProvider,
    BlockItemWrapper,
    type BlockProps,
    Security,
    TextStyles,
    convertToRteValue,
    hasRichTextValue,
    isDownloadable,
} from '@frontify/guideline-blocks-settings';
import { StyleProvider, getEditAltTextToolbarButton } from '@frontify/guideline-blocks-shared';
import { useEffect, useState } from 'react';

import { DownloadAndAttachments } from './components/DownloadAndAttachments';
import { Image } from './components/Image';
import { ImageCaption } from './components/ImageCaption';
import { UploadPlaceholder } from './components/UploadPlaceholder';
import { DEFAULT_IMAGE_BLOCK_SETTINGS } from './const';
import { getDownloadAriaLabel } from './helpers/getDownloadAriaLabel';
import { ALLOWED_EXTENSIONS, ATTACHMENTS_ASSET_ID, IMAGE_ID } from './settings';
import { CaptionPosition, type Settings, imageRatioValues, mapCaptionPositionClasses } from './types';

export const ImageBlock = ({ appBridge }: BlockProps) => {
    const { assetDownloadEnabled, assetViewerEnabled: globalAssetViewerEnabled } = usePrivacySettings(appBridge);
    const [_blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const blockSettings = { ...DEFAULT_IMAGE_BLOCK_SETTINGS, ..._blockSettings };
    // eslint-disable-next-line @eslint-react/prefer-use-state-lazy-initialization
    const [titleKey, setTitleKey] = useState(generateRandomId());
    const { openAssetChooser, closeAssetChooser } = useAssetChooser(appBridge);
    const isEditing = useEditorState(appBridge);
    const blockId = String(appBridge.context('blockId').get());
    const {
        altText,
        name,
        positioning,
        ratio,
        description,
        hasLink,
        assetViewerEnabled: blockAssetViewerEnabled,
        security,
    } = blockSettings;
    const [localAltText, setLocalAltText] = useState<string | undefined>(altText);
    const [isLoading, setIsLoading] = useState(false);
    const blockAssetsBundle = useBlockAssets(appBridge);
    const { blockAssets, deleteAssetIdsFromKey, updateAssetIdsFromKey } = blockAssetsBundle;
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

        if (isFirstImageUpload) {
            const defaultImageName = newImage?.title ?? newImage?.fileName ?? '';

            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            settings.altText = newImage?.alternativeText ?? '';
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            setLocalAltText(newImage?.alternativeText ?? '');

            const hasManuallyEditedName = hasRichTextValue(name);
            if (!hasManuallyEditedName) {
                settings.name = convertToRteValue(TextStyles.imageTitle, defaultImageName, 'center');
            }
        }

        if (newImage.backgroundColor) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
            // eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/require-await
            async (result) => {
                setIsLoading(true);
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
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
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            updateImage(uploadResults[0]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doneAll, uploadResults]);

    const onRemoveAsset = () => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        setBlockSettings({ altText: undefined });
        setLocalAltText(undefined);
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        deleteAssetIdsFromKey(IMAGE_ID, [image?.id]);
    };

    const isAssetViewerEnabled =
        security === Security.Custom ? (blockAssetViewerEnabled ?? true) : globalAssetViewerEnabled;
    const ariaLabel = getDownloadAriaLabel(isAssetViewerEnabled, hasLink, altText, image?.title);

    return (
        <AttachmentOperationsProvider
            blockAssetBundle={blockAssetsBundle}
            assetId={ATTACHMENTS_ASSET_ID}
            appBridge={appBridge}
        >
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
                                    [CaptionPosition.Above, CaptionPosition.Below].includes(positioning)
                                        ? 'tw-w-full'
                                        : imageRatioValues[ratio],
                                ])}
                            >
                                <DownloadAndAttachments
                                    appBridge={appBridge}
                                    blockSettings={blockSettings}
                                    image={image}
                                    ariaLabel={ariaLabel}
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
                                                icon: <IconTrashBin size={16} />,
                                                onClick: onRemoveAsset,
                                                tooltip: 'Delete',
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
                                                    [
                                                        {
                                                            title: 'Delete',
                                                            icon: <IconTrashBin size={20} />,
                                                            style: 'danger',
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
                                                isAssetViewerEnabled={isAssetViewerEnabled}
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
        </AttachmentOperationsProvider>
    );
};
