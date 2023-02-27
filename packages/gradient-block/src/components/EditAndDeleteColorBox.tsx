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
    IconPen16,
    IconTrashBin16,
} from '@frontify/fondue';

import { hexStringToRgba } from '../helpers';

export const EditAndDeleteColorBox = ({
    color,
    gradientColors,
    setColors,
    setShowColorModal,
    setCurrentColor,
    setCurrentlyEditingColor,
}: EditAndDeleteColorBoxProps) => {
    const deleteColor = (color: GradientColor) => {
        setColors(gradientColors.filter((colorItem) => colorItem.position !== color.position));
    };

    return (
        <div className="tw-absolute tw-flex tw-bg-base tw-border tw-border-box-selected-strong tw-rounded tw-w-13 tw-h-7 tw-top-9 -tw-left-2">
            <Button
                emphasis={ButtonEmphasis.Strong}
                hugWidth
                inverted
                solid
                onClick={() => {
                    setCurrentlyEditingColor(color.hex);
                    setShowColorModal(true);
                    setCurrentColor(hexStringToRgba(color.hex) as Color);
                }}
                rounding={ButtonRounding.Medium}
                size={ButtonSize.Small}
                style={ButtonStyle.Default}
                type={ButtonType.Button}
                icon={<IconPen16 />}
            />

            <Button
                emphasis={ButtonEmphasis.Strong}
                hugWidth
                inverted
                solid
                onClick={() => {
                    deleteColor(color);
                }}
                rounding={ButtonRounding.Medium}
                size={ButtonSize.Small}
                style={ButtonStyle.Default}
                type={ButtonType.Button}
                icon={<IconTrashBin16 />}
            />
        </div>
    );
};
