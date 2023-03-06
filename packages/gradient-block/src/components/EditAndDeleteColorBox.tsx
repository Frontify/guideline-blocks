/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditAndDeleteColorBoxProps, GradientColor } from '../types';
import { Button, ButtonSize, IconPen16, IconTrashBin16 } from '@frontify/fondue';

export const EditAndDeleteColorBox = ({
    color,
    gradientColors,
    setColors,
    setShowColorModal,
    setCurrentlyEditingPosition,
}: EditAndDeleteColorBoxProps) => {
    const deleteColor = (color: GradientColor) => {
        setColors(gradientColors.filter((colorItem) => colorItem.position !== color.position));
    };

    return (
        <div
            data-test-id="edit-and-delete-color-box"
            className="tw-absolute tw-flex tw-bg-red tw-border tw-border-box-selected-strong tw-rounded tw-w-13 tw-h-7 tw-top-9 -tw-left-2 tw-text-white"
        >
            <Button
                hugWidth
                inverted
                solid
                onClick={() => {
                    setCurrentlyEditingPosition(color.position);
                    setShowColorModal(true);
                }}
                size={ButtonSize.Small}
                icon={
                    <span className="tw-text-violet-60">
                        <IconPen16 />
                    </span>
                }
            />

            <Button
                hugWidth
                inverted
                solid
                onClick={() => {
                    deleteColor(color);
                }}
                size={ButtonSize.Small}
                icon={
                    <span className="tw-text-violet-60">
                        <IconTrashBin16 />
                    </span>
                }
            />
        </div>
    );
};
