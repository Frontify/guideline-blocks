/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Asset, useAssetChooser, useAssetUpload, useFileInput } from '@frontify/app-bridge';
import { AssetChooserObjectType, FileExtensionSets, toRgbaString } from '@frontify/guideline-blocks-settings';
import { EditAltTextFlyout } from '@frontify/guideline-blocks-shared';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';

import ImageComponent from './components/ImageComponent';
import { BlockMode, DoDontType, type DoDontItemProps } from './types';

export type DosDontsAssetsRef = {
    openUpload: () => void;
    openAssetChooser: () => void;
    openAltTextMenu: () => void;
};

type DosDontsAssetsProps = Pick<
    DoDontItemProps,
    | 'id'
    | 'appBridge'
    | 'mode'
    | 'editing'
    | 'linkedImage'
    | 'alt'
    | 'onChangeItem'
    | 'updateAssetIdsFromKey'
    | 'isCustomImageHeight'
    | 'customImageHeightValue'
    | 'imageDisplay'
    | 'draggableProps'
    | 'imageHeightChoice'
    | 'isDragging'
    | 'type'
    | 'hasStrikethrough'
    | 'backgroundColor'
    | 'hasBackground'
    | 'hasRadius'
    | 'radiusChoice'
    | 'borderColor'
    | 'borderStyle'
    | 'borderWidth'
    | 'hasBorder'
    | 'radiusValue'
    | 'dontColor'
>;

const getImageAltText = (alt: string | undefined, asset: Asset): string => {
    return alt ?? (typeof asset.alternativeText === 'string' ? asset.alternativeText : '');
};

export const DosDontsAssets = forwardRef<DosDontsAssetsRef, DosDontsAssetsProps>(
    (
        {
            id,
            appBridge,
            mode,
            editing,
            linkedImage,
            alt,
            onChangeItem,
            updateAssetIdsFromKey,
            isCustomImageHeight,
            customImageHeightValue,
            imageDisplay,
            draggableProps,
            imageHeightChoice,
            isDragging,
            type,
            hasStrikethrough,
            backgroundColor,
            hasBackground,
            hasRadius,
            radiusChoice,
            borderColor,
            borderStyle,
            borderWidth,
            hasBorder,
            radiusValue,
            dontColor,
        },
        ref
    ) => {
        const [showAltTextMenu, setShowAltTextMenu] = useState(false);
        const [localAltText, setLocalAltText] = useState<string | undefined>(alt);
        const [isUploadLoading, setIsUploadLoading] = useState(false);

        const { openAssetChooser, closeAssetChooser } = useAssetChooser(appBridge);

        const [openFileDialog, { selectedFiles }] = useFileInput({
            multiple: false,
            accept: 'image/*',
        });

        const [uploadFile, { results: uploadResults, doneAll }] = useAssetUpload({
            onUploadProgress: () => {
                setIsUploadLoading(true);
            },
        });

        const saveAsset = useCallback(
            async (asset: Asset) => {
                const imageAlt = getImageAltText(alt, asset);

                setLocalAltText(imageAlt);

                if (updateAssetIdsFromKey) {
                    await updateAssetIdsFromKey(id, [asset.id]);
                    onChangeItem(id, { alt: imageAlt });
                }

                setIsUploadLoading(false);
            },
            [alt, id, onChangeItem, updateAssetIdsFromKey]
        );

        const onOpenAssetChooser = useCallback(() => {
            openAssetChooser(
                (result: Asset[]) => {
                    const asset = result[0];

                    if (!asset) {
                        closeAssetChooser();
                        return;
                    }

                    setIsUploadLoading(true);

                    saveAsset(asset)
                        .finally(() => {
                            closeAssetChooser();
                        })
                        .catch(() => undefined);
                },
                {
                    multiSelection: false,
                    objectTypes: [AssetChooserObjectType.ImageVideo],
                    extensions: FileExtensionSets.Images,
                }
            );
        }, [closeAssetChooser, openAssetChooser, saveAsset]);

        const onUploadClick = useCallback(() => {
            openFileDialog();
        }, [openFileDialog]);

        useImperativeHandle(
            ref,
            () => ({
                openUpload: onUploadClick,
                openAssetChooser: onOpenAssetChooser,
                openAltTextMenu: () => setShowAltTextMenu(true),
            }),
            [onOpenAssetChooser, onUploadClick]
        );

        useEffect(() => {
            if (selectedFiles) {
                setIsUploadLoading(true);
                uploadFile(selectedFiles);
            }
        }, [selectedFiles, uploadFile]);

        useEffect(() => {
            if (!doneAll) {
                return;
            }
            const asset = uploadResults?.[0];

            if (!asset) {
                return;
            }

            saveAsset(asset).catch(() => undefined);
        }, [doneAll, saveAsset, uploadResults]);

        return (
            <>
                <EditAltTextFlyout
                    setShowAltTextMenu={setShowAltTextMenu}
                    showAltTextMenu={showAltTextMenu}
                    setLocalAltText={setLocalAltText}
                    defaultAltText={alt}
                    onSave={() => onChangeItem(id, { alt: localAltText })}
                    localAltText={localAltText}
                />

                {mode === BlockMode.TEXT_AND_IMAGE && (
                    <ImageComponent
                        isEditing={editing}
                        id={id}
                        alt={alt}
                        image={linkedImage}
                        onAssetChooseClick={onOpenAssetChooser}
                        onUploadClick={onUploadClick}
                        isUploadLoading={isUploadLoading}
                        isCustomImageHeight={isCustomImageHeight}
                        customImageHeightValue={customImageHeightValue}
                        imageDisplay={imageDisplay}
                        draggableProps={draggableProps}
                        imageHeightChoice={imageHeightChoice}
                        isDragging={Boolean(isDragging)}
                        hasStrikethrough={type === DoDontType.Dont && hasStrikethrough}
                        backgroundColor={backgroundColor}
                        hasBackground={hasBackground}
                        hasRadius={hasRadius}
                        radiusChoice={radiusChoice}
                        border={hasBorder ? `${borderWidth} ${borderStyle} ${toRgbaString(borderColor)}` : ''}
                        radiusValue={radiusValue}
                        dontColor={dontColor}
                    />
                )}
            </>
        );
    }
);

DosDontsAssets.displayName = 'DosDontsAssets';
