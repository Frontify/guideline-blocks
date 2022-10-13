/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Text } from '@frontify/fondue';

import { EmptyView } from './EmptyView';
import { Color } from './Color';
import type { PaletteProps } from './types';

export const Palette = ({ palette, isEditing }: PaletteProps) => {
    const { name, colors = [] } = palette;

    if (colors.length === 0) {
        return <EmptyView paletteName={`${name || 'Untitled Palette'} (no colors added)`} />;
    }

    return (
        <div data-test-id="palette" className="tw-space-y-2 tw-mb-3 last:tw-mb-0 [&>span]:tw-block">
            <Text color="x-weak">{name || 'Untitled Palette'}</Text>

            <div className="tw-flex tw-flex-wrap">
                {colors.map((color) => (
                    <Color key={color.id} isEditing={isEditing} color={color} colorsLength={colors.length} />
                ))}
            </div>
        </div>
    );
};
