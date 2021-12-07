/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';
import { ProgressHeaderProps } from '../types';

export const ProgressHeader: FC<ProgressHeaderProps> = ({ value }) => (
    <div className="tw-pl-1.5">
        <span className="tw-font-bold tw-text-black-100">{value}</span>
        &nbsp;
        <span className="tw-black-80">Completed</span>
    </div>
);
