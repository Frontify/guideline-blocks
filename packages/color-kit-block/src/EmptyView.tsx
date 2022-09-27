/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Text } from '@frontify/fondue';

export const EmptyView = () => {
    const EMPTY_BLOCK_COLORS = ['#D5D6D6', '#DFDFDF', '#E8E9E9', '#F1F1F1', '#FAFAFA', '#FFFFFF'];

    return (
        <div className="tw-space-y-2">
            <Text color="weak">Select color palettes for them to appear here</Text>

            <div className="tw-flex tw-shadow-inner-line">
                {EMPTY_BLOCK_COLORS.map((color) => (
                    <div
                        key={color}
                        className="tw-w-6 tw-h-6 tw-shadow-inner-line-y first:tw-shadow-inner-line-first last:tw-shadow-inner-line-last"
                        style={{ backgroundColor: color }}
                    ></div>
                ))}
            </div>
        </div>
    );
};
