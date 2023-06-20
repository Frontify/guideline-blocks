/* (c) Copyright Frontify Ltd., all rights reserved. */

import { LoadingCircle } from '@frontify/fondue';
import { Asset } from '@frontify/app-bridge';
import { UploadPlaceholder } from './UploadPlaceholder';
import { ImageWrapper } from './ImageWrapper';
import { ThumbnailStylesProps } from '../../types';

type ImageProps = {
    thumbnailStyles: ThumbnailStylesProps;
    image: Asset | undefined;
    isLoading: boolean;
    defaultAltText: string;
    isEditing: boolean;
    onOpenFileDialog: () => void;
    onFilesDrop: (files: FileList, id?: string) => void;
    id: string;
    onAssetChooserClick: () => void;
};

export const Image = ({
    image,
    isLoading,
    defaultAltText,
    thumbnailStyles,
    isEditing,
    onOpenFileDialog,
    onFilesDrop,
    id,
    onAssetChooserClick,
}: ImageProps) => (
    <ImageWrapper thumbnailStyles={thumbnailStyles} placeholderWrapper={!image}>
        {image ? (
            <>
                {isLoading ? (
                    <div className="tw-w-full tw-aspect-square tw-grid tw-justify-center tw-items-center tw-bg-base-alt tw-border tw-border-blank-state-line tw-rounded tw-p-4 tw-text-text-weak tw-cursor-none tw-pointer-events-none">
                        <LoadingCircle />
                    </div>
                ) : (
                    <img
                        data-test-id="thumbnail-image"
                        className="tw-object-scale-down"
                        style={thumbnailStyles.imageStyles}
                        loading="lazy"
                        src={image.genericUrl.replace('{width}', `${800 * (window?.devicePixelRatio ?? 1)}`)}
                        alt={defaultAltText}
                    />
                )}
            </>
        ) : (
            <>
                {isEditing && (
                    <UploadPlaceholder
                        width={thumbnailStyles.width}
                        isLoading={isLoading}
                        openFileDialog={onOpenFileDialog}
                        onFilesDrop={(files) => onFilesDrop(files, id)}
                        openAssetChooser={onAssetChooserClick}
                    />
                )}
            </>
        )}
    </ImageWrapper>
);
