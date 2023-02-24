/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    ButtonEmphasis,
    ButtonStyle,
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

import { ColorPickerProps, GradientColor } from '../types';
import { rgbaStringToHexString } from '../helpers';

export const ColorPicker = ({
    editing,
    color = null,
    currentColor,
    currentColorPosition,
    gradientColors,
    setColors,
    setCurrentColorPosition,
    setCurrentColor,
    setShowColorModal,
    setCurrentlyEditingColor,
}: ColorPickerProps) => {
    const editColor = (color: GradientColor) => {
        const newGradientColors = gradientColors.map((item) => {
            if (item.hex === color.hex) {
                return {
                    hex: rgbaStringToHexString(
                        `rgba(${currentColor?.red}, ${currentColor?.green}, ${currentColor?.blue}, ${currentColor?.alpha})`
                    ),
                    name: currentColor?.name ?? '',
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
                                    if (!editing) {
                                        if (!currentColorPosition) {
                                            return;
                                        }
                                        console.log('addNewColor');
                                        console.log(currentColor);
                                        addNewColor({
                                            hex: rgbaStringToHexString(
                                                `rgba(${currentColor?.red}, ${currentColor?.green}, ${currentColor?.blue}, ${currentColor?.alpha})`
                                            ),
                                            name: currentColor?.name ?? '',
                                            position: currentColorPosition,
                                        });
                                    } else {
                                        color && editColor(color);
                                    }
                                    setShowColorModal(false);
                                    setCurrentColorPosition(undefined);
                                    setCurrentColor(null);
                                    setCurrentlyEditingColor(undefined);
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
                            currentColor={currentColor}
                            onClose={() => setShowColorModal(false)}
                            onClick={() => console.log('onClick')}
                            onSelect={(color) => {
                                setCurrentColor(color);
                            }}
                            onClear={() => console.log('onClear')}
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
                        <TextInput
                            disabled
                            value={currentColorPosition?.toString()}
                            onChange={() => console.log('onChange')}
                            onEnterPressed={() => console.log('onEnterPressed')}
                            placeholder="placeholder"
                        />
                    </div>
                </div>
            </Flyout>
        </div>
    );
};
