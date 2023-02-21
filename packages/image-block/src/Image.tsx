/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    CaptionPosition,
    CornerRadius,
    Settings,
    mapAlignmentClasses,
    paddingValues,
    radiusValues,
    rationValues,
} from './types';
import { joinClassNames, toRgbaString } from '@frontify/guideline-blocks-shared';
import { IconArrowCircleDown16 } from '@frontify/fondue';

export const Image = ({
    url,
    blockSettings,
    isEditing,
    imageName,
}: {
    url: string;
    imageName: string;
    blockSettings: Settings;
    isEditing: boolean;
}) => {
    const borderRadius = blockSettings.hasRadius_cornerRadius
        ? blockSettings.radiusValue_cornerRadius
        : radiusValues[blockSettings.radiusChoice_cornerRadius];
    const border = blockSettings.hasBorder
        ? `${blockSettings.borderWidth} ${blockSettings.borderStyle} ${toRgbaString(blockSettings.borderColor)}`
        : undefined;

    const link = blockSettings.hasLink ? blockSettings.linkObject : undefined;

    const downloadImage = () => {
        fetch(url).then((response) => {
            response.blob().then((blob) => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = imageName;
                a.click();
            });
        });
    };

    const ImageComponent = () => (
        <div
            className={joinClassNames([
                'tw-relative tw-flex tw-h-auto',
                mapAlignmentClasses[blockSettings.alignment],
                blockSettings.positioning === CaptionPosition.Above ||
                blockSettings.positioning === CaptionPosition.Below
                    ? 'tw-w-full'
                    : rationValues[blockSettings.ratio],
            ])}
            style={{
                border,
                padding: blockSettings.hasCustomPadding
                    ? blockSettings.paddingCustom
                    : paddingValues[blockSettings.paddingChoice],
                borderRadius: borderRadius ?? radiusValues[CornerRadius.None],
                backgroundColor: blockSettings.hasBackground ? toRgbaString(blockSettings.backgroundColor) : undefined,
            }}
        >
            <img src={url} alt={imageName} className="tw-w-full" />
            {isEditing && (
                <button
                    aria-label="Download Image"
                    onClick={downloadImage}
                    className="tw-absolute tw-top-2 tw-right-2 tw-flex tw-items-center tw-justify-center tw-h-7 tw-w-7 tw-bg-box-neutral-strong-inverse tw-rounded-full tw-border tw-border-line"
                >
                    <IconArrowCircleDown16 />
                </button>
            )}
        </div>
    );

    return (
        <>
            {link && !isEditing ? (
                <a
                    className="tw-w-full"
                    href={link.link.link}
                    target={link.openInNewTab ? '_blank' : undefined}
                    rel="noreferrer"
                >
                    <ImageComponent />
                </a>
            ) : (
                <ImageComponent />
            )}
        </>
    );
};
