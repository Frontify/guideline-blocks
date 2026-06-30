/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Asset, useAssetChooser, useAssetUpload, useFileInput } from '@frontify/app-bridge';
import { AssetChooserObjectType, FileExtensionSets, toRgbaString } from '@frontify/guideline-blocks-settings';
import { EditAltTextFlyout } from '@frontify/guideline-blocks-shared';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

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
            onUploadProgress: () => !isUploadLoading && setIsUploadLoading(true),
        });

        const onOpenAssetChooser = () => {
            openAssetChooser(
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                async (result: Asset[]) => {
                    setIsUploadLoading(true);

                    const asset = result[0];
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    const imageAlt = alt ?? asset.alternativeText ?? '';

                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    setLocalAltText(imageAlt);

                    if (updateAssetIdsFromKey) {
                        await updateAssetIdsFromKey(id, [asset.id]);

                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        onChangeItem(id, { alt: imageAlt });

                        setIsUploadLoading(false);
                    }

                    closeAssetChooser();
                },
                {
                    multiSelection: false,
                    objectTypes: [AssetChooserObjectType.ImageVideo],
                    extensions: FileExtensionSets.Images,
                }
            );
        };

        const onUploadClick = () => {
            openFileDialog();
        };

        useImperativeHandle(ref, () => ({
            openUpload: onUploadClick,
            openAssetChooser: onOpenAssetChooser,
            openAltTextMenu: () => setShowAltTextMenu(true),
        }));

        useEffect(() => {
            if (selectedFiles) {
                setIsUploadLoading(true);
                uploadFile(selectedFiles);
            }
            // eslint-disable-next-line @eslint-react/exhaustive-deps
        }, [selectedFiles]);

        useEffect(() => {
            if (doneAll) {
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                (async (uploadResults) => {
                    const asset = uploadResults?.[0];

                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    const imageAlt = alt ?? asset.alternativeText ?? '';

                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    setLocalAltText(imageAlt);

                    if (updateAssetIdsFromKey) {
                        await updateAssetIdsFromKey(id, [asset.id]);
                        setIsUploadLoading(false);

                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        onChangeItem(id, { alt: imageAlt });
                    }
                })(uploadResults);
            }
            // eslint-disable-next-line @eslint-react/exhaustive-deps
        }, [doneAll, uploadResults]);

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
