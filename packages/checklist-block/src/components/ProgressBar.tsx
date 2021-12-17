/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';
import { ProgressBarProps } from '../types';

export const ProgressBar: FC<ProgressBarProps> = ({ trackColor, fillColor, percentage }) => (
    <div
        className="tw-relative tw-w-[200px] tw-h-3 tw-rounded-sm tw-overflow-hidden tw-ml-2"
        style={{ backgroundColor: trackColor }}
        data-test-id="progress-bar"
    >
        <div
            className="tw-absolute tw-duration-200 tw-top-0 tw-left-0 tw-bottom-0"
            style={{ backgroundColor: fillColor, width: `${percentage}%` }}
            data-test-id="progress-bar-fill"
        ></div>
    </div>
);
