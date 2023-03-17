/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Padding, paddingStyleMap } from '@frontify/guideline-blocks-shared';
import { LoadingCircle } from '@frontify/fondue';
import { DownloadMessageProps } from '../types';

export const DownloadMessage = ({ blockStyle }: DownloadMessageProps) => {
    return (
        <div
            data-test-id="asset-kit-download-message"
            style={{
                ...blockStyle,
                padding: paddingStyleMap[Padding.Small],
            }}
            className="tw-flex tw-gap-8 tw-items-center tw-mb-8"
        >
            <div className="tw-flew-0">
                <LoadingCircle />
            </div>
            <div className="tw-flex-1">
                <span>
                    This may take a little while. Your package will download automatically when it&apos;s ready.
                </span>
            </div>
        </div>
    );
};
