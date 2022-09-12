/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC, useState } from 'react';

import { ColorFormat, ColorPicker, Flyout } from '@frontify/fondue';

import { ColorsBlockColorPickerProps } from '../types';

type Color = {
    red: number;
    green: number;
    blue: number;
    alpha?: number | undefined;
    name?: string | undefined;
};

export const ColorsBlockColorPicker: FC<ColorsBlockColorPickerProps> = ({ currentColor, onConfirm, children }) => {
    // console.log('🚀 ~ currentColor', currentColor);
    const [open, setOpen] = useState(false);
    const [currentFormat, setCurrentFormat] = useState(ColorFormat.Hex);
    const [selectedColor, setSelectedColor] = useState<Color>(currentColor ?? { red: 255, green: 255, blue: 255 });

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
                    currentColor={selectedColor as any}
                    currentFormat={currentFormat}
                    setFormat={setCurrentFormat}
                    showPreview={false}
                    onSelect={(color) => {
                        // console.log('🚀 ~ color', color);
                        setSelectedColor(color as any);
                    }}
                />
            </Flyout>
        </div>
    );
};
