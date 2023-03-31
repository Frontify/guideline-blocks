/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    ButtonEmphasis,
    ButtonStyle,
    Color,
    ColorPickerFlyout,
    Flyout,
    FlyoutFooter,
    IconCheckMark16,
    IconCross20,
    IconQuestionMarkCircle,
    IconSize,
    Text,
    TextInput,
    TextInputType,
    TooltipIcon,
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
    const [colorPosition, setColorPosition] = useState(currentlyEditingPosition.toFixed(0));
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
        if (valueAsNumber >= 0 && valueAsNumber <= 100) {
            setColorPositionValidation(Validation.Default);
            setColorPosition(valueAsNumber.toString());
        } else if (value === '') {
            setColorPositionValidation(Validation.Error);
            setColorPosition(value);
        } else {
            setColorPositionValidation(Validation.Error);
        }
    };

    return (
        <Flyout
            fixedHeader={
                <div
                    data-test-id="color-picker-flyout"
                    className="tw-flex tw-justify-between tw-items-center tw-font-bold tw-text-s tw-py-3 tw-px-6 tw-bg-white dark:tw-bg-black-95 tw-border-b tw-border-b-black-10"
                >
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
                            onClick: () => setShowColorModal(false),
                        },
                    ]}
                />
            }
        >
            <div className="tw-flex" data-test-id="color-picker-form">
                <div className="tw-w-full tw-pt-5 tw-pl-6 tw-pr-10">
                    <Text color="weak">Color</Text>
                    <ColorPickerFlyout
                        currentColor={color}
                        palettes={colorPalettes}
                        onSelect={setColor}
                        onClick={() => color && editColor()}
                    />
                    <span className="tw-flex tw-mt-6">
                        <Text color="weak">Stop</Text>
                        <span className="tw-ml-1">
                            <TooltipIcon
                                tooltip={{
                                    content:
                                        'It determines when the transition from one color to the new color is complete.',
                                }}
                                triggerIcon={<IconQuestionMarkCircle />}
                                iconSize={IconSize.Size12}
                            />
                        </span>
                    </span>
                    <TextInput
                        value={colorPosition}
                        onChange={setValidColorPosition}
                        type={TextInputType.Number}
                        validation={colorPositionValidation}
                    />
                </div>
            </div>
        </Flyout>
    );
};
