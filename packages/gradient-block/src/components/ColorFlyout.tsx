/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    ButtonEmphasis,
    ButtonStyle,
    Color,
    ColorPickerFlyout,
    Flyout,
    FlyoutFooter,
    FormControl,
    FormControlStyle,
    IconCheckMark16,
    IconCross20,
    TextInput,
    TextInputType,
    Validation,
} from '@frontify/fondue';
import { useState } from 'react';
import { ColorFlyoutProps, GradientColor } from '../types';

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
        <Flyout
            fixedHeader={
                <div className="tw-flex tw-justify-between tw-items-center tw-font-bold tw-text-s tw-py-3 tw-px-6 tw-bg-white tw-border-b tw-border-b-black-10">
                    <span>Configure Color</span>
                    <span
                        className="hover:tw-bg-box-neutral-hover hover:tw-cursor-pointer tw-rounded-sm tw-p-0.5 tw-text-strong"
                        onClick={() => setShowColorModal(false)}
                    >
                        <IconCross20 />
                    </span>
                </div>
            }
            isOpen={showColorModal}
            contentMinHeight={195}
            onOpenChange={(isOpen) => {
                if (!actualColor) {
                    addNewColor({
                        color,
                        position: parseInt(colorPosition),
                    });
                } else {
                    color && editColor();
                }
                setShowColorModal(isOpen);
            }}
            trigger={null}
            legacyFooter={false}
            fixedFooter={
                <FlyoutFooter
                    buttons={[
                        {
                            style: ButtonStyle.Default,
                            emphasis: ButtonEmphasis.Strong,
                            icon: <IconCheckMark16 />,
                            children: 'Close',
                            onClick: () => {
                                if (!actualColor) {
                                    addNewColor({
                                        color,
                                        position: parseInt(colorPosition),
                                    });
                                } else {
                                    color && editColor();
                                }
                                setShowColorModal(false);
                            },
                        },
                    ]}
                />
            }
        >
            <div className="tw-flex" data-test-id="color-picker-form">
                <div className="tw-w-full tw-pt-5 tw-pl-6 tw-pr-10 tw-flex tw-flex-col tw-gap-6">
                    <FormControl
                        label={{
                            htmlFor: 'GRADIENT_COLOR_COLOR',
                            children: 'Color',
                        }}
                    >
                        <ColorPickerFlyout
                            currentColor={color}
                            palettes={colorPalettes}
                            onSelect={setColor}
                            onClick={() => color && editColor()}
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
                            type={TextInputType.Number}
                            onChange={setValidColorPosition}
                            validation={colorPositionValidation}
                        />
                    </FormControl>
                </div>
            </div>
        </Flyout>
    );
};
