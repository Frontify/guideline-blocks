/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC, useState } from 'react';

import { Color, ColorFormat, ColorPicker, Flyout } from '@frontify/fondue';

import { ColorsBlockColorPickerProps } from '../types';

export const ColorsBlockColorPicker: FC<ColorsBlockColorPickerProps> = ({ currentColor, onConfirm, children }) => {
    const [open, setOpen] = useState(false);
    const [currentFormat, setCurrentFormat] = useState(ColorFormat.Hex);
    const [selectedColor, setSelectedColor] = useState<Color>(
        currentColor?.alpha
            ? {
                  ...currentColor,
                  alpha: currentColor.alpha && parseFloat((currentColor.alpha / 255).toFixed(2)),
              }
            : { red: 255, green: 255, blue: 255, alpha: 1 }
    );

    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);
    };

    const handleClick = () => {
        setOpen(false);
    };

    return (
        <div>
            <Flyout
                hug={false}
                onConfirm={() => {
                    handleClick();
                    onConfirm(selectedColor);
                }}
                isOpen={open}
                onCancel={() => handleOpenChange(false)}
                onOpenChange={handleOpenChange}
                trigger={children}
            >
                <ColorPicker
                    currentColor={selectedColor}
                    currentFormat={currentFormat}
                    setFormat={setCurrentFormat}
                    showPreview={false}
                    onSelect={setSelectedColor}
                />
            </Flyout>
        </div>
    );
};
