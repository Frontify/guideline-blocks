/* (c) Copyright Frontify Ltd., all rights reserved. */
import { type Color, type Radius } from '@frontify/guideline-blocks-settings';

import { ImageStage } from '../ImageStage';

type FigmaImagePreviewProps = {
    title: string;
    previewUrl: string;
    assetExternalUrl: string;
    hasLimitedOptions: boolean;
    height: string;
    hasBorder: boolean;
    borderStyle: string;
    borderColor: Color;
    borderWidth: string;
    isMobile: boolean;
    hasBackground: boolean;
    backgroundColor: Color;
    hasRadius: boolean;
    radiusValue: string;
    radiusChoice: Radius;
    allowFullScreen: boolean;
    allowZooming: boolean;
    showFigmaLink: boolean;
};

export const FigmaImagePreview = ({
    title,
    previewUrl,
    assetExternalUrl,
    hasLimitedOptions,
    height,
    hasBorder,
    borderStyle,
    borderColor,
    borderWidth,
    isMobile,
    hasBackground,
    backgroundColor,
    hasRadius,
    radiusValue,
    radiusChoice,
    allowFullScreen,
    allowZooming,
    showFigmaLink,
}: FigmaImagePreviewProps) => (
    <div data-test-id="figma-image-preview" className="tw-flex tw-flex-col tw-justify-center">
        <ImageStage
            title={title}
            url={previewUrl}
            hasLimitedOptions={hasLimitedOptions}
            height={height}
            hasBorder={hasBorder}
            borderStyle={borderStyle}
            borderColor={borderColor}
            borderWidth={borderWidth}
            isMobile={isMobile}
            hasBackground={hasBackground}
            backgroundColor={backgroundColor}
            hasRadius={hasRadius}
            radiusValue={radiusValue}
            radiusChoice={radiusChoice}
            allowFullScreen={allowFullScreen}
            allowZooming={allowZooming}
        />

        {showFigmaLink && (
            <div className="tw-p-2 tw-text-sm">
                <a href={assetExternalUrl} target="_blank" rel="noreferrer" className="tw-text-[#4a90e2]">
                    {title}
                </a>
            </div>
        )}
    </div>
);
