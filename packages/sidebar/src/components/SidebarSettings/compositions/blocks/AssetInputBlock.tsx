/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import {
    ActionMenuProps,
    AssetInput,
    AssetInputProps,
    AssetInputSize,
    FormControl,
    IconImageLibrary,
    IconUploadAlternative,
} from '@frontify/arcade';
import {
    Asset,
    UploadFileType,
    AssetChooserResult,
    useFileInput,
    useFileUpload,
    useAssetChooser,
    getMimeType,
    AppBridgeNative,
} from '@frontify/app-bridge';
import { AssetInputBlock as AssetInputBlockType } from '../../hooks/useSettings';
import { UpdateDataFunction } from '../../hocs/withSettings';

const getContextualMenuActions = (
    onReplaceWithAsset: () => void,
    onReplaceWithUpload: () => void
): ActionMenuProps['menuBlocks'] => [
    {
        id: 'asset-input-options',
        ariaLabel: 'Asset Input Options',
        menuItems: [
            {
                id: 'replace-asset',
                title: 'Replace with Asset',
                decorator: <IconImageLibrary />,
                onClick: onReplaceWithAsset,
            },
            {
                id: 'replace-upload',
                title: 'Replace with Upload',
                decorator: <IconUploadAlternative />,
                onClick: onReplaceWithUpload,
            },
        ],
    },
];

export type AssetInputBlockProps = {
    block: AssetInputBlockType;
    onUpdate: UpdateDataFunction<AssetInputBlockType['value']>;
};

export const AssetInputBlock: FC<AssetInputBlockProps> = ({ block, onUpdate }) => {
    const allowedMimeTypes = getMimeType(block.allowedExtensions);

    const [openFileDialog, { selectedFiles }] = useFileInput({
        accept: allowedMimeTypes.join(',') || undefined,
        multiple: true,
    });

    const uploadOptions = {
        fileType: UploadFileType.Asset,
    };
    const [uploadFile, { results: uploadResults, doneAll }] = useFileUpload({ options: uploadOptions });

    const [uploadedAsset, setUploadedAsset] = useState<AssetInputProps['asset']>();

    const { openAssetChooser, closeAssetChooser } = useAssetChooser();

    useEffect(() => {
        if (block.value) {
            (async (assetId: number) => {
                const appBridge = new AppBridgeNative();
                const asset = await appBridge.getAssetById(assetId);
                setAssetPreview(asset);
            })(block.value);
        }
    }, []);

    useEffect(() => {
        if (selectedFiles) {
            uploadFile(selectedFiles);
        }
    }, [selectedFiles]);

    const setAssetPreview = useCallback((uploadResult: Asset) => {
        const { name, filename, title, object_type, ext, generic_url, size, project_type, project_name } = uploadResult;
        setUploadedAsset({
            name: title ?? name ?? filename ?? 'No Name',
            type: object_type,
            extension: ext,
            src: generic_url,
            size: size,
            source: project_type === 'STYLEGUIDE' ? 'upload' : 'library',
            sourceName: project_name,
        } as AssetInputProps['asset']);
    }, []);

    useEffect(() => {
        if (doneAll && uploadResults) {
            onUpdate(block.id, uploadResults[0].id);
            setAssetPreview({ ...uploadResults[0], project_type: 'STYLEGUIDE' });
        }
    }, [doneAll, uploadResults]);

    const onAssetChooserAssetSelected = useCallback(
        (assetChooserResult: AssetChooserResult) => {
            const { screenData } = assetChooserResult;
            onUpdate(block.id, screenData[0].id);
            setAssetPreview(screenData[0]);
            closeAssetChooser();
        },
        [block]
    );

    const assetInputProps = useMemo(() => {
        if (uploadedAsset) {
            return {
                asset: uploadedAsset,
                actions: getContextualMenuActions(() => openAssetChooser(onAssetChooserAssetSelected), openFileDialog),
                size: AssetInputSize.Large,
            };
        } else {
            return {
                onLibraryClick: () => openAssetChooser(onAssetChooserAssetSelected),
                onUploadClick: openFileDialog,
            };
        }
    }, [uploadedAsset, openFileDialog]);

    return (
        <FormControl
            label={{
                children: block.label ?? '',
                htmlFor: block.id,
                tooltip: block.info ? { content: block.info } : undefined,
            }}
        >
            <AssetInput {...assetInputProps} />
        </FormControl>
    );
};
