/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useState } from 'react';
import { Color, ColorFormat, ColorPicker, Flyout, FlyoutPlacement } from '@frontify/fondue';

import { ColorPickerFlyoutProps } from '../types';
import { DEFAULT_COLOR_PICKER_FLYOUT_COLOR } from '../helpers';

export const ColorPickerFlyout = ({
    onAdd,
    isOpen,
    onClose,
    colorPickerFlyoutPalettes,
    children,
}: ColorPickerFlyoutProps) => {
    const [colorPickerFormat, setColorPickerFormat] = useState(ColorFormat.Hex);
    const [selectedColor, setSelectedColor] = useState<Nullable<Color>>(null);

    const handleCleanup = () => {
        onClose();
        setSelectedColor(null);
    };

    const handleConfirm = () => {
        if (!selectedColor) {
            return;
        }

        onAdd({ ...selectedColor });

        handleCleanup();
    };

    return (
        <Flyout
            placement={FlyoutPlacement.Top}
            isOpen={isOpen}
            contentMinHeight={300}
            onCancel={handleCleanup}
            onConfirm={handleConfirm}
            onOpenChange={() => true}
            title="Pick color"
            trigger={children}
        >
            <div data-test-id="color-scale-block-color-picker-content">
                <ColorPicker
                    allowCustomColor={false}
                    currentColor={selectedColor ? selectedColor : DEFAULT_COLOR_PICKER_FLYOUT_COLOR}
                    currentFormat={colorPickerFormat}
                    setFormat={setColorPickerFormat}
                    onSelect={setSelectedColor}
                    palettes={colorPickerFlyoutPalettes}
                />
            </div>
        </Flyout>
    );
};
