/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock, Asset, useAssetViewer } from '@frontify/app-bridge';
import { UploadPlaceholder } from './UploadPlaceholder';
import { ImageWrapper } from './ImageWrapper';
import { ThumbnailStylesProps } from '../../types';
import { ResponsiveImage, useImageContainer } from '@frontify/guideline-blocks-shared';

type ImageProps = {
    thumbnailStyles: ThumbnailStylesProps;
    image: Asset | undefined;
    isLoading: boolean;
    altText?: string;
    isEditing: boolean;
    onOpenFileDialog: () => void;
    onFilesDrop: (files: FileList, id?: string) => void;
    id: string;
    onAssetChooserClick: () => void;
    appBridge: AppBridgeBlock;
    isAssetViewerEnabled: boolean;
};

export const Image = ({
    image,
    isLoading,
    altText,
    thumbnailStyles,
    isEditing,
    onOpenFileDialog,
    onFilesDrop,
    id,
    onAssetChooserClick,
    appBridge,
    isAssetViewerEnabled,
}: ImageProps) => {
    const { open } = useAssetViewer(appBridge);
    const { containerWidth, setContainerRef } = useImageContainer();

    const getImageComponent = () => {
        const ImageComponent =
            image && containerWidth ? (
                <ResponsiveImage
                    style={thumbnailStyles.imageStyles}
                    testId="thumbnail-image"
                    image={image}
                    className="tw-object-scale-down"
                    containerWidth={containerWidth}
                    alt={altText || image.title || image.fileName || ''}
                />
            ) : null;

        if (isEditing) {
            return image && !isLoading ? (
                ImageComponent
            ) : (
                <UploadPlaceholder
                    width={thumbnailStyles.width}
                    isLoading={isLoading}
                    openFileDialog={onOpenFileDialog}
                    onFilesDrop={(files) => onFilesDrop(files, id)}
                    openAssetChooser={onAssetChooserClick}
                />
            );
        } else if (image) {
            return isAssetViewerEnabled ? (
                <button data-test-id="thumbnail-grid-block-asset-viewer-button" onClick={() => open(image)}>
                    {ImageComponent}
                </button>
            ) : (
                ImageComponent
            );
        }
        return null;
    };

    return (
        <ImageWrapper setContainerRef={setContainerRef} thumbnailStyles={thumbnailStyles} placeholderWrapper={!image}>
            {getImageComponent()}
        </ImageWrapper>
    );
};
