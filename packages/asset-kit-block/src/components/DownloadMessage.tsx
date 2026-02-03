/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetBulkDownloadState } from '@frontify/app-bridge';
import { LoadingCircle } from '@frontify/fondue/components';
import { Padding, paddingStyleMap } from '@frontify/guideline-blocks-settings';

import { type DownloadMessageProps } from '../types';

export const DownloadMessage = ({ blockStyle, status }: DownloadMessageProps) => {
    return (
        <div
            data-test-id="asset-kit-download-message"
            style={{
                ...blockStyle,
                padding: paddingStyleMap[Padding.Small],
            }}
            className="tw-flex tw-gap-8 tw-items-center tw-mb-8"
        >
            {[AssetBulkDownloadState.Started, AssetBulkDownloadState.Pending].includes(status) && (
                <div className="tw-flew-0">
                    <LoadingCircle />
                </div>
            )}
            <div className="tw-flex-1">
                {[AssetBulkDownloadState.Started, AssetBulkDownloadState.Pending].includes(status) && (
                    <span data-test-id="asset-kit-pending-message" role="status">
                        This may take a little while. Your package will download automatically when it&apos;s ready.
                    </span>
                )}

                {status === AssetBulkDownloadState.Error && (
                    <span data-test-id="asset-kit-error-message" role="status" className="tw-text-red-60">
                        Sorry, we&apos;re experiencing some technical difficulties. Please try again in a few minutes.
                    </span>
                )}
            </div>
        </div>
    );
};
