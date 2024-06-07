/* (c) Copyright Frontify Ltd., all rights reserved. */

import { merge } from '@frontify/fondue';
import { Settings } from '../../types';
import { ReactNode } from 'react';

type GridProps = {
    children: ReactNode;
    columnCount: Settings['columnCount'];
    gap: string;
};
const mapColumnCountToClassGrid = {
    1: '',
    2: '@sm:tw-grid-cols-2',
    3: '@sm:tw-grid-cols-2 @md:tw-grid-cols-3',
    4: '@sm:tw-grid-cols-2 @md:tw-grid-cols-3 @lg:tw-grid-cols-4',
    5: '@sm:tw-grid-cols-2 @md:tw-grid-cols-3 @lg:tw-grid-cols-5',
};

export const Grid = ({ children, columnCount, gap }: GridProps) => (
    <div
        data-test-id="thumbnail-grid-block"
        className={merge([
            'tw-w-full tw-h-full tw-place-items-start tw-transition-all tw-grid',
            mapColumnCountToClassGrid[columnCount],
        ])}
        style={{
            gap,
        }}
    >
        {children}
    </div>
);
