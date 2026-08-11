/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type Asset,
    type AppBridgeBlock,
    useAssetChooser,
    useAssetUpload,
    useFileInput,
} from "@frontify/app-bridge";
import {
    AssetChooserObjectType,
    FileExtensionSets,
} from "@frontify/guideline-blocks-settings";
import { useEffect, useState } from "react";

import { type ChangeType, type ValueType } from "../types";

type UseDoDontAssetsProps = {
    id: string;
    appBridge: AppBridgeBlock;
    alt?: string;
    onChangeItem: (
        id: string,
        change: Partial<Record<ChangeType, ValueType>>,
    ) => void;
    updateAssetIdsFromKey?: (key: string, assetIds: number[]) => Promise<void>;
};

export const useDoDontAssets = ({
    id,
    appBridge,
    alt,
    onChangeItem,
    updateAssetIdsFromKey,
}: UseDoDontAssetsProps) => {
    const [localAltText, setLocalAltText] = useState<string | undefined>(alt);
    const [isUploadLoading, setIsUploadLoading] = useState(false);

    const { openAssetChooser, closeAssetChooser } = useAssetChooser(appBridge);
    const [openFileDialog, { selectedFiles }] = useFileInput({
        multiple: false,
        accept: "image/*",
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
                // oxlint-disable-next-line typescript/no-unsafe-assignment
                const imageAlt = alt ?? asset.alternativeText ?? "";
                // oxlint-disable-next-line typescript/no-unsafe-argument
                setLocalAltText(imageAlt);
                if (updateAssetIdsFromKey) {
                    await updateAssetIdsFromKey(id, [asset.id]);
                    // oxlint-disable-next-line typescript/no-unsafe-assignment
                    onChangeItem(id, { alt: imageAlt });
                    setIsUploadLoading(false);
                }

                closeAssetChooser();
            },
            {
                multiSelection: false,
                objectTypes: [AssetChooserObjectType.ImageVideo],
                extensions: FileExtensionSets.Images,
            },
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
                // oxlint-disable-next-line typescript/no-unsafe-assignment
                const imageAlt = alt ?? asset.alternativeText ?? "";
                // oxlint-disable-next-line typescript/no-unsafe-argument
                setLocalAltText(imageAlt);
                if (updateAssetIdsFromKey) {
                    await updateAssetIdsFromKey(id, [asset.id]);
                    setIsUploadLoading(false);
                    // oxlint-disable-next-line typescript/no-unsafe-assignment
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
    };
};
