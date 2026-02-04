/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type FC } from 'react';

import { type IconProps } from '../types';
import { ICON_CLASS_NAME } from '../utilities';

export const IconSingleChevronRight: FC<IconProps> = ({ style }) => (
    <svg
        style={style}
        className={ICON_CLASS_NAME}
        width="100%"
        height="100%"
        viewBox="0 0 1 1"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M0.528071 0.500418L0.35498 0.351933V0.149994L0.645162 0.399448V0.601388L0.35498 0.849994V0.648054L0.528071 0.500418Z"
            fill="currentColor"
        />
    </svg>
);
