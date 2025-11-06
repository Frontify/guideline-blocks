/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ColorPicker, SegmentedControl } from '@frontify/fondue/components';
import { useState } from 'react';

import { BrandColorPicker } from './BrandColorPicker/BrandColorPicker';
import { type Palette, type PickerType, type RgbaColorWithName, type ShowPickerUnion } from './types';

type ColorPickerProps = {
    palettes: Palette[];
    currentColor?: RgbaColorWithName;
    onColorChange: (color: RgbaColorWithName) => void;
    showPicker?: ShowPickerUnion;
    defaultColorFormat?: 'HEX' | 'RGBA';
};

export const ColorInputContent = ({
    palettes,
    currentColor,
    onColorChange,
    showPicker = 'both',
    defaultColorFormat = 'HEX',
}: ColorPickerProps) => {
    const showBoth = showPicker === 'both';
    const showBrand = showPicker === 'brand';
    const showCustom = showPicker === 'custom';
    const [activePicker, setActivePicker] = useState<PickerType>(showBoth ? 'brand' : showPicker);

    return (
        <div className="tw-py-2 tw-flex tw-flex-col tw-gap-2">
            {showBoth && (
                <div className="tw-w-full [&>*]:tw-w-full tw-h-fit tw-block">
                    <SegmentedControl.Root
                        defaultValue="brand"
                        hugWidth={false}
                        value={activePicker}
                        onValueChange={(value) => setActivePicker(value as PickerType)}
                    >
                        <SegmentedControl.Item value="brand" aria-label="Brand">
                            Brand
                        </SegmentedControl.Item>

                        <SegmentedControl.Item value="custom" aria-label="Custom">
                            Custom
                        </SegmentedControl.Item>
                    </SegmentedControl.Root>
                </div>
            )}
            {(showBoth || showBrand) && activePicker === 'brand' && (
                <BrandColorPicker palettes={palettes} currentColor={currentColor} onColorChange={onColorChange} />
            )}
            {(showBoth || showCustom) && activePicker === 'custom' && (
                <ColorPicker.Root
                    defaultFormat={defaultColorFormat}
                    currentColor={currentColor}
                    onColorChange={(color) => {
                        onColorChange(color);
                    }}
                >
                    <ColorPicker.Values />
                    <ColorPicker.Gradient />
                </ColorPicker.Root>
            )}
        </div>
    );
};
