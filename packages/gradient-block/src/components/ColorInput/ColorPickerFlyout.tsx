/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type AppBridgeBlock } from '@frontify/app-bridge';
import { Button, ColorPicker, Flyout } from '@frontify/fondue/components';
import { IconCheckMark } from '@frontify/fondue/icons';
import { ColorChooser } from '@frontify/guideline-blocks-settings';
import { type Color } from '@frontify/guideline-blocks-shared';
import { useEffect, useState } from 'react';

type ColorPickerFlyoutProps = {
    appBridge: AppBridgeBlock;
    currentColor?: Color;
    onColorChange: (color?: Color) => void;
    onClear?: () => void;
    disabled?: boolean;
    id?: string;
};

const getColorWithName = (color?: Color) => {
    if (!color) {
        return undefined;
    }

    if (!color.name) {
        return {
            ...color,
            name: `#${color.red.toString(16).padStart(2, '0')}${color.green.toString(16).padStart(2, '0')}${color.blue.toString(16).padStart(2, '0')}`,
        };
    }
    return color;
};

export const ColorPickerFlyout = ({
    appBridge,
    id,
    currentColor,
    onColorChange,
    onClear,
    disabled = false,
}: ColorPickerFlyoutProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeColor, setActiveColor] = useState<Color | undefined>(() => getColorWithName(currentColor));

    useEffect(() => {
        // oxlint-disable-next-line @eslint-react/set-state-in-effect
        setActiveColor(getColorWithName(currentColor));
        // oxlint-disable-next-line @eslint-react/exhaustive-deps
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
                {isOpen ? (
                    <ColorChooser
                        appBridge={appBridge}
                        color={getColorWithName(currentColor)}
                        onColorSelect={(color) => setActiveColor(getColorWithName(color))}
                    />
                ) : null}
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
