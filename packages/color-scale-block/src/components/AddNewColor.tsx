/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC, useState } from 'react';
import { Color, ColorFormat, ColorFormat, ColorPicker, Flyout, FlyoutPlacement } from '@frontify/fondue';
import { AddNewColorModalProps } from '../types';

export const AddNewColor: FC<AddNewColorModalProps> = ({
    newIndex,
    colorPickerRef,
    updateColor,
    editedColor,
    setEditedColor,
    isColorPickerOpen,
    setIsColorPickerOpen,
    setFormat,
    colors,
}) => {
    const [colorPickerFormat, setColorPickerFormat] = useState(ColorFormat.Hex);

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
            <div ref={colorPickerRef}>
                <Flyout
                    placement={FlyoutPlacement.Top}
                    isOpen={isColorPickerOpen}
                    onCancel={() => {
                        setIsColorPickerOpen(false);
                        setEditedColor(null);
                    }}
                    onOpenChange={() => {}}
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
