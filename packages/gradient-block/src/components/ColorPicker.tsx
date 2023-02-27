/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    ButtonEmphasis,
    ButtonStyle,
    Color,
    ColorPickerFlyout,
    Flyout,
    FlyoutFooter,
    IconCross,
    IconQuestionMarkCircle16,
    IconSize,
    Text,
    TextInput,
    TooltipIcon,
} from '@frontify/fondue';

import { useState } from 'react';

import { ColorPickerProps, GradientColor } from '../types';
import { hexStringToRgba, rgbaStringToHexString } from '../helpers';

const transformGradientColorToColor = (color: GradientColor | undefined) => {
    if (color !== undefined) {
        const rgba = hexStringToRgba(color.hex);
        return {
            red: rgba?.red,
            green: rgba?.green,
            blue: rgba?.blue,
            alpha: rgba?.alpha,
        } as Color;
    } else {
        return {
            red: 0,
            green: 0,
            blue: 0,
            alpha: 1,
        } as Color;
    }
};

export const ColorPicker = ({
    currentlyEditingPosition,
    gradientColors,
    setColors,
    setShowColorModal,
}: ColorPickerProps) => {
    const actualColor = gradientColors.find((item) => item.position === currentlyEditingPosition);
    const [color, setColor] = useState<Color>(transformGradientColorToColor(actualColor));

    const editColor = () => {
        const newGradientColors = gradientColors.map((item) => {
            if (item === actualColor) {
                return {
                    hex: rgbaStringToHexString(`rgba(${color?.red}, ${color?.green}, ${color?.blue}, ${color?.alpha})`),
                    name: color?.name ?? '',
                    position: item.position,
                } as GradientColor;
            } else {
                return item;
            }
        });

        setColors(newGradientColors);
    };

    const addNewColor = (color: GradientColor) => {
        const newGradientColors = [...(gradientColors ?? []), color].sort((a, b) => {
            return a.position - b.position;
        });

        setColors(newGradientColors);
    };

    console.log(actualColor);

    return (
        <div className="tw-z-[10]">
            <Flyout
                fixedHeader={
                    <div className="tw-flex tw-justify-between tw-items-center tw-font-bold tw-text-s tw-py-3 tw-px-6 tw-bg-white dark:tw-bg-black-95 tw-border-b tw-border-b-black-10">
                        <span>Configure Color</span>
                        <span
                            className="hover:tw-bg-box-neutral-hover hover:tw-cursor-pointer tw-rounded-sm tw-p-0.5 tw-text-strong"
                            onClick={() => setShowColorModal(false)}
                        >
                            <IconCross size={IconSize.Size20} />
                        </span>
                    </div>
                }
                fixedFooter={
                    <FlyoutFooter
                        buttons={[
                            {
                                style: ButtonStyle.Default,
                                emphasis: ButtonEmphasis.Strong,
                                children: 'Close',
                                onClick: () => {
                                    if (!actualColor) {
                                        addNewColor({
                                            hex: rgbaStringToHexString(
                                                `rgba(${color?.red}, ${color?.green}, ${color?.blue}, ${color?.alpha})`
                                            ),
                                            name: color?.name ?? '',
                                            position: currentlyEditingPosition,
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
                legacyFooter={false}
                isOpen={true}
                contentMinHeight={195}
                onOpenChange={() => true}
                trigger={null}
            >
                <div className="tw-flex">
                    <div className="tw-w-full tw-pt-5 tw-pl-6 tw-pr-[40px] ">
                        <Text color="weak">Color</Text>
                        <ColorPickerFlyout
                            clearable
                            currentColor={color}
                            onClose={() => setShowColorModal(false)}
                            onSelect={(color) => {
                                setColor(color);
                            }}
                        />

                        <span className="tw-flex tw-mt-6">
                            <Text color="weak">Stop</Text>
                            <span className="tw-ml-1">
                                <TooltipIcon
                                    tooltip={{
                                        content:
                                            'It determines when the transition from one color to the new color is complete.',
                                    }}
                                    triggerIcon={<IconQuestionMarkCircle16 />}
                                    iconSize={IconSize.Size12}
                                />
                            </span>
                        </span>
                        <TextInput disabled value={currentlyEditingPosition.toString()} placeholder="placeholder" />
                    </div>
                </div>
            </Flyout>
        </div>
    );
};
