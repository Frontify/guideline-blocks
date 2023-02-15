/* (c) Copyright Frontify Ltd., all rights reserved. */

import { merge } from '@frontify/fondue';
import { FC } from 'react';
import { MaskProps, VideoShape } from '../types';

export const Mask: FC<MaskProps> = ({ shape, children, size }) => {
    const overlayFullClasses =
        'tw-relative tw-overflow-hidden tw-flex tw-justify-center tw-items-center tw-transition-all';

    const circleClasses = 'tw-border tw-rounded-full tw-aspect-square tw-h-full';
    const squareClasses = '';

    const sizeMap = {
        small: { width: 400, height: 300 },
        medium: { width: 560, height: 420 },
        large: { width: 800, height: 600 },
    };

    const diameter = sizeMap[size].height;

    const finalClasses = merge([
        overlayFullClasses,
        shape === VideoShape.Circle && circleClasses,
        shape === VideoShape.Square && squareClasses,
    ]);

    const finalStyle = { width: shape === VideoShape.Circle ? diameter : sizeMap[size].width };

    return (
        <div className={finalClasses} style={finalStyle}>
            {children}
        </div>
    );
};
