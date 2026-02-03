/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Asset } from '@frontify/app-bridge';
import { ResponsiveImage, useImageContainer } from '@frontify/guideline-blocks-shared';

import { type ThumbnailStylesProps } from '../../types';

import { ImageWrapper } from './ImageWrapper';
import { UploadPlaceholder } from './UploadPlaceholder';

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
    isAssetViewerEnabled: boolean;
    openAssetInAssetViewer?: (asset: Asset) => void;
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
    isAssetViewerEnabled,
    openAssetInAssetViewer,
}: ImageProps) => {
    const { containerWidth, setContainerRef } = useImageContainer();

    const getImageComponent = () => {
        const ImageComponent =
            image && containerWidth ? (
                <ResponsiveImage
                    style={thumbnailStyles.imageStyles}
                    testId="thumbnail-image"
                    image={image}
                    containerWidth={containerWidth}
                    alt={altText || ''}
                />
            ) : null;

        if (isEditing) {
            return renderEditModeComponent(ImageComponent);
        }
        return renderViewModeComponent(ImageComponent);
    };

    const renderEditModeComponent = (ImageComponent: JSX.Element | null) => {
        return image && !isLoading ? (
            ImageComponent
        ) : (
            <UploadPlaceholder
                isLoading={isLoading}
                openFileDialog={onOpenFileDialog}
                onFilesDrop={(files) => onFilesDrop(files, id)}
                openAssetChooser={onAssetChooserClick}
            />
        );
    };

    const renderViewModeComponent = (ImageComponent: JSX.Element | null) => {
        if (image) {
            return isAssetViewerEnabled ? (
                <button
                    type="button"
                    className="tw-w-full"
                    data-test-id="thumbnail-grid-block-asset-viewer-button"
                    onClick={() => openAssetInAssetViewer?.(image)}
                >
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
