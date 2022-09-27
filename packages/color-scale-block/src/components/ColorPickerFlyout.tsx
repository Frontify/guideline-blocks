/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useState } from 'react';
import { Color, ColorFormat, ColorPicker, Flyout, FlyoutPlacement } from '@frontify/fondue';
import { ColorPickerFlyoutProps, DefaultValues } from '../types';

export const ColorPickerFlyout = ({
    updateColor,
    isColorPickerOpen,
    setIsColorPickerOpen,
    colorPalettes,
    children,
}: ColorPickerFlyoutProps) => {
    const [colorPickerFormat, setColorPickerFormat] = useState<ColorFormat>(ColorFormat.Hex);
    const [selectedColor, setSelectedColor] = useState<Color>(DefaultValues.startingColor);
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
                    contentMinHeight={300}
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
