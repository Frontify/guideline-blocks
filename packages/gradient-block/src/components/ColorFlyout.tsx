/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Color, FormControl, FormControlStyle, Validation } from '@frontify/fondue';
import { Button, Flyout, TextInput } from '@frontify/fondue/components';
import { IconCheckMark } from '@frontify/fondue/icons';
import { useState } from 'react';

import { type ColorFlyoutProps, type GradientColor } from '../types';

import { ColorPickerFlyout } from './ColorInput/ColorPickerFlyout';

export const ColorFlyout = ({
    colorPalettes,
    currentlyEditingPosition,
    gradientColors,
    showColorModal,
    setColors,
    setShowColorModal,
}: ColorFlyoutProps) => {
    const actualColor = gradientColors.find((item) => item.position === currentlyEditingPosition);
    const defaultColor = { red: 0, green: 0, blue: 0, alpha: 1 };
    const [colorPosition, setColorPosition] = useState(Math.round(currentlyEditingPosition).toString());
    const [color, setColor] = useState<Color>(actualColor?.color ?? defaultColor);
    const [colorPositionValidation, setColorPositionValidation] = useState<Validation>(Validation.Default);

    const editColor = () => {
        if (colorPositionValidation === Validation.Error) {
            return;
        }
        const newGradientColors = gradientColors.map((item) => {
            if (item === actualColor) {
                return {
                    color,
                    position: parseInt(colorPosition),
                };
            } else {
                return item;
            }
        });
        setColors(newGradientColors);
    };

    const addNewColor = (newColor: GradientColor) => {
        const newGradientColors = [...(gradientColors ?? []), newColor].sort((a, b) => {
            return a.position - b.position;
        });
        setColors(newGradientColors);
    };

    const setValidColorPosition = (value: string) => {
        const valueAsNumber = parseInt(value);
        if (
            valueAsNumber >= 0 &&
            valueAsNumber <= 100 &&
            gradientColors.every((item) => item.position !== valueAsNumber)
        ) {
            setColorPositionValidation(Validation.Default);
            setColorPosition(valueAsNumber.toString());
        } else if (value === '') {
            setColorPositionValidation(Validation.Error);
            setColorPosition(value);
        }
    };

    return (
        <Flyout.Root open={showColorModal} onOpenChange={setShowColorModal}>
            <Flyout.Trigger>
                <div />
            </Flyout.Trigger>
            <Flyout.Content padding="comfortable" width="400px">
                <Flyout.Header showCloseButton>
                    <div className="tw-font-bold tw-text-s">Configure Color</div>
                </Flyout.Header>
                <Flyout.Body>
                    <div className="tw-w-full tw-flex tw-flex-col tw-gap-6" data-test-id="color-picker-form">
                        <FormControl
                            label={{
                                htmlFor: 'GRADIENT_COLOR_COLOR',
                                children: 'Color',
                            }}
                        >
                            <ColorPickerFlyout
                                currentColor={color}
                                palettes={colorPalettes}
                                onColorChange={(color) => color && setColor(color)}
                            />
                        </FormControl>
                        <FormControl
                            helper={
                                colorPositionValidation === Validation.Error
                                    ? { text: 'Add unique color stops from 0-100.' }
                                    : undefined
                            }
                            style={
                                colorPositionValidation === Validation.Error
                                    ? FormControlStyle.Danger
                                    : FormControlStyle.Primary
                            }
                            label={{
                                tooltip: {
                                    content: 'To customize the gradient, color-stop points from 0-100 can be added.',
                                },
                                htmlFor: 'GRADIENT_COLOR_POSITION',
                                children: 'Stop',
                            }}
                        >
                            <TextInput
                                value={colorPosition}
                                type="number"
                                onChange={(event) => setValidColorPosition(event.target.value)}
                            />
                        </FormControl>
                    </div>
                </Flyout.Body>
                <Flyout.Footer>
                    <Button
                        onPress={() => {
                            if (!actualColor) {
                                addNewColor({
                                    color,
                                    position: parseInt(colorPosition),
                                });
                            } else {
                                editColor();
                            }
                            setShowColorModal(false);
                        }}
                    >
                        <IconCheckMark size={16} />
                        Close
                    </Button>
                </Flyout.Footer>
            </Flyout.Content>
        </Flyout.Root>
    );
};
