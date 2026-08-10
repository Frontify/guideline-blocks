/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type Asset,
    AssetChooserObjectType,
    FileExtensionSets,
    useAssetChooser,
    useAssetUpload,
    useFileInput,
} from "@frontify/app-bridge";
import { toRgbaString } from "@frontify/guideline-blocks-settings";
import {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useState,
} from "react";

import ImageComponent from "./components/ImageComponent";
import { getImageAltText } from "./helpers/getImageAltText";
import { DoDontType, type DoDontItemProps } from "./types";

export type DosDontsAssetsRef = {
    openUpload: () => void;
    openAssetChooser: () => void;
};

type DosDontsAssetsProps = Pick<
    DoDontItemProps,
    | "id"
    | "appBridge"
    | "editing"
    | "linkedImage"
    | "alt"
    | "onChangeItem"
    | "updateAssetIdsFromKey"
    | "isCustomImageHeight"
    | "customImageHeightValue"
    | "imageDisplay"
    | "draggableProps"
    | "imageHeightChoice"
    | "isDragging"
    | "type"
    | "hasStrikethrough"
    | "backgroundColor"
    | "hasBackground"
    | "hasRadius"
    | "radiusChoice"
    | "borderColor"
    | "borderStyle"
    | "borderWidth"
    | "hasBorder"
    | "radiusValue"
    | "dontColor"
>;

export const DosDontsAssets = forwardRef<
    DosDontsAssetsRef,
    DosDontsAssetsProps
>((props, ref) => {
    const {
        id,
        appBridge,
        editing,
        linkedImage,
        alt,
        onChangeItem,
        updateAssetIdsFromKey,
        isDragging,
        type,
        hasStrikethrough,
        borderColor,
        borderStyle,
        borderWidth,
        hasBorder,
    } = props;

    const [isUploadLoading, setIsUploadLoading] = useState(false);

    const { openAssetChooser, closeAssetChooser } = useAssetChooser(appBridge);

    const [openFileDialog, { selectedFiles }] = useFileInput({
        multiple: false,
        accept: "image/*",
    });

    const [uploadFile, { results: uploadResults, doneAll }] = useAssetUpload({
        onUploadProgress: () => {
            setIsUploadLoading(true);
        },
    });

    const saveAsset = useCallback(
        async (asset: Asset) => {
            const imageAlt = getImageAltText(alt, asset);
            try {
                if (updateAssetIdsFromKey) {
                    await updateAssetIdsFromKey(id, [asset.id]);
                    onChangeItem(id, { alt: imageAlt });
                }
            } finally {
                setIsUploadLoading(false);
            }
        },
        [alt, id, onChangeItem, updateAssetIdsFromKey],
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
            },
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
        }),
        [onOpenAssetChooser, onUploadClick],
    );

    useEffect(() => {
        if (selectedFiles) {
            setIsUploadLoading(true);
            uploadFile(selectedFiles);
        }
        // eslint-disable-next-line @eslint-react/exhaustive-deps
    }, [selectedFiles]);

    useEffect(() => {
        if (!doneAll) {
            return;
        }
        const asset = uploadResults?.[0];
        if (!asset) {
            return;
        }
        saveAsset(asset).catch(() => undefined);
        // eslint-disable-next-line @eslint-react/exhaustive-deps
    }, [doneAll, uploadResults]);

    return (
        <ImageComponent
            {...props}
            image={linkedImage}
            onAssetChooseClick={onOpenAssetChooser}
            onUploadClick={onUploadClick}
            isUploadLoading={isUploadLoading}
            isEditing={editing}
            isDragging={Boolean(isDragging)}
            hasStrikethrough={type === DoDontType.Dont && hasStrikethrough}
            border={
                hasBorder
                    ? `${borderWidth} ${borderStyle} ${toRgbaString(borderColor)}`
                    : ""
            }
        />
    );
});

DosDontsAssets.displayName = "DosDontsAssets";
