/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TileGridProps } from '../types';
import { calculateGridTemplateCols } from '../utils';

export const TileGrid = ({ children, gridGap, columns }: TileGridProps) => (
    <div
        className="tw-relative"
        data-test-id="tile-grid"
        style={{
            gridGap,
            display: 'grid',
            gridAutoFlow: 'row',
            gridAutoRows: '1fr',
            gridTemplateColumns: calculateGridTemplateCols(parseInt(gridGap), columns),
        }}
    >
        {children}
    </div>
);
