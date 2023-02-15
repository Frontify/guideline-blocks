/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC, ReactNode, useMemo } from 'react';
import { merge } from '@frontify/fondue';
import { Color } from '@frontify/guideline-blocks-settings';
import { BorderStyle, Radius, borderStyleMap, toRgbaString } from '@frontify/guideline-blocks-shared';

import { cameraSizeToMaskSizeMap, radiusClassMap } from '../constants';
import { CameraSize, MaskShape } from '../types';

export type MaskProps = {
    shape: MaskShape;
    children: ReactNode;
    size: CameraSize;
    border: {
        hasBorder: boolean;
        borderColor: Color;
        borderStyle: BorderStyle;
        borderWidth: string;
        hasRadius: boolean;
        radiusValue: string;
        radiusChoice: Radius;
    };
};

export const Mask: FC<MaskProps> = ({ shape, children, size, border }) => {
    const overlayFullClasses =
        'tw-relative tw-overflow-hidden tw-flex tw-justify-center tw-items-center tw-transition-all';

    const circleClasses = 'tw-rounded-full tw-aspect-square tw-h-full';
    const squareClasses = 'tw-aspect-square';
    const fullFrameClasses = '';

    const canHaveBorderRadius = [MaskShape.Square, MaskShape.FullFrame].includes(shape);

    const style = useMemo(
        () => ({
            width: [MaskShape.Circle, MaskShape.Square].includes(shape)
                ? cameraSizeToMaskSizeMap[size].height
                : cameraSizeToMaskSizeMap[size].width,
            borderRadius: canHaveBorderRadius && border.hasRadius ? border.radiusValue : undefined,
            ...(border.hasBorder
                ? {
                      borderStyle: borderStyleMap[border.borderStyle],
                      borderWidth: border.borderWidth,
                      borderColor: toRgbaString(border.borderColor),
                  }
                : {}),
        }),
        [border, canHaveBorderRadius, shape, size]
    );

    const classes = useMemo(
        () =>
            merge([
                overlayFullClasses,
                shape === MaskShape.Circle && circleClasses,
                shape === MaskShape.Square && squareClasses,
                shape === MaskShape.FullFrame && fullFrameClasses,
                canHaveBorderRadius && !border.hasRadius && radiusClassMap[border.radiusChoice],
            ]),
        [border.hasRadius, border.radiusChoice, canHaveBorderRadius, shape]
    );

    return (
        <div style={style} className={classes}>
            {children}
        </div>
    );
};
