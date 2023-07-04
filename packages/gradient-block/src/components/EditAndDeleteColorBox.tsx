/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, ButtonEmphasis, ButtonSize, IconDotsHorizontal16, IconTrashBin16 } from '@frontify/fondue';
import { EditAndDeleteColorBoxProps, GradientColor } from '../types';

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
            className="tw-flex tw-mt-1.5 -tw-ml-4 tw-border tw-border-box-selected-strong tw-rounded tw-bg-white"
        >
            <Button
                aria-label="Delete color"
                hugWidth
                emphasis={ButtonEmphasis.Weak}
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

            <Button
                aria-label="Edit color"
                hugWidth
                emphasis={ButtonEmphasis.Weak}
                onClick={() => {
                    setCurrentlyEditingPosition(color.position);
                    setShowColorModal(true);
                }}
                size={ButtonSize.Small}
                icon={
                    <span className="tw-text-violet-60">
                        <IconDotsHorizontal16 />
                    </span>
                }
            />
        </div>
    );
};
