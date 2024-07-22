/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconPlus32 } from '@frontify/fondue';
import { BlockInjectButton, joinClassNames, radiusStyleMap, toRgbaString } from '@frontify/guideline-blocks-settings';
import { DoDontImageHeight, IMAGE_HEIGHT_VALUES, ImageComponentProps, ImageFitChoice } from '../types';
import { ResponsiveImage, useImageContainer } from '@frontify/guideline-blocks-shared';

const ImageComponent = ({
    isEditing,
    image,
    onAssetChooseClick,
    onUploadClick,
    isUploadLoading,
    customImageHeightValue,
    imageDisplay,
    imageHeightChoice,
    isCustomImageHeight,
    hasStrikethrough,
    draggableProps,
    isDragging,
    backgroundColor,
    hasBackground,
    hasRadius,
    radiusChoice,
    radiusValue,
    dontColor,
    border,
    alt,
}: ImageComponentProps) => {
    const imageHeight = isCustomImageHeight ? customImageHeightValue : IMAGE_HEIGHT_VALUES[imageHeightChoice];
    const { containerWidth, setContainerRef } = useImageContainer();
    const borderRadius = hasRadius ? radiusValue : radiusStyleMap[radiusChoice];

    const background =
        hasBackground &&
        imageDisplay === ImageFitChoice.FIT &&
        (isCustomImageHeight || imageHeightChoice !== DoDontImageHeight.Auto)
            ? toRgbaString(backgroundColor)
            : '';

    const getImage = () =>
        image ? (
            <div
                {...draggableProps}
                ref={setContainerRef}
                style={{ height: imageHeight, borderRadius, border, background }}
                className={joinClassNames([
                    'tw-overflow-hidden tw-relative tw-w-full',
                    isEditing && (isDragging ? 'tw-cursor-grabbing' : 'tw-cursor-grab'),
                ])}
            >
                {containerWidth && (
                    <ResponsiveImage
                        containerWidth={containerWidth}
                        image={image}
                        className={joinClassNames([
                            'tw-h-full',
                            (imageHeightChoice !== DoDontImageHeight.Auto || isCustomImageHeight) &&
                                imageDisplay === ImageFitChoice.FILL &&
                                'tw-object-cover',
                            (imageHeightChoice !== DoDontImageHeight.Auto || isCustomImageHeight) &&
                                imageDisplay === ImageFitChoice.FIT &&
                                'tw-object-contain',
                        ])}
                        alt={alt || ''}
                        testId="do-dont-image"
                    />
                )}
                {hasStrikethrough && (
                    <div
                        style={{ backgroundColor: toRgbaString(dontColor) }}
                        className="tw-w-[3px] tw-h-[calc(100%+20px)] tw-absolute -tw-top-[10px] tw-left-1/2 -tw-skew-x-[20deg]"
                    />
                )}
            </div>
        ) : null;

    return (
        <div className="tw-mb-3">
            {isEditing && (!image || isUploadLoading) ? (
                <div style={{ height: imageHeight === 'auto' ? '180px' : imageHeight }}>
                    <BlockInjectButton
                        onAssetChooseClick={onAssetChooseClick}
                        onUploadClick={onUploadClick}
                        fillParentContainer
                        icon={<IconPlus32 />}
                        label=""
                        isLoading={isUploadLoading}
                    />
                </div>
            ) : (
                getImage()
            )}
        </div>
    );
};

export default ImageComponent;
