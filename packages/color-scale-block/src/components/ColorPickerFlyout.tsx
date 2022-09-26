/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useState } from 'react';
import { ColorFormat, ColorPicker, Flyout, FlyoutPlacement } from '@frontify/fondue';
import { ColorPickerFlyoutProps, DefaultValues } from '../types';

export const ColorPickerFlyout = ({
    updateColor,
    isColorPickerOpen,
    setIsColorPickerOpen,
    colorPalettes,
    children,
}: ColorPickerFlyoutProps) => {
    const [colorPickerFormat, setColorPickerFormat] = useState(ColorFormat.Hex);
    const [selectedColor, setSelectedColor] = useState(DefaultValues.startingColor);
    const close = () => {
        setSelectedColor(DefaultValues.startingColor);
        setIsColorPickerOpen(false);
    };
    return (
        <>
            <div>
                <Flyout
                    placement={FlyoutPlacement.Top}
                    isOpen={isColorPickerOpen}
                    onCancel={close}
                    onConfirm={() => {
                        updateColor(selectedColor);
                        close();
                    }}
                    onOpenChange={() => true}
                    title="Pick color"
                    trigger={children}
                >
                    <ColorPicker
                        allowCustomColor={false}
                        currentColor={selectedColor}
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
