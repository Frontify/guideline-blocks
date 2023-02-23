/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditAndDeleteColorBoxProps, GradientColor } from '../types';
import {
    Button,
    ButtonEmphasis,
    ButtonRounding,
    ButtonSize,
    ButtonStyle,
    ButtonType,
    Color,
    IconPen,
    IconSize,
    IconTrashBin,
} from '@frontify/fondue';

import { ColorPicker } from './';

import { hex2rgba } from '../helpers';

export const EditAndDeleteColorBox = ({
    color,
    colors,
    currentColor,
    currentColorPosition,
    currentlyEditingColor,
    gradientColors,
    showColorModal,
    setColors,
    setShowColorModal,
    setCurrentColorPosition,
    setCurrentColor,
    setCurrentlyEditingColor,
}: EditAndDeleteColorBoxProps) => {
    const deleteColor = (color: GradientColor) => {
        const newGradientColors = colors.filter((item) => {
            if (item.hex === color.hex) {
                return true;
            }
            return false;
        });

        setColors(newGradientColors);
    };

    return (
        <div className="tw-absolute tw-flex tw-bg-base tw-border tw-border-box-selected-strong tw-rounded tw-w-[63px] tw-h-7 tw-top-[40px] tw-left-[-15px]">
            <Button
                emphasis={ButtonEmphasis.Strong}
                hugWidth
                inverted
                onClick={() => {
                    setCurrentlyEditingColor(color.hex);
                    setShowColorModal(true);
                    setCurrentColor(hex2rgba(color.hex) as Color);
                }}
                rounding={ButtonRounding.Medium}
                size={ButtonSize.Small}
                solid
                style={ButtonStyle.Default}
                type={ButtonType.Button}
            >
                <IconPen size={IconSize.Size12} />
            </Button>

            <Button
                emphasis={ButtonEmphasis.Strong}
                hugWidth
                inverted
                onClick={() => {
                    deleteColor(color);
                }}
                rounding={ButtonRounding.Medium}
                size={ButtonSize.Small}
                solid
                style={ButtonStyle.Default}
                type={ButtonType.Button}
            >
                <IconTrashBin size={IconSize.Size12} />
            </Button>

            {showColorModal && currentlyEditingColor === color.hex && (
                <ColorPicker
                    editing={true}
                    color={color}
                    colors={colors}
                    currentColor={currentColor}
                    currentColorPosition={currentColorPosition}
                    setColors={setColors}
                    setCurrentColor={setCurrentColor}
                    setCurrentColorPosition={setCurrentColorPosition}
                    setShowColorModal={setShowColorModal}
                    gradientColors={gradientColors}
                    setCurrentlyEditingColor={setCurrentlyEditingColor}
                />
            )}
        </div>
    );
};
