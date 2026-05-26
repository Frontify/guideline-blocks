/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type AppBridgeBlock } from '@frontify/app-bridge';
import { LoadingCircle } from '@frontify/fondue/components';

import { ImageStage } from '../ImageStage';
import { useAssetStatusPolling } from '../hooks/useAssetStatusPolling';
import { type ImageStageProps } from '../types';
import { extractUrlParameterFromUriQueries } from '../utilities/extractUrlParameterFromUriQueries';

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
    ...imageStageProps
}: FigmaImagePreviewProps) => {
    const { isReady } = useAssetStatusPolling(appBridge, assetId, assetStatus);

    return (
        <div data-test-id="figma-image-preview" className="tw-flex tw-flex-col tw-justify-center">
            {isReady ? (
                <ImageStage {...imageStageProps} />
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
