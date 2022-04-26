/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';
import { ProgressHeaderProps } from '../types';

export const ProgressHeader: FC<ProgressHeaderProps> = ({ value }) => (
    <div className="tw-ml-2" data-test-id="progress-header">
        <span className="tw-font-bold tw-text-text" data-test-id="progress-header-value">
            {value}
        </span>
        &nbsp;
        <span className="tw-black-80">Completed</span>
    </div>
);
