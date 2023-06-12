/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    Asset,
    AssetChooserObjectType,
    FileExtension,
    FileExtensionSets,
    useAssetUpload,
    useBlockAssets,
    useBlockSettings,
    useEditorState,
    useFileInput,
} from '@frontify/app-bridge';
import '@frontify/fondue-tokens/styles';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import 'tailwindcss/tailwind.css';
import { CaptionPosition, Settings, mapCaptionPositionClasses, ratioValues } from './types';
import { ImageCaption } from './components/ImageCaption';
import { IMAGE_ID } from './settings';
import {
    BlockItemWrapper,
    convertToRteValue,
    hasRichTextValue,
    joinClassNames,
} from '@frontify/guideline-blocks-shared';
import { Image } from './components/Image';
import { useEffect, useState } from 'react';
import {
    IconArrowCircleUp20,
    IconImageStack20,
    IconTrashBin20,
    LoadingCircle,
    MenuItemStyle,
    TextStyles,
} from '@frontify/fondue';
import { UploadPlaceholder } from './components/UploadPlaceholder';

export const ImageBlock = ({ appBridge }: BlockProps) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState(appBridge);
    const blockId = appBridge.getBlockId().toString();

    const [isLoading, setIsLoading] = useState(false);
    const [updateValueOnChange, setUpdateValueOnChange] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string>();
    const { blockAssets, deleteAssetIdsFromKey, updateAssetIdsFromKey } = useBlockAssets(appBridge);
    const image = blockAssets?.[IMAGE_ID]?.[0];
    const [openFileDialog, { selectedFiles }] = useFileInput({ accept: 'image/*' });
    const [uploadFile, { results: uploadResults, doneAll }] = useAssetUpload({
        onUploadProgress: () => !isLoading && setIsLoading(true),
    });

    const updateImage = async (image: Asset) => {
        setErrorMsg(undefined);
        if (!hasRichTextValue(blockSettings.name)) {
            setBlockSettings({ name: convertToRteValue(TextStyles.imageTitle, image?.title, 'center') });
            setUpdateValueOnChange(true);
        }
        await updateAssetIdsFromKey(IMAGE_ID, [image.id]);
        setIsLoading(false);
        setUpdateValueOnChange(false);
    };

    const openAssetChooser = () => {
        appBridge.openAssetChooser(
            async (result) => {
                setIsLoading(true);
                updateImage(result[0]);
                appBridge.closeAssetChooser();
            },
            {
                selectedValueId: blockAssets[IMAGE_ID]?.[0]?.id,
                objectTypes: [AssetChooserObjectType.ImageVideo],
                extensions: FileExtensionSets.Images,
            }
        );
    };

    const onFilesDrop = (files: FileList) => {
        if (!files) {
            return;
        }
        const droppedFileExtension = files[0].name.split('.').pop()?.toLocaleLowerCase() as FileExtension;
        if (FileExtensionSets.Images.includes(droppedFileExtension)) {
            setIsLoading(true);
            uploadFile(files[0]);
        } else {
            setErrorMsg('Please drop a correct image format.');
        }
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
        deleteAssetIdsFromKey(IMAGE_ID, [image?.id]);
    };

    return (
        <div
            data-test-id="image-block"
            className={joinClassNames([
                'tw-flex tw-h-auto tw-gap-3',
                mapCaptionPositionClasses[blockSettings.positioning],
            ])}
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
                                    style: MenuItemStyle.Danger,
                                    onClick: () => onRemoveAsset(),
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
                    </BlockItemWrapper>
                ) : (
                    isEditing && (
                        <UploadPlaceholder
                            errorMsg={errorMsg}
                            loading={isLoading}
                            onUploadClick={openFileDialog}
                            onFilesDrop={onFilesDrop}
                            onAssetChooseClick={openAssetChooser}
                        />
                    )
                )}
            </div>
            <ImageCaption
                blockId={blockId}
                isEditing={isEditing}
                appBridge={appBridge}
                updateValueOnChange={updateValueOnChange}
            />
        </div>
    );
};
