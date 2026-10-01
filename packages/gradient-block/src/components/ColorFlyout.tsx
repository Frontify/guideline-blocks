/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useColorPalettes } from '@frontify/app-bridge';
import { type Color, Validation } from '@frontify/fondue';
import { Button, Flyout, Label, Text, TextInput, Tooltip } from '@frontify/fondue/components';
import { IconCheckMark, IconQuestionMarkCircle } from '@frontify/fondue/icons';
import { useId, useState } from 'react';

import { mapAppBridgeColorPalettesToFonduePalettes } from '../helpers/mapColorPalettes';
import { type ColorFlyoutProps, type GradientColor } from '../types';

import { ColorPickerFlyout } from './ColorInput/ColorPickerFlyout';

export const ColorFlyout = ({
    appBridge,
    currentlyEditingPosition,
    gradientColors,
    showColorModal,
    setColors,
    setShowColorModal,
}: ColorFlyoutProps) => {
    const { colorPalettes } = useColorPalettes(appBridge);
    const palettes = mapAppBridgeColorPalettesToFonduePalettes(colorPalettes);
    const actualColor = gradientColors.find((item) => item.position === currentlyEditingPosition);
    const defaultColor = { red: 0, green: 0, blue: 0, alpha: 1 };
    const [colorPosition, setColorPosition] = useState(Math.round(currentlyEditingPosition).toString());
    const [color, setColor] = useState<Color>(actualColor?.color ?? defaultColor);
    const [colorPositionValidation, setColorPositionValidation] = useState<Validation>(Validation.Default);
    const id = useId();
    const colorInputId = `${id}-color`;
    const positionInputId = `${id}-position`;
    const hasPositionError = colorPositionValidation === Validation.Error;

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
                    <div className="tw-font-bold tw-text-small">Configure Color</div>
                </Flyout.Header>
                <Flyout.Body>
                    <div className="tw-w-full tw-flex tw-flex-col tw-gap-6" data-test-id="color-picker-form">
                        <div className="tw-flex tw-flex-col tw-gap-y-2">
                            <Label htmlFor={colorInputId}>Color</Label>
                            <ColorPickerFlyout
                                id={colorInputId}
                                currentColor={color}
                                palettes={palettes}
                                onColorChange={(color) => color && setColor(color)}
                            />
                        </div>
                        <div className="tw-flex tw-flex-col tw-gap-y-2">
                            <div className="tw-flex tw-items-center tw-gap-x-1">
                                <Label htmlFor={positionInputId}>Stop</Label>
                                <Tooltip.Root>
                                    <Tooltip.Trigger asChild>
                                        <button type="button" aria-label="More information about stops">
                                            <IconQuestionMarkCircle size={16} />
                                        </button>
                                    </Tooltip.Trigger>
                                    <Tooltip.Content>
                                        To customize the gradient, color-stop points from 0-100 can be added.
                                    </Tooltip.Content>
                                </Tooltip.Root>
                            </div>
                            <TextInput
                                id={positionInputId}
                                value={colorPosition}
                                type="number"
                                status={hasPositionError ? 'error' : 'neutral'}
                                onChange={(event) => setValidColorPosition(event.target.value)}
                            />
                            {hasPositionError && (
                                <Text as="p" size="small" color="negative">
                                    Add unique color stops from 0-100.
                                </Text>
                            )}
                        </div>
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
