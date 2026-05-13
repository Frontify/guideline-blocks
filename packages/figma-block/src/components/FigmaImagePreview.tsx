/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type AppBridgeBlock } from '@frontify/app-bridge';
import { LoadingCircle } from '@frontify/fondue/components';

import { ImageStage } from '../ImageStage';
import { useAssetStatusPolling } from '../hooks/useAssetStatusPolling';
import { type ImageStageProps } from '../types';
import { extractUrlParameterFromUriQueries } from '../utilities';

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
    ...imageStageProps
}: FigmaImagePreviewProps) => {
    const { isReady } = useAssetStatusPolling(appBridge, assetId, assetStatus);

    return (
        <div data-test-id="figma-image-preview" className="tw-flex tw-flex-col tw-justify-center">
            {isReady ? (
                <ImageStage {...imageStageProps} url={imageStageProps.url} />
            ) : (
                <div className="tw-flex tw-items-center tw-justify-center tw-w-full tw-py-8">
                    <LoadingCircle />
                </div>
            )}

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
};
