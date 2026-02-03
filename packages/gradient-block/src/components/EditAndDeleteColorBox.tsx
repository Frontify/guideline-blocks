/* (c) Copyright Frontify Ltd., all rights reserved. */

import { merge } from '@frontify/fondue';
import { Button } from '@frontify/fondue/components';
import { IconPen, IconTrashBin } from '@frontify/fondue/icons';

import { type EditAndDeleteColorBoxProps, type GradientColor } from '../types';

export const EditAndDeleteColorBox = ({
    color,
    gradientColors,
    setColors,
    setShowColorModal,
    setCurrentlyEditingPosition,
    isAlmostOverflowing,
}: EditAndDeleteColorBoxProps) => {
    const deleteColor = (color: GradientColor) => {
        setColors(gradientColors.filter((colorItem) => colorItem.position !== color.position));
    };

    return (
        <div
            data-test-id="edit-and-delete-color-box"
            className={merge([
                'tw-flex tw-mt-2.5 tw-border tw-border-box-selected-strong tw-rounded tw-bg-white',
                isAlmostOverflowing ? '-tw-ml-8' : '-tw-ml-4',
            ])}
        >
            <Button
                aria-label="Edit color"
                hugWidth
                emphasis="weak"
                onPress={() => {
                    setCurrentlyEditingPosition(color.position);
                    setShowColorModal(true);
                }}
                size="small"
                aspect="square"
                variant="loud"
            >
                <IconPen size={16} />
            </Button>
            <Button
                aria-label="Delete color"
                hugWidth
                emphasis="weak"
                onPress={() => {
                    deleteColor(color);
                }}
                size="small"
                aspect="square"
                variant="loud"
            >
                <IconTrashBin size={16} />
            </Button>
        </div>
    );
};
