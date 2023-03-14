/* (c) Copyright Frontify Ltd., all rights reserved. */

import { joinClassNames } from '@frontify/guideline-blocks-shared';
import { ReactNode } from 'react';
import { Alignment } from '../../types';

export const LabelWrapper = ({
    children,
    top,
    bottom,
    left,
    right,
    borderRadius,
    alignment,
}: {
    children: ReactNode;
    right?: number;
    left?: number;
    top?: number;
    bottom?: number;
    borderRadius: string;
    alignment: Alignment;
}) => {
    const minPadding = 8;
    const borderRadiusValue = left === 50 || top === 50 ? 0 : +borderRadius?.split('px')[0] || 0;
    const paddingBecauseOfBorderRadius = borderRadiusValue - borderRadiusValue / Math.sqrt(2);
    return (
        <div
            style={{
                right: right !== undefined ? `${right}%` : undefined,
                left: left !== undefined ? `${left}%` : undefined,
                top: top !== undefined ? `${top}%` : undefined,
                bottom: bottom !== undefined ? `${bottom}%` : undefined,
                padding: `${paddingBecauseOfBorderRadius + minPadding}px`,
                transform: `translateX(${left === 50 ? -50 : 0}%) translateY(${top === 50 ? -50 : 0}%)`,
            }}
            className={joinClassNames([
                alignment === Alignment.Horizontal ? 'tw-max-w-[50%]' : 'tw-max-w-full',
                'tw-absolute tw-w-[300px] tw-flex tw-pointer-events-none',
                right === 0 && 'tw-justify-end',
                left === 50 && 'tw-justify-center',
            ])}
        >
            <div className="tw-max-w-full tw-pointer-events-auto">{children}</div>
        </div>
    );
};
