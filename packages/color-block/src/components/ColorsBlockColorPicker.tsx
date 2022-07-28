/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC, useState } from 'react';

import { ColorFormat, ColorPicker, ColorPreview, Flyout } from '@frontify/fondue';

import { ColorsBlockColorPickerProps } from '../types';

export const ColorsBlockColorPicker: FC<ColorsBlockColorPickerProps> = ({ currentColor, children }) => {
    const [open, setOpen] = useState(false);
    const [currentFormat, setCurrentFormat] = useState(ColorFormat.Hex);
    const [selectedColor, setSelectedColor] = useState(currentColor);

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
                onConfirm={handleClick}
                isOpen={open}
                onCancel={() => handleOpenChange(false)}
                fixedHeader={<ColorPreview color={selectedColor || { r: 255, g: 255, b: 255 }} />}
                onOpenChange={handleOpenChange}
                trigger={children}
            >
                <ColorPicker
                    currentFormat={currentFormat}
                    setFormat={setCurrentFormat}
                    showPreview={false}
                    currentColor={selectedColor || { r: 255, g: 255, b: 255 }}
                    onSelect={(color) => setSelectedColor(color)}
                />
            </Flyout>
        </div>
    );
};
