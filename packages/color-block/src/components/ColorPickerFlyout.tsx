/* (c) Copyright Frontify Ltd., all rights reserved. */

import { RefObject, useState } from 'react';
import { Color, ColorFormat, ColorPicker, Flyout } from '@frontify/fondue';

import { ColorPickerFlyoutProps } from '../types';

export const ColorPickerFlyout = ({ currentColor, onConfirm, children }: ColorPickerFlyoutProps) => {
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
        <div data-test-id="color-picker-flyout" className="[&>div]:tw-h-full">
            <Flyout
                hug={false}
                onConfirm={() => {
                    handleClick();
                    onConfirm(selectedColor);
                }}
                isOpen={open}
                onCancel={() => handleOpenChange(false)}
                onOpenChange={handleOpenChange}
                trigger={(props, ref) => {
                    return (
                        <div {...props} data-test-id="flyout-trigger" ref={ref as RefObject<HTMLDivElement>} draggable>
                            {children}
                        </div>
                    );
                }}
            >
                <ColorPicker
                    currentColor={selectedColor}
                    currentFormat={currentFormat}
                    setFormat={setCurrentFormat}
                    onSelect={setSelectedColor}
                    showPreview
                />
            </Flyout>
        </div>
    );
};
