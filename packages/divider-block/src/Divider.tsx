/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';
import { DividerHeight, dividerStyle, DividerStyle } from './types';

type DividerProps = {
    style?: DividerStyle;
    height?: DividerHeight | string;
    color?: string;
};

export const Divider: FC<DividerProps> = ({
    style = DividerStyle.Solid,
    height = DividerHeight.Small,
    color: borderTopColor = '#CCC',
}) => (
    <div className="tw-flex tw-items-center" style={{ height }} data-test-id="divider">
        <hr
            className={`tw-border-t tw-m-0 tw-w-full ${dividerStyle[style]}`}
            style={{ borderTopColor }}
            data-test-id="divider-hr"
        />
    </div>
);
