/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockAssets, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import '@frontify/fondue-tokens/styles';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import 'tailwindcss/tailwind.css';
import {
    CaptionPosition,
    CornerRadius,
    Settings,
    mapAlignmentClasses,
    mapCaptionPositionClasses,
    paddingValues,
    radiusValues,
    rationValues,
} from './types';
import { UploadPlaceholder } from './UploadPlaceholder';
import { ImageCaption } from './ImageCaption';
import { IMAGE_SETTING_ID } from './settings';
import { joinClassNames, toRgbaString } from '@frontify/guideline-blocks-shared';
import { IconArrowCircleDown16 } from '@frontify/fondue';

export const ImageBlock = ({ appBridge }: BlockProps) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const { blockAssets } = useBlockAssets(appBridge);
    const image = blockAssets?.[IMAGE_SETTING_ID]?.[0];
    const isEditing = useEditorState(appBridge);

    return (
        <div
            data-test-id="image-block"
            className={joinClassNames([
                'tw-flex tw-h-auto tw-gap-3',
                mapCaptionPositionClasses[blockSettings.positioning],
            ])}
        >
            {!image ? (
                isEditing && <UploadPlaceholder appBridge={appBridge} />
            ) : (
                <Image
                    url={image.genericUrl}
                    blockSettings={blockSettings}
                    isEditing={isEditing}
                    imageName={image.fileName}
                />
            )}
            <ImageCaption
                name={blockSettings.name}
                description={blockSettings.description}
                onNameChange={(value) => setBlockSettings({ ...blockSettings, name: value })}
                onDescriptionChange={(value) => setBlockSettings({ ...blockSettings, description: value })}
                isEditing={isEditing}
            />
        </div>
    );
};

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

    const width =
        blockSettings.positioning === CaptionPosition.Above || blockSettings.positioning === CaptionPosition.Below
            ? '100%'
            : rationValues[blockSettings.ratio];
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
                'tw-relative tw-flex tw-h-auto tw-w-full',
                mapAlignmentClasses[blockSettings.alignment],
            ])}
            style={{
                width,
                border,
                padding: blockSettings.hasCustomPadding
                    ? blockSettings.paddingCustom
                    : paddingValues[blockSettings.paddingChoice],
                borderRadius: borderRadius ?? radiusValues[CornerRadius.None],
                backgroundColor: blockSettings.hasBackground ? toRgbaString(blockSettings.backgroundColor) : undefined,
            }}
        >
            <img src={url} className="tw-w-full" />
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
