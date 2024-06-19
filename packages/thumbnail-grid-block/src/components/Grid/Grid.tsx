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
    1: 'tw-grid-cols-1 ',
    2: 'tw-grid-cols-1 @sm:tw-grid-cols-2',
    3: 'tw-grid-cols-1 @sm:tw-grid-cols-2 @md:tw-grid-cols-3',
    4: 'tw-grid-cols-1 @sm:tw-grid-cols-2 @md:tw-grid-cols-4',
    5: 'tw-grid-cols-1 @sm:tw-grid-cols-2 @md:tw-grid-cols-5',
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
