/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Padding, paddingStyleMap, radiusStyleMap } from '@frontify/guideline-blocks-shared';
import { LoadingCircle } from '@frontify/fondue';
import React, { FC } from 'react';

type DownloadMessageProps = {
    blockStyle: React.CSSProperties;
};

export const DownloadMessage: FC<DownloadMessageProps> = ({ blockStyle }) => {
    return (
        <div
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
