/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';
import { ICON_CLASS_NAME } from '../utilities';
import { IconProps } from '../types';

export const IconSingleQuoteDown: FC<IconProps> = ({ style }) => (
    <svg
        style={style}
        className={ICON_CLASS_NAME}
        viewBox="0 0 8 12"
        fill="currentColor"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M1.68 12V9.561h1.414c1.17 0 1.756-.585 1.756-1.756V6.244h-.683c-.943 0-1.723-.293-2.341-.878C1.176 4.78.85 4.049.85 3.17c0-.943.325-1.708.976-2.293C2.444.293 3.224 0 4.167 0 5.11 0 5.891.309 6.51.927c.618.618.927 1.398.927 2.341v4.537C7.436 10.602 6.037 12 3.24 12H1.68z" />
    </svg>
);
