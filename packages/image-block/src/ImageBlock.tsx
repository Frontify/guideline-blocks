/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    Asset,
    AssetChooserObjectType,
    FileExtensionSets,
    useAssetChooser,
    useAssetUpload,
    useBlockAssets,
    useBlockSettings,
    useEditorState,
    useFileInput,
} from '@frontify/app-bridge';

import 'tailwindcss/tailwind.css';
import '@frontify/guideline-blocks-settings/styles';
import { CaptionPosition, Settings, mapCaptionPositionClasses, ratioValues } from './types';
import { ImageCaption } from './components/ImageCaption';
import { IMAGE_ID } from './settings';
import {
    BlockItemWrapper,
    BlockProps,
    TextStyles,
    convertToRteValue,
    hasRichTextValue,
} from '@frontify/guideline-blocks-settings';
import { EditAltTextFlyout } from '@frontify/guideline-blocks-shared';
import { Image } from './components/Image';
import { useEffect, useState } from 'react';
import {
    IconArrowCircleUp20,
    IconImageStack20,
    IconSpeechBubbleQuote20,
    IconTrashBin20,
    LoadingCircle,
    MenuItemStyle,
} from '@frontify/fondue';
import { UploadPlaceholder } from './components/UploadPlaceholder';

export const ImageBlock = ({ appBridge }: BlockProps) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const { openAssetChooser, closeAssetChooser } = useAssetChooser(appBridge);
    const isEditing = useEditorState(appBridge);
    const blockId = appBridge.getBlockId().toString();
    const [showAltTextMenu, setShowAltTextMenu] = useState(false);
    const [localAltText, setLocalAltText] = useState<string | undefined>(blockSettings.altText);
    const [isLoading, setIsLoading] = useState(false);
    const { blockAssets, deleteAssetIdsFromKey, updateAssetIdsFromKey } = useBlockAssets(appBridge);
    const image = blockAssets?.[IMAGE_ID]?.[0];
    const [openFileDialog, { selectedFiles }] = useFileInput({ accept: 'image/*' });
    const [uploadFile, { results: uploadResults, doneAll }] = useAssetUpload({
        onUploadProgress: () => !isLoading && setIsLoading(true),
    });

    const updateImage = async (image: Asset) => {
        if (!hasRichTextValue(blockSettings.name)) {
            setBlockSettings({ name: convertToRteValue(TextStyles.imageTitle, image?.title, 'center') });
        }
        setBlockSettings({ altText: image?.title ?? image?.fileName ?? '' });
        await updateAssetIdsFromKey(IMAGE_ID, [image.id]);
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
                objectTypes: [AssetChooserObjectType.ImageVideo],
                extensions: FileExtensionSets.Images,
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
                            shouldBeShown={showAltTextMenu}
                            toolbarFlyoutItems={[
                                image
                                    ? [
                                          {
                                              title: 'Set alt text',
                                              onClick: () => setShowAltTextMenu(true),
                                              icon: <IconSpeechBubbleQuote20 />,
                                          },
                                      ]
                                    : [],
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
                            ]}
                            toolbarItems={[]}
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
                            <EditAltTextFlyout
                                setShowAltTextMenu={setShowAltTextMenu}
                                showAltTextMenu={showAltTextMenu}
                                setLocalAltText={setLocalAltText}
                                defaultAltText={blockSettings.altText}
                                onSave={() => setBlockSettings({ altText: localAltText || undefined })}
                                localAltText={localAltText}
                            />
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
                <ImageCaption blockId={blockId} isEditing={isEditing} appBridge={appBridge} />
            </div>
        </div>
    );
};
