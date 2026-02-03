/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, ColorPicker, Flyout } from '@frontify/fondue/components';
import { IconCheckMark } from '@frontify/fondue/icons';
import { useEffect, useState } from 'react';

import { ColorInputContent } from './ColorInputContent';
import { type Palette, type RgbaColorWithName, type ShowPickerUnion } from './types';

type ColorPickerFlyoutProps = {
    palettes?: Palette[];
    currentColor?: RgbaColorWithName;
    onColorChange: (color?: RgbaColorWithName) => void;
    onClear?: () => void;
    showPicker?: ShowPickerUnion;
    defaultColorFormat?: 'HEX' | 'RGBA';
    disabled?: boolean;
    id?: string;
};

const getColorWithName = (color?: RgbaColorWithName, format?: 'HEX' | 'RGBA') => {
    if (!color) {
        return undefined;
    }

    if (format === 'HEX' && !color.name) {
        return {
            ...color,
            name: `#${color.red.toString(16).padStart(2, '0')}${color.green.toString(16).padStart(2, '0')}${color.blue.toString(16).padStart(2, '0')}`,
        };
    }
    return color;
};

export const ColorPickerFlyout = ({
    id,
    palettes = [],
    currentColor,
    onColorChange,
    onClear,
    showPicker,
    defaultColorFormat,
    disabled = false,
}: ColorPickerFlyoutProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeColor, setActiveColor] = useState<RgbaColorWithName | undefined>(() =>
        getColorWithName(currentColor, defaultColorFormat)
    );

    useEffect(() => {
        // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect, react-hooks/set-state-in-effect
        setActiveColor(getColorWithName(currentColor, defaultColorFormat));
    }, [currentColor, isOpen]);

    const handleClear = () => {
        if (onClear) {
            setActiveColor(undefined);
            onClear();
        }
    };

    return (
        <Flyout.Root
            open={isOpen}
            onOpenChange={(openState) => {
                if (!openState) {
                    setIsOpen(openState);
                }
            }}
        >
            <Flyout.Trigger>
                <ColorPicker.Input
                    id={id}
                    onClick={() => {
                        setIsOpen(!isOpen);
                    }}
                    aria-label="Select Color"
                    currentColor={activeColor}
                    onClear={onClear ? handleClear : undefined}
                    disabled={disabled}
                />
            </Flyout.Trigger>
            <Flyout.Content width="400px">
                <Flyout.Body>
                    <ColorInputContent
                        palettes={palettes}
                        currentColor={activeColor}
                        onColorChange={setActiveColor}
                        showPicker={showPicker}
                        defaultColorFormat={defaultColorFormat}
                    />
                </Flyout.Body>
                <Flyout.Footer>
                    <Button emphasis="default" onPress={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        emphasis="strong"
                        onPress={() => {
                            onColorChange(activeColor);
                            setIsOpen(false);
                        }}
                    >
                        <IconCheckMark size={16} />
                        Save
                    </Button>
                </Flyout.Footer>
            </Flyout.Content>
        </Flyout.Root>
    );
};
