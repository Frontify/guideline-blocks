/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconPlus32 } from '@frontify/fondue';
import { BlockInjectButton, joinClassNames, radiusStyleMap, toRgbaString } from '@frontify/guideline-blocks-settings';
import { DoDontImageHeight, IMAGE_HEIGHT_VALUES, ImageComponentProps, ImageFitChoice } from '../types';

const ImageComponent = ({
    isEditing,
    src,
    columns,
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
}: ImageComponentProps) => {
    const imageHeight = isCustomImageHeight ? customImageHeightValue : IMAGE_HEIGHT_VALUES[imageHeightChoice];

    const borderRadius = hasRadius ? radiusValue : radiusStyleMap[radiusChoice];

    const background =
        hasBackground &&
        imageDisplay === ImageFitChoice.FIT &&
        (isCustomImageHeight || imageHeightChoice !== DoDontImageHeight.Auto)
            ? toRgbaString(backgroundColor)
            : '';

    const getImage = () => {
        const width = (isEditing ? 800 : 800 / columns) * (window?.devicePixelRatio ?? 1);

        return src ? (
            <div className="tw-relative tw-w-full">
                <div
                    style={{ height: imageHeight, borderRadius, border, background }}
                    className="tw-w-full tw-overflow-hidden"
                >
                    <img
                        {...draggableProps}
                        className={joinClassNames([
                            'tw-w-full tw-h-full',
                            isEditing && (isDragging ? 'tw-cursor-grabbing' : 'tw-cursor-grab'),
                            (imageHeightChoice !== DoDontImageHeight.Auto || isCustomImageHeight) &&
                                imageDisplay === ImageFitChoice.FILL &&
                                'tw-object-cover',
                            (imageHeightChoice !== DoDontImageHeight.Auto || isCustomImageHeight) &&
                                imageDisplay === ImageFitChoice.FIT &&
                                'tw-object-contain',
                        ])}
                        src={src.replace('{width}', width.toString())}
                        alt=""
                        loading="lazy"
                    />
                    {hasStrikethrough && (
                        <div
                            style={{ backgroundColor: toRgbaString(dontColor) }}
                            className="tw-w-[3px] tw-h-[calc(100%+20px)] tw-absolute -tw-top-[10px] tw-left-1/2 -tw-skew-x-[20deg]"
                        />
                    )}
                </div>
            </div>
        ) : null;
    };

    return (
        <div className="tw-mb-3">
            {(!src && isEditing) || isUploadLoading ? (
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
