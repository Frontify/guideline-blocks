/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ImageStage } from '../ImageStage';
import { type ImageStageProps } from '../types';

import { FigmaLink } from './FigmaLink';

type FigmaImagePreviewProps = ImageStageProps & {
    assetExternalUrl: string;
    showFigmaLink: boolean;
};

export const FigmaImagePreview = ({ assetExternalUrl, showFigmaLink, ...imageStageProps }: FigmaImagePreviewProps) => (
    <div data-test-id="figma-image-preview" className="tw-flex tw-flex-col tw-justify-center">
        <ImageStage {...imageStageProps} />
        {showFigmaLink && <FigmaLink assetExternalUrl={assetExternalUrl} title={imageStageProps.title} />}
    </div>
);
