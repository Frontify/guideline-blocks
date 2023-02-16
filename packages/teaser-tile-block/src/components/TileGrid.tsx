/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TileGridProps } from '../types';
import { calculateGridTemplateCols } from '../utils';

export const TileGrid = ({ children, gridGap, columns }: TileGridProps) => (
    <div
        className="tw-relative"
        data-test-id="teaser-tile-block"
        style={{
            gridGap,
            display: 'grid',
            gridAutoFlow: 'row',
            gridAutoRows: '1fr',
            gridTemplateColumns: calculateGridTemplateCols(+gridGap, +columns),
        }}
    >
        {children}
    </div>
);
