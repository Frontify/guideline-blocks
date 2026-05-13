/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ImageStage } from '../ImageStage';
import { type ImageStageProps } from '../types';
import { extractUrlParameterFromUriQueries } from '../utilities';

type FigmaImagePreviewProps = ImageStageProps & {
    assetExternalUrl: string;
    showFigmaLink: boolean;
};

export const FigmaImagePreview = ({ assetExternalUrl, showFigmaLink, ...imageStageProps }: FigmaImagePreviewProps) => (
    <div data-test-id="figma-image-preview" className="tw-flex tw-flex-col tw-justify-center">
        <ImageStage {...imageStageProps} />

        {showFigmaLink && (
            <div className="tw-p-2 tw-text-sm">
                <a
                    href={extractUrlParameterFromUriQueries(assetExternalUrl)}
                    target="_blank"
                    rel="noreferrer"
                    className="tw-text-[#4a90e2]"
                >
                    {imageStageProps.title}
                </a>
            </div>
        )}
    </div>
);
