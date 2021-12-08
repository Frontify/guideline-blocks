/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';
import { ProgressHeaderProps } from '../types';

export const ProgressHeader: FC<ProgressHeaderProps> = ({ value }) => (
    <div className="tw-pl-1.5" data-test-id="progress-header">
        <span className="tw-font-bold tw-text-black-100" data-test-id="progress-header-value">
            {value}
        </span>
        &nbsp;
        <span className="tw-black-80">Completed</span>
    </div>
);
