/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useState } from 'react';
import { Color, ColorFormat, ColorPicker, Flyout, FlyoutPlacement } from '@frontify/fondue';
import { ColorPickerFlyoutProps } from '../types';

export const ColorPickerFlyout = ({
    newIndex,
    updateColor,
    editedColor,
    setEditedColor,
    isColorPickerOpen,
    setIsColorPickerOpen,
    colors,
}: ColorPickerFlyoutProps) => {
    const [colorPickerFormat, setColorPickerFormat] = useState(ColorFormat.Hex);
    const onCancel = () => {
        setIsColorPickerOpen(false);
        setEditedColor(null);
    };

    const onSelectColor = (color: Color) => {
        if (!editedColor) {
            updateColor({
                id: color.id,
                color,
                index: newIndex,
            });
            setEditedColor({
                id: color.id,
                color,
                index: newIndex,
            });
        } else {
            updateColor({
                id: color.id,
                color,
            });
            setEditedColor({
                id: editedColor.id,
                color,
                index: editedColor.index,
                width: editedColor.width,
            });
        }
    };

    const onSetFormat = (format: ColorFormat) => {
        setColorPickerFormat(format);
    };

    return (
        <>
            <div>
                <Flyout
                    placement={FlyoutPlacement.Top}
                    isOpen={isColorPickerOpen}
                    onCancel={onCancel}
                    onOpenChange={() => true}
                    title="Pick color"
                    trigger={<></>}
                >
                    <ColorPicker
                        allowCustomColor={false}
                        currentColor={
                            editedColor
                                ? editedColor.color
                                : {
                                      blue: 255,
                                      green: 102,
                                      red: 85,
                                  }
                        }
                        currentFormat={colorPickerFormat}
                        setFormat={onSetFormat}
                        onSelect={onSelectColor}
                        palettes={colors}
                    />
                </Flyout>
            </div>
        </>
    );
};
