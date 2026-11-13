/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type AppBridgeBlock } from '@frontify/app-bridge';
import { LoadingCircle } from '@frontify/fondue/components';
import { getOptimisedImageUrl, useImageContainer } from '@frontify/guideline-blocks-shared';

import { isZoomable } from '../helpers/isZoomable';
import { useAssetStatusPolling } from '../hooks/useAssetStatusPolling';
import { ImageStage } from '../ImageStage';
import { type ImageStageProps } from '../types';
import { extractUrlParameterFromUriQueries } from '../utilities/extractUrlParameterFromUriQueries';
import { getPreviewWidth } from '../utilities/getPreviewWidth';

import { FigmaLink } from './FigmaLink';

type FigmaImagePreviewProps = ImageStageProps & {
    assetExternalUrl: string;
    showFigmaLink: boolean;
    assetId: number;
    assetStatus: string;
    appBridge: AppBridgeBlock;
};

export const FigmaImagePreview = ({
    assetExternalUrl,
    showFigmaLink,
    assetId,
    assetStatus,
    appBridge,
    url,
    ...imageStageProps
}: FigmaImagePreviewProps) => {
    const { isReady } = useAssetStatusPolling(appBridge, assetId, assetStatus);
    const { containerWidth, setContainerRef } = useImageContainer();
    // Until the block is measured there's no width to request, and loading the full-size image is what we avoid.
    const previewUrl = containerWidth
        ? getOptimisedImageUrl(url, getPreviewWidth(containerWidth, isZoomable(imageStageProps)))
        : undefined;

    return (
        <div ref={setContainerRef} data-test-id="figma-image-preview" className="tw-flex tw-flex-col tw-justify-center">
            {isReady && previewUrl ? (
                <ImageStage {...imageStageProps} url={previewUrl} />
            ) : (
                <div
                    className="tw-flex tw-items-center tw-justify-center tw-w-full"
                    style={{ height: imageStageProps.height }}
                >
                    <LoadingCircle />
                </div>
            )}

            {showFigmaLink && (
                <FigmaLink
                    assetExternalUrl={extractUrlParameterFromUriQueries(assetExternalUrl)}
                    title={imageStageProps.title}
                />
            )}
        </div>
    );
};
