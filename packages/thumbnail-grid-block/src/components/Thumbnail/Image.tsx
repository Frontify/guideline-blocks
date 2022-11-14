/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Asset } from '@frontify/app-bridge';
import { UploadPlaceholder } from './UploadPlaceholder';
import { ImageWrapper } from './ImageWrapper';
import { ThumbnailStylesProps } from '../../types';

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
}: ImageProps) => (
    <ImageWrapper thumbnailStyles={thumbnailStyles} placeholderWrapper={!image}>
        {image && !isLoading ? (
            <img
                data-test-id="thumbnail-image"
                className="tw-object-scale-down"
                style={thumbnailStyles.imageStyles}
                loading="lazy"
                src={image.genericUrl.replace('{width}', `${800 * (window?.devicePixelRatio ?? 1)}`)}
                alt={altText || image.title || image.fileName || undefined}
            />
        ) : // eslint-disable-next-line unicorn/no-nested-ternary
        isEditing ? (
            <UploadPlaceholder
                width={thumbnailStyles.width}
                isLoading={isLoading}
                openFileDialog={onOpenFileDialog}
                onFilesDrop={(files) => onFilesDrop(files, id)}
                openAssetChooser={onAssetChooserClick}
            />
        ) : null}
    </ImageWrapper>
);
