/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Color, ColorFormat, ColorPicker, Flyout, FlyoutPlacement } from '@frontify/fondue';
import { useState } from 'react';
import { DEFAULT_COLOR_PICKER_FLYOUT_COLOR } from '../helpers';

import { ColorPickerFlyoutProps } from '../types';

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
            <ColorPicker
                data-test-id="color-scale-block-color-picker-content"
                allowCustomColor={false}
                currentColor={selectedColor ?? DEFAULT_COLOR_PICKER_FLYOUT_COLOR}
                currentFormat={colorPickerFormat}
                setFormat={setColorPickerFormat}
                onSelect={setSelectedColor}
                palettes={colorPickerFlyoutPalettes}
            />
        </Flyout>
    );
};
