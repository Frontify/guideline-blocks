/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Asset, useAssetChooser, useAssetUpload, useFileInput } from '@frontify/app-bridge';
import { AssetChooserObjectType, FileExtensionSets, toRgbaString } from '@frontify/guideline-blocks-settings';
import { useEffect, useState } from 'react';

import { type DoDontItemProps, DoDontType } from '../types';

type UseDoDontAssetsProps = Pick<
    DoDontItemProps,
    | 'id'
    | 'appBridge'
    | 'alt'
    | 'onChangeItem'
    | 'updateAssetIdsFromKey'
    | 'type'
    | 'hasStrikethrough'
    | 'hasBorder'
    | 'borderWidth'
    | 'borderStyle'
    | 'borderColor'
>;

export const useDoDontAssets = ({
    id,
    appBridge,
    alt,
    onChangeItem,
    updateAssetIdsFromKey,
    type,
    hasStrikethrough: shouldHaveStrikethrough,
    hasBorder,
    borderWidth,
    borderStyle,
    borderColor,
}: UseDoDontAssetsProps) => {
    const [localAltText, setLocalAltText] = useState<string | undefined>(alt);
    const [isUploadLoading, setIsUploadLoading] = useState(false);
    const border = hasBorder ? `${borderWidth} ${borderStyle} ${toRgbaString(borderColor)}` : '';
    const hasStrikethrough = type === DoDontType.Dont && shouldHaveStrikethrough;

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
            // oxlint-disable-next-line typescript/no-misused-promises
            async (result: Asset[]) => {
                setIsUploadLoading(true);
                const asset = result[0];
                const imageAlt = alt ?? asset.alternativeText ?? '';
                setLocalAltText(imageAlt);
                if (updateAssetIdsFromKey) {
                    await updateAssetIdsFromKey(id, [asset.id]);
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

    useEffect(() => {
        if (selectedFiles) {
            setIsUploadLoading(true);
            uploadFile(selectedFiles);
        }
        // oxlint-disable-next-line @eslint-react/exhaustive-deps
    }, [selectedFiles]);

    useEffect(() => {
        if (doneAll) {
            // oxlint-disable-next-line typescript/no-floating-promises
            (async (uploadResults) => {
                const asset = uploadResults?.[0];
                const imageAlt = alt ?? asset.alternativeText ?? '';
                setLocalAltText(imageAlt);
                if (updateAssetIdsFromKey) {
                    await updateAssetIdsFromKey(id, [asset.id]);
                    setIsUploadLoading(false);
                    onChangeItem(id, { alt: imageAlt });
                }
            })(uploadResults);
        }
        // oxlint-disable-next-line @eslint-react/exhaustive-deps
    }, [doneAll, uploadResults]);

    return {
        onOpenAssetChooser,
        onUploadClick,
        isUploadLoading,
        localAltText,
        setLocalAltText,
        border,
        hasStrikethrough,
    };
};
