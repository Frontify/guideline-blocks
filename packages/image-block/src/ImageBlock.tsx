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

export const ImageBlock = ({ appBridge }: BlockProps) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const { blockAssets } = useBlockAssets(appBridge);
    const imageUrl = blockAssets?.[IMAGE_SETTING_ID]?.[0]?.genericUrl;
    const isEditing = useEditorState(appBridge);

    return (
        <div
            data-test-id="image-block"
            className={joinClassNames(['tw-flex tw-gap-3', mapCaptionPositionClasses[blockSettings.positioning]])}
        >
            {!imageUrl ? (
                isEditing && <UploadPlaceholder appBridge={appBridge} />
            ) : (
                <Image url={imageUrl} blockSettings={blockSettings} />
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

export const Image = ({ url, blockSettings }: { url: string; blockSettings: Settings }) => {
    const borderRadius = blockSettings.hasRadius_cornerRadius
        ? blockSettings.radiusValue_cornerRadius
        : radiusValues[blockSettings.radiusChoice_cornerRadius];
    const border = blockSettings.hasBorder
        ? `${blockSettings.borderWidth} ${blockSettings.borderStyle} ${toRgbaString(blockSettings.borderColor)}`
        : undefined;

    //TODO according to design adapt ration!
    const width =
        blockSettings.positioning === CaptionPosition.Above || blockSettings.positioning === CaptionPosition.Below
            ? '100%'
            : rationValues[blockSettings.ratio];

    console.log('width', width, blockSettings.ratio);

    return (
        <div className={joinClassNames(['tw-flex tw-w-full', mapAlignmentClasses[blockSettings.alignment]])}>
            <img
                src={url}
                style={{
                    // aspectRatio: '1 / 2',
                    border,
                    padding: blockSettings.hasCustomPadding
                        ? blockSettings.paddingCustom
                        : paddingValues[blockSettings.paddingChoice],
                    borderRadius: borderRadius ?? radiusValues[CornerRadius.None],
                    backgroundColor: blockSettings.hasBackground
                        ? toRgbaString(blockSettings.backgroundColor)
                        : undefined,
                }}
                className={joinClassNames([])}
            />
        </div>
    );
};
