/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Padding, paddingStyleMap } from '@frontify/guideline-blocks-shared';
import { LoadingCircle } from '@frontify/fondue';
import { DownloadMessageProps } from '../types';
import { BulkDownloadState } from '@frontify/app-bridge';

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
            {[BulkDownloadState.Started, BulkDownloadState.Pending].includes(status) && (
                <div className="tw-flew-0">
                    <LoadingCircle />
                </div>
            )}
            <div className="tw-flex-1">
                {[BulkDownloadState.Started, BulkDownloadState.Pending].includes(status) && (
                    <span data-test-id="asset-kit-pending-message" role="status">
                        This may take a little while. Your package will download automatically when it&apos;s ready.
                    </span>
                )}

                {status === BulkDownloadState.Error && (
                    <span data-test-id="asset-kit-error-message" role="status" className="tw-text-red-60">
                        Sorry, we&apos;re experiencing some technical difficulties. Please try again in a few minutes.
                    </span>
                )}
            </div>
        </div>
    );
};
