/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type Asset,
    AssetChooserObjectType,
    FileExtensionSets,
    useAssetChooser,
    useAssetUpload,
    useFileInput,
} from "@frontify/app-bridge";
import { EditAltTextFlyout } from "@frontify/guideline-blocks-shared";
import {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useState,
} from "react";

import ImageComponent from "./components/ImageComponent";
import {
    BlockMode,
    DoDontType,
    type DoDontItemProps,
    type ImageComponentProps,
} from "./types";

export type DosDontsAssetsRef = {
    openUpload: () => void;
    openAssetChooser: () => void;
    openAltTextMenu: () => void;
};

type DosDontsAssetsProps = Pick<
    DoDontItemProps,
    | "id"
    | "appBridge"
    | "mode"
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

const getImageAltText = (alt: string | undefined, asset: Asset): string => {
    return (
        alt ??
        (typeof asset.alternativeText === "string" ? asset.alternativeText : "")
    );
};

const toRgbaString = (
    color:
        | string
        | {
              red?: number;
              green?: number;
              blue?: number;
              alpha?: number;
          }
        | undefined,
): string => {
    if (!color) {
        return "transparent";
    }

    if (typeof color === "string") {
        return color;
    }

    const red = color.red ?? 0;
    const green = color.green ?? 0;
    const blue = color.blue ?? 0;
    const alpha = color.alpha ?? 1;

    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
};

export const DosDontsAssets = forwardRef<
    DosDontsAssetsRef,
    DosDontsAssetsProps
>((props, ref) => {
    const {
        id,
        appBridge,
        mode,
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
        isCustomImageHeight,
        customImageHeightValue,
        imageDisplay,
        imageHeightChoice,
        draggableProps,
        hasRadius,
        radiusChoice,
        radiusValue,
        hasBackground,
        backgroundColor,
        dontColor,
    } = props;

    const [showAltTextMenu, setShowAltTextMenu] = useState(false);
    const [localAltText, setLocalAltText] = useState<string | undefined>(alt);
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
            setLocalAltText(imageAlt);
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
            openAltTextMenu: () => setShowAltTextMenu(true),
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

    const imageProps: ImageComponentProps = {
        isEditing: editing,
        id,
        alt,
        image: linkedImage,
        onAssetChooseClick: onOpenAssetChooser,
        onUploadClick,
        isUploadLoading,
        isDragging: Boolean(isDragging),
        hasStrikethrough: type === DoDontType.Dont && hasStrikethrough,
        border: hasBorder
            ? `${borderWidth} ${borderStyle} ${toRgbaString(borderColor)}`
            : "",
        isCustomImageHeight,
        customImageHeightValue,
        imageDisplay,
        imageHeightChoice,
        draggableProps,
        hasRadius,
        radiusChoice,
        radiusValue,
        hasBackground,
        backgroundColor,
        dontColor,
    };

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
                <ImageComponent {...imageProps} />
            )}
        </>
    );
});

DosDontsAssets.displayName = "DosDontsAssets";
