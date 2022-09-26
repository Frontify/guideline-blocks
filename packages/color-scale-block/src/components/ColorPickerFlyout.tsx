/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useState } from 'react';
import { ColorFormat, ColorPicker, Flyout, FlyoutPlacement } from '@frontify/fondue';
import { ColorPickerFlyoutProps } from '../types';

export const ColorPickerFlyout = ({
    updateColor,
    currentColor,
    isColorPickerOpen,
    setIsColorPickerOpen,
    colorPalettes,
    children,
}: ColorPickerFlyoutProps) => {
    const [colorPickerFormat, setColorPickerFormat] = useState(ColorFormat.Hex);
    const [selectedColor, setSelectedColor] = useState(currentColor);
    return (
        <>
            <div>
                <Flyout
                    placement={FlyoutPlacement.Top}
                    isOpen={isColorPickerOpen}
                    onCancel={() => setIsColorPickerOpen(false)}
                    onConfirm={() => updateColor(selectedColor)}
                    onOpenChange={() => true}
                    title="Pick color"
                    trigger={children}
                >
                    <ColorPicker
                        allowCustomColor={false}
                        currentColor={currentColor}
                        currentFormat={colorPickerFormat}
                        setFormat={setColorPickerFormat}
                        onSelect={setSelectedColor}
                        palettes={colorPalettes}
                    />
                </Flyout>
            </div>
        </>
    );
};
