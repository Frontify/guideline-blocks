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
import { hexStringToRgba } from '../helpers';

export const EditAndDeleteColorBox = ({
    color,
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
        setColors(gradientColors.filter((colorItem) => colorItem.position !== color.position));
    };

    return (
        <div className="tw-absolute tw-flex tw-bg-base tw-border tw-border-box-selected-strong tw-rounded tw-w-16 tw-h-7 tw-top-10 tw-left-[-15px]">
            <Button
                emphasis={ButtonEmphasis.Strong}
                hugWidth
                inverted
                onClick={() => {
                    setCurrentlyEditingColor(color.hex);
                    setShowColorModal(true);
                    setCurrentColor(hexStringToRgba(color.hex) as Color);
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
